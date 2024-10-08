<?php
namespace Xypp\Store\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Foundation\ContainerUtil;
use Illuminate\Container\Container;
use Xypp\Store\Helper\ProviderHelper;
use Xypp\Store\Helper\StoreProviderCollection;
use Xypp\Store\WarpStoreProvider;

class StoreItemProvider implements ExtenderInterface
{

    private array $extendStoreProviders = [];
    private array $extendSimpleProviders = [];
    public function extend($container, $extension = null)
    {
        $container->resolving(
            StoreProviderCollection::class,
            function (StoreProviderCollection $collection, Container $container) {
                foreach ($this->extendSimpleProviders as $provider) {
                    $provider->extend($container);
                    $collection->addProvider($provider);
                }
                foreach ($this->extendStoreProviders as $provider) {
                    $collection->addProvider($container->make($provider));
                }
            }
        );
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
     */
    public function simple(string $id, callable $purchase, callable|null $use = null, callable|null $expire = null)
    {
        $this->extendSimpleProviders[] = new WarpStoreProvider($id, $purchase, $use, $expire);
        return $this;
    }
}