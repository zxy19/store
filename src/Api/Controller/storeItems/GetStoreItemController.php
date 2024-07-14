<?php

namespace Xypp\Store\Api\Controller\storeItems;

use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\StoreItem;

class GetStoreItemController extends AbstractShowController
{
    public $serializer = \Xypp\Store\Api\Serializer\StoreItemSerializer::class;
    protected StoreHelper $storeHelper;
    public function __construct(StoreHelper $storeHelper)
    {
        $this->storeHelper = $storeHelper;
    }

    public function data($request, $routeHandler)
    {
        $id = Arr::get($request->getQueryParams(), "id", "");
        $item = StoreItem::find($id);
        if (!$item) {
            $this->storeHelper->exceptionWith("xypp-store.forum.store_item.not_found");
        }
        return $item;
    }
}