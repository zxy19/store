<?php
namespace Xypp\Store\Context;

use Carbon\Carbon;
use Flarum\User\User;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

/**
 * Useful functions and context variables when using a item
 */
class UseContext
{
    /**
     * User who is using the item
     * @var User
     */
    public User $actor;
    /**
     * Internal
     */
    public StoreItem|null|false $item = false;
    /**
     * Purchase history object is using.
     * @var PurchaseHistory
     */
    public PurchaseHistory $history;
    /**
     * Useful functions in the plugin.
     * @var StoreHelper
     */
    public StoreHelper $helper;
    /**
     * Internal
     */
    public $noConsume = false;
    /**
     * Internal
     */
    public $toRemove = false;
    public function __construct(User $actor, PurchaseHistory $history = null, StoreHelper $helper)
    {
        $this->actor = $actor;
        $this->history = $history;
        $this->helper = $helper;
    }
    /**
     * Get corresponding StoreItem object
     * @return StoreItem|null
     */
    public function getStoreItem(): StoreItem|null
    {
        if ($this->item !== false) {
            return $this->item;
        }
        return $this->item = StoreItem::find($this->history->item_id);
    }
    /**
     * Override expire time to set to history Object. Set null to be infinity
     * @param Carbon|null|false $expireAt
     */
    public function setExpire(Carbon|null|false $expireAt)
    {
        $this->history->expire_at = $expireAt;
    }
    /**
     * Set to not consume rest count.
     */
    public function noConsume()
    {
        $this->noConsume = true;
    }
    /**
     * Set to remove the item after use.
     * **If expire is fail, the item will NOT be removed.**
     */
    public function expireInstantly()
    {
        $this->toRemove = true;
    }
    /**
     * Extra cost use count
     * @param int $cost
     */
    public function extraCost(int $cost)
    {
        $this->history->rest_cnt = max($this->history->rest_cnt - $cost, 0);
    }
    /**
     * Return exception to client(Roll back using)
     * @param string $message
     */
    public function exceptionWith(string $message)
    {
        $this->helper->exceptionWith($message);
    }
}