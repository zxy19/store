<?php
namespace Xypp\Store\Context;

use Carbon\Carbon;
use Flarum\User\User;
use Xypp\Store\Helper\ProviderHelper;
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
    public PurchaseHistory|null $history = null;
    /**
     * Warped operations from providers
     * @var ProviderHelper
     */
    public ProviderHelper $providerHelper;
    /**
     * Warped operations from store
     * @var StoreHelper
     */
    public ProviderHelper $helper;
    /**
     * Internal
     */
    public $noConsume = false;
    /**
     * Internal
     */
    public $toRemove = false;
    /**
     * Internal
     */
    public string $msg = "";
    public function __construct(User $actor, PurchaseHistory $history = null, StoreHelper $helper)
    {
        $this->actor = $actor;
        $this->history = $history;
        $this->providerHelper = $helper->providerHelper;
        $this->storeHelper = $helper;
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
     * Extra consume use count. If rest count is less than cost, will be set to 0.
     * @param int $cost
     */
    public function extraConsume(int $cost)
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
    /**
     * Set msg to reply after use succeed.
     * @param string $message
     */
    public function successMessage(string $message)
    {
        $this->msg = $this->helper->trans($message);
    }

}