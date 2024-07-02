<?php

namespace Xypp\Store\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Pagination\Paginator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Xypp\Store\StoreItemRepository;


class listStoreItemController extends AbstractListController
{
    public $serializer = \Xypp\Store\Api\Serializer\StoreItemSerializer::class;

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $result = StoreItem::all();
        foreach ($result as $item) {
            $r = StoreItemRepository::isAvailable($actor, $item, PurchaseHistory::where('user_id', $actor->id)->count());
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