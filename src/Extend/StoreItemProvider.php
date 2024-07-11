<?php
namespace Xypp\Store\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Foundation\ContainerUtil;
use Xypp\Store\Helper\ProviderHelper;
use Xypp\Store\WarpStoreProvider;

class StoreItemProvider implements ExtenderInterface
{

    private array $extendStoreProviders = [];
    private array $extendSimpleProviders = [];
    public function extend($container, $extension = null)
    {
        foreach ($this->extendSimpleProviders as $provider) {
            $provider->extend($container);
            ProviderHelper::addProvider($provider);
        }

        foreach ($this->extendStoreProviders as $provider) {
            ProviderHelper::addProvider($container->make($provider));
        }
    }
    public function provide($provider)
    {
        $this->extendStoreProviders[] = $provider;
        return $this;
    }
    /**
     * Register a simple provider with callbacks.
     * The callbacks will be warped with WarpStoreProvider.
     * @param callable $purchase
     * @param callable|null $use
     * @param callable|null $expire
     * @return void
     */
    public function simple(callable $purchase, callable|null $use = null, callable|null $expire = null)
    {
        $this->extendSimpleProviders[] = new WarpStoreProvider($purchase, $use, $expire);
    }
}