<?php

namespace Xypp\Store\Api\Controller\storeItems;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Middlewares\Utils\HttpErrorException;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Xypp\Store\StoreItemRepository;
use Carbon\Carbon;

class PurchaseStoreItemController extends AbstractCreateController
{
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;
    protected StoreItemRepository $storeItemRepository;

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $item = StoreItem::findOrFail($id);

        if ($actor->money < $item->price) {
            throw new ValidationException(['msg' => "common.not_enough_money"]);
        }
        if (!is_null($item->rest_cnt)) {
            if ($item->rest_cnt <= 0) {
                throw new ValidationException(['msg' => "common.not_enough_item"]);
            }
            $item->rest_cnt--;
            $item->save();
        }
        if (StoreItemRepository::isSingleHold($item)) {
            $newModel = PurchaseHistory::where("user_id", $actor->id)->where("item_id", $item->id)->first();
        }
        try {
            $data = StoreItemRepository::applyPurchase($actor, $item, $newModel);
        } catch (\Exception $e) {
            $item->rest_cnt++;
            $item->save();
            throw $e;
        }
        if (!$newModel) {
            $newModel = new PurchaseHistory();
        }
        $newModel->user_id = $actor->id;
        $newModel->item_id = $item->id;
        if ($newModel->rest_cnt)
            $newModel->rest_cnt += $item->use_cnt;
        else
            $newModel->rest_cnt = $item->use_cnt;
        $newModel->data = $data;
        if ($item->expire_time) {
            if (!$newModel->expire_at || Carbon::now()->greaterThan($newModel->expire_at))
                $newModel->expire_at = Carbon::now();

            $newModel->expire_at = $newModel->expire_at->addSeconds($item->expire_time);
        }
        $newModel->provider = $item->provider;

        $newModel->save();
        $actor->money -= $item->price;
        $actor->save();
        return $newModel;
    }
}