<?php

namespace Xypp\Store\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\StoreItem;
use Xypp\Store\StoreItemRepository;


class RemoveStoreItemController extends AbstractDeleteController
{
    public $serializer = \Xypp\Store\Api\Serializer\StoreItemSerializer::class;

    protected function delete(Request $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan("removeStoreItem");
        $id = Arr::get($request->getQueryParams(), 'id');
        StoreItem::findOrFail($id)->delete();
    }
}
