<?php

namespace Xypp\Store\Api\Controller\storeItems;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Middlewares\Utils\HttpErrorException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Xypp\Store\Helper\StoreHelper;
use Carbon\Carbon;

class PurchaseStoreItemController extends AbstractCreateController
{
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;
    protected StoreHelper $StoreHelper;

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $item = StoreItem::findOrFail($id);

        if ($actor->money < $item->price) {
            throw new ValidationException(['msg' => "xypp-store.forum.purchase_result.fail.not_enough_money"]);
        }
        if (!is_null($item->rest_cnt)) {
            if ($item->rest_cnt <= 0) {
                throw new ValidationException(['msg' => "xypp-store.forum.purchase_result.fail.not_enough_item"]);
            }
        }

        // 已经完成判断初步的购买条件。模拟用户已经完成购买，扣款并扣库存
        $item->rest_cnt--;
        $item->save();
        $actor->money -= $item->price;
        $actor->save();
        if (StoreHelper::isSingleHold($item)) {
            $newModel = PurchaseHistory::where("user_id", $actor->id)->where("item_id", $item->id)->first();
        }
        $context = new PurchaseContext($actor, $item, $newModel);
        try {
            $data = StoreHelper::applyPurchase($actor, $item, $newModel, $context);
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
        if (!$context->noCostMoney)
            $actor->money += $item->price;

        if ($item->isDirty())
            $item->save();
        if ($actor->isDirty())
            $actor->save();
        $newModel->provider = $item->provider;
        $newModel->save();
        return $newModel;
    }
}