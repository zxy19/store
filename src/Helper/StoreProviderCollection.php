<?php

namespace Xypp\Store\Helper;

use Xypp\Store\AbstractStoreProvider;

class StoreProviderCollection
{
    private array $extendProvider = [];
    /**
     * Register a provider.
     * @param AbstractStoreProvider $provider
     */
    public function addProvider(AbstractStoreProvider $provider): void
    {
        $this->extendProvider[$provider->name] = $provider;
    }
    /**
     * Get provider by name.
     * @param string $name
     * @return \Xypp\Store\AbstractStoreProvider|false
     */
    public function getProvider(string $name): AbstractStoreProvider|false
    {
        if (!isset($this->extendProvider[$name])) {
            return false;
        }
        return $this->extendProvider[$name];
    }
    public function getProviderList(): array
    {
        return $this->extendProvider;
    }
}