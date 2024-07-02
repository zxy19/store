<?php

namespace Xypp\Store;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Middlewares\Utils\HttpErrorException;
use Xypp\Store\StoreItem;

class StoreItemRepository
{
    private static $extDataSerializers = [];
    private static $afterPurchaseOps = [];
    private static $extLimits = [];
    public static function addExtDataSerializer(string $extName, callable $dataAttributes, callable $afterPurchase): void
    {
        self::$extDataSerializers[$extName] = $dataAttributes;
        self::$afterPurchaseOps[$extName] = $afterPurchase;
    }
    public static function addExtLimitSerializer($extName, $limit)
    {
        self::$extLimits[$extName] = $limit;
    }
    public static function getAttrData(StoreItem $item)
    {
        $extName = $item->provider;
        if (isset(self::$extDataSerializers[$extName])) {
            return self::$extDataSerializers[$extName]($item);
        } else {
            throw new HttpErrorException("$extName is not a valid store item provider", 404);
        }
    }
    public static function applyPurchase($actor, $item)
    {
        $extName = $item->provider;
        if (isset(self::$afterPurchaseOps[$extName])) {
            return self::$afterPurchaseOps[$extName]($actor, $item);
        } else {
            throw new HttpErrorException("$extName is not a valid store item provider", 404);
        }
    }
    public static function isAvailable($actor, $item, $hasPurchased)
    {
        $extName = $item->provider;
        if (isset(self::$extLimits[$extName])) {
            return self::$extLimits[$extName]($actor, $item, $hasPurchased);
        } else {
            return true;
        }
    }
}
