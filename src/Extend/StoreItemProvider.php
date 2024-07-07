<?php
namespace Xypp\Store\Extend;

use Flarum\Extend\ExtenderInterface;
use Flarum\Foundation\ContainerUtil;
use Xypp\Store\StoreItemRepository;

class StoreItemProvider implements ExtenderInterface
{

    private array $extendStoreProviders = [];
    public function extend($container, $extension = null)
    {
        foreach ($this->extendStoreProviders as $provider) {
            StoreItemRepository::addProvider($container->make($provider));
        }
    }
    public function provide($provider)
    {
        $this->extendStoreProviders[] = $provider;
        return $this;
    }
}