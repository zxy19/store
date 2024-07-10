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
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\StoreHelper;


class UseHistoryController implements RequestHandlerInterface
{

    protected Dispatcher $events;
    protected Translator $translator;
    protected StoreHelper $helper;
    public function __construct(Dispatcher $events, Translator $translator, StoreHelper $helper)
    {
        $this->translator = $translator;
        $this->events = $events;
        $this->helper = $helper;
    }
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        if (is_null($id))
            $this->helper->exceptionWith("xypp-store.forum.use_result.fail.id_not_found");
        $item = PurchaseHistory::findOrFail($id);
        if (!$this->helper->canUse($item))
            $this->helper->exceptionWith("xypp-store.forum.use_result.fail.cannot");
        if (!is_null($item->rest_cnt) && $item->rest_cnt <= 0) {
            $this->helper->exceptionWith("xypp-store.forum.use_result.fail.not_enough");
        }
        $data = Arr::get($request->getParsedBody(), 'data', "");
        $item->rest_cnt--;
        $item->save();
        $context = new UseContext($actor, $item);
        if (!$this->helper->useItem($item, $actor, $data, $context)) {
            $item->rest_cnt++;
            $item->save();
            $this->helper->exceptionWith("xypp-store.forum.use_result.fail.error");
        }

        if ($context->toRemove) {
            if ($this->helper->applyExpire($item)) {
                $item->delete();
            } else {
                $item->rest_cnt++;
                $item->save();
                $this->helper->exceptionWith("xypp-store.forum.use_result.fail.fail_expire");
            }
        }
        if ($context->noConsume)
            $item->rest_cnt++;

        $this->events->dispatch(new UseDone($actor, $item));
        if ($item->isDirty()) {
            $item->save();
        }
        return new JsonResponse([
            "error" => ""
        ]);
    }
}
