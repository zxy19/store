<?php

namespace Xypp\Store\Api\Controller\storeItems;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Pagination\Paginator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Xypp\Store\Helper\StoreHelper;


class ListStoreItemController extends AbstractListController
{
    public $serializer = \Xypp\Store\Api\Serializer\StoreItemSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $type = Arr::get($request->getQueryParams(), "type", "");
        if ($type) {
            $result = StoreItem::where("provider", $type)->get();
        } else {
            $result = StoreItem::all();
        }
        foreach ($result as $item) {
            $r = StoreHelper::isAvailable($actor, $item);
            if ($r === true) {
                $item->unavailable = false;
            } else {
                if (!$r)
                    $r = "common.unknown";
                $item->unavailable = $r;
            }
        }
        return $result;
    }
}