<?php

namespace Xypp\Store\Event;

use Flarum\User\User;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

/**
 * Triggered AFTER a user has done purchasing a store item.
 */
class PurchaseDone
{
    public User $user;
    public StoreItem $item;
    public PurchaseHistory $purchaseHistory;
    public function __construct(User $user, StoreItem $item, PurchaseHistory $purchaseHistory = null)
    {
        $this->user = $user;
        $this->item = $item;
        $this->purchaseHistory = $purchaseHistory;
    }
}