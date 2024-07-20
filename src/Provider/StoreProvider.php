<?php

namespace Xypp\Store\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Xypp\Store\Extend\StoreItemService;

class StoreProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->singleton(StoreItemService::class);
    }
}