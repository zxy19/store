<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\Translator;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Xypp\Store\Context\UseContext;
use Xypp\Store\Event\UseDone;
use Xypp\Store\Helper\StoreHelper;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\ProviderHelper;


class UseHistoryController implements RequestHandlerInterface
{

    protected StoreHelper $helper;
    public function __construct(StoreHelper $storeUserHelper)
    {
        $this->helper = $storeUserHelper;
    }
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        if (is_null($id))
            $this->helper->exceptionWith("xypp-store.forum.use_result.fail.id_not_found");
        $item = PurchaseHistory::findOrFail($id);
        $data = Arr::get($request->getParsedBody(), 'data', "");
        $msg = $this->helper->useItem($actor, $item, $data);
        return new JsonResponse([
            "msg" => $msg
        ]);
    }
}
