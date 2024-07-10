<?php

namespace Xypp\Store\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Locale\Translator;
use Illuminate\Contracts\Container\Container;
use Xypp\Store\Helper\StoreHelper;

class CustomServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        // custom logic here, for example:
        $this->container->resolving(StoreHelper::class, function (Container $container) {
            return new StoreHelper($container->make(Translator::class));
        });
    }

    public function boot(Container $container)
    {
        // custom logic here
    }
}