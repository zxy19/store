<?php

namespace Xypp\Store\Api\Controller\storeItems;

use Carbon\Carbon;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\StoreItem;
use Xypp\Store\Helper\StoreHelper;


class AddStoreItemController extends AbstractCreateController
{
    public $serializer = \Xypp\Store\Api\Serializer\StoreItemSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan("addStoreItem");

        $attributes = Arr::get($request->getParsedBody(), 'attributes', []);
        if (Arr::get($attributes, 'id')) {
            $model = StoreItem::findOrFail(Arr::get($attributes, 'id'));
            if (!$model instanceof StoreItem) {
                throw new ValidationException(["error" => "edit.item_not_found"]);
            }
        } else {
            $model = new StoreItem();
        }
        $model->name = Arr::get($attributes, 'name');
        $model->desc = Arr::get($attributes, 'desc');
        $model->price = Arr::get($attributes, 'price');
        $model->provider = Arr::get($attributes, 'provider');
        $model->provider_data = Arr::get($attributes, 'provider_data');
        $model->expire_time = Arr::get($attributes, 'expire_time');
        if ($model->expire_time === "") {
            $model->expire_time = null;
        }
        $model->rest_cnt = Arr::get($attributes, 'rest_cnt');
        if ($model->rest_cnt === "") {
            $model->rest_cnt = null;
        }
        $model->use_cnt = Arr::get($attributes, 'use_cnt');
        StoreHelper::getAttrData($model);
        $model->save();
        return $model;
    }
}