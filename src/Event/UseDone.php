<?php

namespace Xypp\Store\Event;

use Flarum\User\User;
use Xypp\Store\PurchaseHistory;

/**
 * Triggers AFTER a item is used
 */
class UseDone
{
    public User $user;
    public PurchaseHistory $item;
    public function __construct(User $user, PurchaseHistory $item)
    {
        $this->user = $user;
        $this->item = $item;
    }
}