<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Illuminate\Contracts\Pagination\Paginator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;
use Xypp\Store\Helper\ProviderHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use Xypp\Store\Helper\StoreHelper;

class ListHistoryController extends AbstractListController
{
    public $include = ['store_item'];
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;
    protected ProviderHelper $helper;
    public function __construct(ProviderHelper $helper)
    {
        $this->helper = $helper;
    }

    protected function data(Request $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $type = Arr::get($request->getQueryParams(), "type", "");
        $id = Arr::get($request->getQueryParams(), 'id');
        if (is_null($id)) {
            $id = $actor->id;
        } else {
            if ($id != $actor->id)
                $actor->assertCan("viewHistory");
        }
        $q = PurchaseHistory::where('user_id', $id)->whereIn("provider", $this->helper->providersShowInHistory());
        if ($type) {
            $q->where("provider", $type);
        }
        $result = $q->get();
        foreach ($result as $item) {
            $r = $this->helper->canUse($item, $actor);
            if ($r === true) {
                $item->unavailable = false;
            } else {
                if (!$r)
                    $r = "xypp-store.forum.history.unable_to_use";
                $item->unavailable = $r;
            }
        }
        $this->loadRelations($result, $this->include, $request);
        return $result;
    }
}