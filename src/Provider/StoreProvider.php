<?php

namespace Xypp\Store\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Xypp\Store\Extend\StoreItemProvider;

class StoreProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->container->singleton(StoreItemProvider::class);
    }
}