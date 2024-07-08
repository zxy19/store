<?php
namespace Xypp\Store\Context;

use Carbon\Carbon;
use Flarum\Database\Eloquent\Collection;
use Flarum\User\User;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

class PurchaseContext
{
    public $actor;
    public $item;
    public $old;

    public Carbon|null|false $replaceExpire = false;
    public $noConsume = false;
    public $noCostMoney = false;
    public function __construct(User $actor, StoreItem $item, PurchaseHistory $old = null)
    {
        $this->actor = $actor;
        $this->item = $item;
        $this->old = $old;
    }
    /**
     * Override expire time to set to history Object. Set null to be infinity
     */
    public function setExpire(Carbon|null $expireAt)
    {
        $this->replaceExpire = $expireAt;
    }
    public function noConsume()
    {
        $this->noConsume = true;
    }
    public function noCostMoney()
    {
        $this->noCostMoney = true;
    }

    public function getAllHistoryForItem(): Collection
    {
        return $this->item->history()->get();
    }
}