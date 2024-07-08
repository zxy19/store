<?php
namespace Xypp\Store\Context;

use Carbon\Carbon;
use Flarum\User\User;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

class UseContext
{
    public User $actor;
    public StoreItem|null|false $item = false;
    public PurchaseHistory $history;
    public $noConsume = false;
    public $toRemove = false;
    public function __construct(User $actor, PurchaseHistory $history = null)
    {
        $this->actor = $actor;
        $this->history = $history;
    }
    public function getStoreItem(): StoreItem|null
    {
        if ($this->item !== false) {
            return $this->item;
        }
        return $this->item = StoreItem::find($this->history->item_id);
    }
    /**
     * Override expire time to set to history Object. Set null to be infinity
     */
    public function setExpire(Carbon|null $expireAt)
    {
        $this->history->expire_at = $expireAt;
    }
    public function noConsume()
    {
        $this->noConsume = true;
    }
    public function expireInstantly()
    {
        $this->toRemove = true;
    }
    public function extraCost(int $cost)
    {
        $this->history->rest_cnt = max($this->history->rest_cnt - $cost, 0);
    }
}