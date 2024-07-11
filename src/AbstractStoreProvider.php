<?php

namespace Xypp\Store;

use Flarum\User\User;
use Xypp\Store\Context\PurchaseContext;
use Xypp\Store\Context\UseContext;

abstract class AbstractStoreProvider
{
    public $name;
    /**
     * Display in the bag/history.
     */
    public $canSeeInHistory = true;
    /**
     * Whether the item can be used.
     */
    public $canUse = false;

    /**
     * Whether the item show use button in frontend.
     * It will not effect on box that opened by UseHelper.query()
     * If false, item will be marked as cannot use in frontend.
     */
    public $canUseFrontend = true;
    /**
     * Whether the user can hold multiple items.
     * If true, when purchase the item, expire time will culminate.
     */
    public $singleHold = false;
    /**
     * Operation of expires the item.
     * @param PurchaseHistory $item
     * @param User $user
     * @return bool
     */
    public abstract function expire(PurchaseHistory $item): bool;

    /**
     * Operation of purchase the item.
     * 
     * If $singleHold is true, $old parameter will be passed as the item to be modified.
     * The method should return the purchase result data for history item.
     * If the method return true, the purchase will be recorded with no data.
     * If the method return false, return cannot purchase error.
     * If the method return string, it WILL be considered as data and success.
     * if the method return array, the first element should be bool, the second element should be string.
     * @example return [true, json_encode(["data"=>"data"])];
     * @example return [false, "error.rest"];
     * @example return false;
     * @param StoreItem $item
     * @param User $user
     * @return array|bool|string
     */
    public abstract function purchase(StoreItem $item, User $user, PurchaseHistory|null $old = null, PurchaseContext $context): array|bool|string;

    /**
     * Operation of use the item.
     * @param PurchaseHistory $item
     * @param User $user
     * @return bool
     */
    public function useItem(PurchaseHistory $item, User $user, string $data, UseContext $context): bool
    {
        return false;
    }
    /**
     * Check if the user can purchase the item.
     * If cannot purchase, the method should return string for reason or false for unknown.
     * @param StoreItem $item
     * @param User $user
     * @return bool
     */
    public function canPurchase(StoreItem $item, User $user): bool|string
    {
        return true;
    }

    /**
     * Provide attributes to controller in itemData field.
     * The method will also be called when create the item to validate the provider data is correct.
     * **if item is no longer available, add "_unavailable"=>true to the return data;**
     * @param StoreItem $item
     * @param User $user
     * @return array
     */
    public function serialize(StoreItem $item): array
    {
        return [];
    }

    /**
     * Provide attributes to controller in itemData field.
     * These data may used to create HistoryBox on frontend
     * **if item is no longer available, add "_unavailable"=>true to the return data;**
     * @param PurchaseHistory $item
     * @param User $user
     * @return array
     */
    public function serializeHistory(PurchaseHistory $item): array
    {
        return [];
    }
}