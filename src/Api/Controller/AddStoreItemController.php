<?php

namespace Xypp\Store\Api\Controller;

use Carbon\Carbon;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\StoreItem;
use Xypp\Store\StoreItemRepository;


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
        } else {
            $model = new StoreItem();
        }
        $model->name = Arr::get($attributes, 'name');
        $model->desc = Arr::get($attributes, 'desc');
        $model->price = Arr::get($attributes, 'price');
        $model->provider = Arr::get($attributes, 'provider');
        $model->provider_data = Arr::get($attributes, 'provider_data');
        $model->dataAttrs = StoreItemRepository::getAttrData($model);
        $model->save();
        return $model;
    }
}