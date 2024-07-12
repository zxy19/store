<?php

namespace Xypp\Store\Helper;

use AntoineFr\Money\Event\MoneyUpdated;
use Carbon\Carbon;
use Flarum\Database\Eloquent\Collection;
use Flarum\User\User;
use Illuminate\Events\Dispatcher;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Context\UseContext;
use Xypp\Store\Event\PurchaseDone;
use Xypp\Store\Event\UseDone;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

class StoreHelper
{
    public ProviderHelper $providerHelper;
    public Dispatcher $events;
    public function __construct(ProviderHelper $storeHelper, Dispatcher $events)
    {
        $this->providerHelper = $storeHelper;
        $this->events = $events;
    }

    public function getUserPurchased(User $actor): Collection
    {
        return PurchaseHistory::where("user_id", $actor->id)->get();
    }

    public function getUserPurchasedItem(User $actor, StoreItem $item): Collection
    {
        return $item->history()->where("user_id", $actor->id)->get();
    }
    public function exceptionWith($msg): void
    {
        $this->providerHelper->exceptionWith($msg);
    }
    /**
     * The logic of purchasing
     * The $additionalData is called after the original purchase function is called and has arguments same as the original function.
     * If $noValidCheck, we will not check the rest count and whether the item is able to use.**You SHOULD make sure the item can be used and the rest_cnt and user.money is enough**
     * @param \Flarum\User\User $actor
     * @param \Xypp\Store\StoreItem $item
     * @param callable|null $additionCallback
     * @param bool $noValidCheck
     * @return \Xypp\Store\PurchaseHistory
     */
    public function userPurchase(User $actor, StoreItem $item, callable|null $additionCallback = null, bool $noValidCheck = false): PurchaseHistory
    {
        if (!$noValidCheck) {
            $available = $this->providerHelper->canPurchase($actor, $item);
            if ($available !== true) {
                if ($available === false)
                    $available = "xypp-store.forum.purchase_result.fail.cannot";
                $this->providerHelper->exceptionWith($available);
            }
        }
        $originalMoney = $actor->money;

        // 已经完成判断初步的购买条件。模拟用户已经完成购买，扣款并扣库存
        $item->rest_cnt--;
        $item->save();
        $actor->money -= $item->price;
        $actor->save();
        $newModel=null;
        if ($this->providerHelper->isSingleHold($item)) {
            $newModel = PurchaseHistory::where("user_id", $actor->id)->where("item_id", $item->id)->first();
        }
        $context = new PurchaseContext($actor, $item, $newModel, $this);
        try {
            $data = $this->providerHelper->applyPurchase($actor, $item, $newModel, $context);
            if ($additionCallback)
                call_user_func_array($additionCallback, [$$actor, $item, $newModel, $context]);

        } catch (\Exception $e) {
            $item->rest_cnt++;
            $item->save();
            $actor->money += $item->price;
            $actor->save();
            throw $e;
        }
        if (!$newModel) {
            $newModel = new PurchaseHistory();
        }
        $newModel->user_id = $actor->id;
        $newModel->item_id = $item->id;
        if ($newModel->rest_cnt)
            $newModel->rest_cnt += $item->use_cnt;
        else
            $newModel->rest_cnt = $item->use_cnt;
        $newModel->data = $data;
        if ($item->expire_time) {
            if (!$newModel->expire_at || Carbon::now()->greaterThan($newModel->expire_at))
                $newModel->expire_at = Carbon::now();

            $newModel->expire_at = $newModel->expire_at->addSeconds($item->expire_time);
        }

        if ($context->replaceExpire !== false) {
            $newModel->expire_at = $context->replaceExpire;
        }
        if ($context->noConsume)
            $item->rest_cnt++;
        if ($context->noCostMoney)
            $actor->money += $item->price;


        $this->events->dispatch(new PurchaseDone($actor, $item, $newModel));
        if ($actor->money != $originalMoney)
            $this->events->dispatch(new MoneyUpdated($actor));
        if ($item->isDirty())
            $item->save();
        if ($actor->isDirty())
            $actor->save();
        $newModel->provider = $item->provider;
        if (!$context->noToSave)
            $newModel->save();
        return $newModel;
    }

    /**
     * Logic of using an item.
     * The $additionalData is called after the original use function is called and has arguments same as the original function.
     * If $noValidCheck, we will not check the rest count and whether the item is able to use.**You SHOULD make sure the item can be used and the rest_cnt is enough**
     * @param \Flarum\User\User $actor
     * @param \Xypp\Store\PurchaseHistory $item
     * @param string $data
     * @param callable $additionCallback
     * @param bool $noValidCheck
     * @return string
     */
    public function useItem(User $actor, PurchaseHistory $item, string $data, callable $additionCallback = null, bool $noValidCheck = false): string
    {
        if (!$noValidCheck) {
            $canUseItem = $this->providerHelper->canUse($item, $actor);
            if ($canUseItem !== true) {
                if ($canUseItem === false)
                    $canUseItem = "xypp-store.forum.use_result.fail.cannot";
                $this->providerHelper->exceptionWith($canUseItem);
            }
        }
        $item->rest_cnt--;
        $item->save();
        $context = new UseContext($actor, $item, $this);
        try {
            if (!$this->providerHelper->applyUse($item, $actor, $data, $context)) {
                $this->providerHelper->exceptionWith("xypp-store.forum.use_result.fail.error");
            }
            if ($additionCallback)
                call_user_func_array($additionCallback, [$$actor, $item, $data, $context]);
        } catch (\Exception $e) {
            $item->rest_cnt++;
            $item->save();
            throw $e;
        }

        if ($context->noConsume)
            $item->rest_cnt++;

        $this->events->dispatch(new UseDone($actor, $item));

        if ($context->toRemove) {
            if ($this->providerHelper->applyExpire($item)) {
                $item->delete();
                return $context->msg;
            } else {
                if (!$context->noConsume) {
                    $item->rest_cnt++;
                }
                $item->save();
                $this->providerHelper->exceptionWith("xypp-store.forum.use_result.fail.fail_expire");
            }
        }

        if ($item->isDirty()) {
            $item->save();
        }
        return $context->msg;
    }
    /**
     * Instantly expire and remove a history. If expire operation is not successfully completed, return false
     * @param \Xypp\Store\PurchaseHistory $item
     * @return bool
     */
    public function expireInstantly(PurchaseHistory $item): bool
    {
        if ($this->providerHelper->applyExpire($item)) {
            $item->delete();
            return true;
        }
        return false;
    }
}