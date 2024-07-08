<?php

namespace Xypp\Store\Helper;

use Flarum\Foundation\ValidationException;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Middlewares\Utils\HttpErrorException;
use Xypp\Store\AbstractStoreProvider;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Context\UseContext;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;

class StoreHelper
{
    private static array $extendProvider = [];
    public static function addProvider(AbstractStoreProvider $provider): void
    {
        self::$extendProvider[$provider->name] = $provider;
    }
    public static function getProvider(string $name): AbstractStoreProvider
    {
        if (!isset(self::$extendProvider[$name])) {
            throw new ValidationException(["provider" => "$name is not a valid store item provider"]);
        }
        return self::$extendProvider[$name];
    }
    public static function hasProvider(string $name): bool
    {
        if (!$name)
            return false;
        return isset(self::$extendProvider[$name]);
    }
    public static function getAttrData(StoreItem $item): array
    {
        if (!self::hasProvider($item->provider))
            return ['_unavailable' => true];
        return self::getProvider($item->provider)->serialize($item);
    }
    public static function getAttrHistory(PurchaseHistory $item): array
    {
        if (!self::hasProvider($item->provider))
            return ['_unavailable' => true];
        return self::getProvider($item->provider)->serializeHistory($item);
    }
    public static function applyPurchase($actor, StoreItem $item, PurchaseHistory $old = null, PurchaseContext $context): string
    {
        $result = self::getProvider($item->provider)->purchase($item, $actor, $old, $context);
        if (is_string($result)) {
            return $result;
        } else if (is_bool($result)) {
            if ($result == true)
                return "";
            else
                throw new ValidationException(["error" => "xypp-store.forum.purchase_result.fail.cannot"]);
        } else if (is_array($result) && count($result) == 2 && is_bool($result[0]) && is_string($result[1])) {
            if ($result[0] == true)
                return $result[1];
            else
                throw new ValidationException(["error" => $result[1]]);
        } else {
            throw new ValidationException(["error" => "xypp-store.forum.purchase_result.fail.unknown"]);
        }
    }
    public static function applyExpire($item)
    {
        return self::getProvider($item->provider)->expire($item);
    }
    public static function isAvailable($actor, $item): bool|string
    {
        if (!is_null($item->rest_cnt) && $item->rest_cnt <= 0)
            return "common.no_rest";
        if (!self::hasProvider($item->provider))
            return "common.unknown";
        return self::getProvider($item->provider)->canPurchase($item, $actor);
    }
    public static function providersShowInHistory(): array
    {
        $ret = [];
        foreach (self::$extendProvider as $key => $provider) {
            if ($provider->canSeeInHistory) {
                $ret[] = $key;
            }
        }
        return $ret;
    }
    public static function isSingleHold($item): bool
    {
        if (!self::hasProvider($item->provider))
            return false;
        return self::getProvider($item->provider)->singleHold;
    }
    public static function canUse($item, $fe = false): bool
    {
        if (!self::hasProvider($item->provider))
            return false;
        if ($fe && !self::getProvider($item->provider)->canUseFrontend)
            return false;
        return self::getProvider($item->provider)->canUse;
    }
    public static function useItem(PurchaseHistory $item, User $actor, string $data, UseContext $useContext): bool
    {
        if (!self::hasProvider($item->provider))
            return false;
        return self::getProvider($item->provider)->useItem($item, $actor, $data, $useContext);
    }
}
