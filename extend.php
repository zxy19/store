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
use Xypp\Store\Api\Controller\AddStoreItemController;
use Xypp\Store\Api\Controller\listStoreItemController;
use Xypp\Store\Api\Controller\PurchaseStoreItemController;
use Xypp\Store\Api\Controller\RemoveStoreItemController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/store', 'store.index', function ($document) {
            return $document;
        }),
    // (new Extend\Frontend('admin'))
    //     ->js(__DIR__.'/js/dist/admin.js')
    //     ->css(__DIR__.'/less/admin.less'),
    (new Extend\Routes("api"))
        ->get("/store-item", "store-item.list", listStoreItemController::class)
        ->post("/store-item", "store-item.create", AddStoreItemController::class)
        ->get("/store-item/{id}/delete", "store-item.delete", RemoveStoreItemController::class)
        ->get("/store-item/{id}/purchase", "store-item.purchase", PurchaseStoreItemController::class),
    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(function ($serializer, $user, $attributes) {
            $attributes['canCreateStoreItem'] = $serializer->getActor()->can('addStoreItem');
            return $attributes;
        }),
    new Extend\Locales(__DIR__ . '/locale'),
];
