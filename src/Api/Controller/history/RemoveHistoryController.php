<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Illuminate\Support\Arr;
use Xypp\Store\PurchaseHistory;


class RemoveHistoryController extends AbstractDeleteController
{
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;

    protected function delete(Request $request)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $history = PurchaseHistory::findOrFail($id);
        if ($actor->id != $history->user_id)
            $actor->assertCan("removePurchaseHistory");

        $history->delete();
    }
}
