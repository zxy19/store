<?php

namespace Xypp\Store\Api\Controller\storeItems;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\StoreItem;

class PurchaseStoreItemController extends AbstractCreateController
{
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;
    protected StoreHelper $helper;
    public function __construct(StoreHelper $storeUserHelper)
    {
        $this->helper = $storeUserHelper;
    }
    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $id = Arr::get($request->getQueryParams(), 'id');
        $item = StoreItem::findOrFail($id);
        $newModel = $this->helper->userPurchase($actor, $item);
        return $newModel;
    }
}