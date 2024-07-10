<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Illuminate\Support\Arr;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;


class RemoveHistoryController extends AbstractDeleteController
{
    public $serializer = \Xypp\Store\Api\Serializer\PurchaseHistorySerializer::class;

    protected Translator $translator;
    protected StoreHelper $helper;
    public function __construct(Translator $translator, StoreHelper $helper)
    {
        $this->helper = $helper;
        $this->translator = $translator;
    }
    protected function delete(Request $request)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        $history = PurchaseHistory::findOrFail($id);
        if ($actor->id != $history->user_id)
            $actor->assertCan("removePurchaseHistory");
        if ($this->helper->applyExpire($history))
            $history->delete();
        else
            $this->helper->exceptionWith("xypp-store.forum.use_result.fail_expire");
    }
}
