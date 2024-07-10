<?php

namespace Xypp\Store\Listener;

use Xypp\Store\Event\ExpireInstantly;
use Xypp\Store\Helper\StoreHelper;

/**
 * Called when a item is required to be expired instantly.
 */

class ExpireInstantlyListener
{
    protected StoreHelper $helper;
    public function __construct(StoreHelper $helper)
    {
        $this->helper = $helper;
    }
    public function handle(ExpireInstantly $event)
    {
        $this->helper->applyExpire($event->item);
    }
}