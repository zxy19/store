<?php

namespace Xypp\Store\Listener;

use Xypp\Store\Event\ExpireInstantly;
use Xypp\Store\Helper\StoreHelper;

/**
 * Called when a item is required to be expired instantly.
 */

class ExpireInstantlyListener
{
    public function handle(ExpireInstantly $event)
    {
        StoreHelper::applyExpire($event->item);
    }
}