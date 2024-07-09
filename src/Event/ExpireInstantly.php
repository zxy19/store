<?php

namespace Xypp\Store\Event;

use Xypp\Store\PurchaseHistory;

/**
 * Triggers AFTER a item is used
 */
class ExpireInstantly
{
    public PurchaseHistory $item;
    public function __construct(PurchaseHistory $item)
    {
        $this->item = $item;
    }
}