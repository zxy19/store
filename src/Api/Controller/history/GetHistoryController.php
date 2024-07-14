<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;

class GetHistoryController extends AbstractShowController
{
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;
    protected StoreHelper $storeHelper;
    public function __construct(StoreHelper $storeHelper)
    {
        $this->storeHelper = $storeHelper;
    }

    public function data($request, $routeHandler)
    {
        $actor = $request->getAttribute('actor');
        $id = Arr::get($request->getQueryParams(), "id", "");
        $history = PurchaseHistory::find($id);
        if (!$history) {
            $this->storeHelper->exceptionWith("xypp-store.forum.purchase_history.not_found");
        }
        if ($history->user()->first()->id != $actor->id) {
            $actor->assertCan('viewHistory');
        }
        return $history;
    }
}