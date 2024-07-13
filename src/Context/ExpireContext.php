<?php
namespace Xypp\Store\Context;

use Carbon\Carbon;
use Flarum\User\User;
use Xypp\Store\Helper\ProviderHelper;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

/**
 * Useful functions and context variables when a item is expire
 */
class ExpireContext
{
    /**
     * Internal
     * @var User
     */
    public User|null|false $actor;
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
    public function __construct(PurchaseHistory $history = null, ProviderHelper $helper)
    {
        $this->history = $history;
        $this->providerHelper = $helper;
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
     * Get corresponding User object
     * @return User|null
     */
    public function getUser(): User|null
    {
        if ($this->actor !== false) {
            return $this->actor;
        }
        return $this->actor = User::find($this->history->user_id);
    }

    /**
     * Override expire time to set to history Object. Set null to be infinity
     * This method will save history model right now
     * @param Carbon|null|false $expireAt
     */
    public function setExpire(Carbon|null|false $expireAt)
    {
        $this->history->expire_at = $expireAt;
        $this->history->save();
    }
    /**
     * Return exception to client(No delete model)
     * @param string $message
     */
    public function exceptionWith(string $message)
    {
        $this->providerHelper->exceptionWith($message);
    }
}