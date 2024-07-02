<?php
namespace Xypp\Store\Extend;

use Flarum\Extend\ExtenderInterface;
use Xypp\Store\StoreItemRepository;

class StoreItemProvider implements ExtenderInterface
{

    private $extDataSerializers = [];
    private $extLimitSerializers = [];
    public function extend($container, $extension = null)
    {
        foreach ($this->extDataSerializers as $provider) {
            StoreItemRepository::addExtDataSerializer($provider[0], $provider[1], $provider[2]);
        }
        foreach ($this->extLimitSerializers as $provider) {
            StoreItemRepository::addExtLimitSerializer($provider[0], $provider[1]);
        }
    }
    public function provide(string $typeName, callable $dataAttributes, callable $afterPurchaseCallback)
    {
        $this->extDataSerializers[] = [
            $typeName,
            $dataAttributes,
            $afterPurchaseCallback
        ];
        return $this;
    }
    public function limit(string $typeName, callable $limitCallback)
    {
        $this->extLimitSerializers[] = [
            $typeName,
            $limitCallback
        ];
        return $this;
    }
}