<?php
namespace Xypp\Store\Context;

use Carbon\Carbon;
use Flarum\Database\Eloquent\Collection;
use Flarum\User\User;
use Xypp\Store\Helper\ProviderHelper;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

/**
 * Useful functions and context variables when purchasing a item
 */
class PurchaseContext
{
    /**
     * User who is purchasing the item
     * @var User
     */
    public User $actor;
    /**
     * The item to be purchased
     * @var StoreItem
     */
    public StoreItem $item;
    /**
     * If SingleHold, the old model will be replaced
     * @var PurchaseHistory|null
     */
    public PurchaseHistory|null $old;
    /**
     * Internal
     */
    public Carbon|null|false $replaceExpire = false;
    /**
     * Internal
     */
    public $noConsume = false;
    /**
     * Internal
     */
    public $noCostMoney = false;
    /**
     * Warped operations from providers
     * @var ProviderHelper
     */
    public ProviderHelper $providerHelper;
    /**
     * Warped operations from store
     * @var StoreHelper
     */
    public StoreHelper $storeHelper;
    public function __construct(User $actor, StoreItem $item, PurchaseHistory $old = null, StoreHelper $helper)
    {
        $this->actor = $actor;
        $this->item = $item;
        $this->old = $old;
        $this->providerHelper = $helper->providerHelper;
        $this->storeHelper = $helper;
    }
    /**
     * @param Carbon|null $expireAt
     * Override expire time to set to history Object. Set null to be infinity
     */
    public function setExpire(Carbon|null $expireAt)
    {
        $this->replaceExpire = $expireAt;
    }
    /**
     * No consume rest count.
     */
    public function noConsume()
    {
        $this->noConsume = true;
    }
    /**
     * Extra consume rest count. If rest count is less than cost, will be set to 0.
     * @param int $cost
     */
    public function extraConsume(int $cost)
    {
        $this->item->rest_cnt = max($this->item->rest_cnt - $cost, 0);
    }
    /**
     * No cost money
     */
    public function noCostMoney()
    {
        $this->noCostMoney = true;
    }
    /**
     * Get all history object that current user has.
     * @return Collection
     */
    public function getAllHistoryForItem(): Collection
    {
        return $this->item->history()->where('user_id', $this->actor->id)->get();
    }
    /**
     * Send exception to client(Roll back purchase)
     * @param string $e
     */
    public function exceptionWith(string $e)
    {
        $this->providerHelper->exceptionWith($e);
    }
}