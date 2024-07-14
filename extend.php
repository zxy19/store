<?php

/*
 * This file is part of xypp/store.
 *
 * Copyright (c) 2023 小鱼飘飘.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Xypp\Store;

use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Xypp\Store\Api\Controller\history\GetHistoryController;
use Xypp\Store\Api\Controller\history\ListHistoryController;
use Xypp\Store\Api\Controller\storeItems\AddStoreItemController;
use Xypp\Store\Api\Controller\storeItems\GetStoreItemController;
use Xypp\Store\Api\Controller\storeItems\ListStoreItemController;
use Xypp\Store\Api\Controller\storeItems\PurchaseStoreItemController;
use Xypp\Store\Api\Controller\history\RemoveHistoryController;
use Xypp\Store\Api\Controller\history\UseHistoryController;
use Xypp\Store\Api\Controller\storeItems\RemoveStoreItemController;
use Xypp\Store\Api\Serializer\PurchaseHistorySerializer;
use Xypp\Store\Api\Serializer\StoreItemSerializer;
use Xypp\Store\Event\ExpireInstantly;
use Xypp\Store\Listener\ExpireInstantlyListener;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        // For some other plugin has used /store. To be compatible with it.
        ->route('/store-page', 'store.index', function ($document) {
            return $document;
        }),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Routes("api"))
        ->get("/store-item", "store-item.list", ListStoreItemController::class)
        ->post("/store-item", "store-item.create", AddStoreItemController::class)
        ->get("/store-item/{id}", "store-item.get", GetStoreItemController::class)
        ->get("/store-item/{id}/delete", "store-item.delete", RemoveStoreItemController::class)
        ->get("/store-item/{id}/purchase", "store-item.purchase", PurchaseStoreItemController::class)
        ->get("/purchase-history", "purchase-history.list", ListHistoryController::class)
        ->post("/purchase-history/{id}", "purchase-history.get", GetHistoryController::class)
        ->post("/purchase-history/{id}/use", "purchase-history.use", UseHistoryController::class)
        ->get("/purchase-history/{id}/delete", "purchase-history.delete", RemoveHistoryController::class),
    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(function ($serializer, $user, $attributes) {
            $attributes['canCreateStoreItem'] = $serializer->getActor()->can('addStoreItem');
            return $attributes;
        }),
    (new Extend\ApiSerializer(PurchaseHistorySerializer::class))
        ->hasOne('store_item', StoreItemSerializer::class),
    (new Extend\Console())
        ->command(Console\ExpireScheduleCommand::class)
        ->schedule(Console\ExpireScheduleCommand::class, function ($event) {
            $event->everyMinute()->withoutOverlapping();
        }),
    new Extend\Locales(__DIR__ . '/locale'),
];
