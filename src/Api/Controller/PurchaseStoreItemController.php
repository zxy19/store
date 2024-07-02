<?php

namespace Xypp\Store\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use Middlewares\Utils\HttpErrorException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Xypp\Store\StoreItemRepository;

class PurchaseStoreItemController extends AbstractCreateController
{
    public $serializer = \Xypp\Store\Api\Serializer\StoreItemSerializer::class;
    protected StoreItemRepository $storeItemRepository;

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $item = StoreItem::findOrFail($id);

        if ($actor->money < $item->price) {
            throw new HttpErrorException("common.not_enough_money");
        }
        $purchaseOp = StoreItemRepository::applyPurchase($actor, $item);

        if ($purchaseOp === true) {
            $newModel = new PurchaseHistory();
            $newModel->user_id = $actor->id;
            $newModel->item_id = $item->id;
            $newModel->save();
            $actor->money -= $item->price;
            $actor->save();
        } else {
            throw new HttpErrorException($purchaseOp, 501);
        }

    }
}