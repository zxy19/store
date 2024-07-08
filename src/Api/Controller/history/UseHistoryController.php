<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Xypp\Store\Context\UseContext;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\Helper\StoreHelper;


class UseHistoryController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        if (is_null($id))
            throw new ValidationException(["error" => "xypp-store.forum.use_result.fail.id_not_found"]);
        $item = PurchaseHistory::findOrFail($id);
        if (!StoreHelper::canUse($item))
            throw new ValidationException(["error" => "xypp-store.forum.use_result.fail.cannot"]);
        if (!is_null($item->rest_cnt) && $item->rest_cnt <= 0) {
            throw new ValidationException(["error" => "not_enough"]);
        }
        $data = Arr::get($request->getParsedBody(), 'data', "");
        $item->rest_cnt--;
        $item->save();
        $context = new UseContext($actor, $item);
        if (!StoreHelper::useItem($item, $actor, $data, $context)) {
            $item->rest_cnt++;
            $item->save();
            throw new ValidationException(["error" => "xypp-store.forum.use_result.fail.error"]);
        }

        if ($context->toRemove) {
            if (StoreHelper::applyExpire($item)) {
                $item->delete();
            } else {
                $item->rest_cnt++;
                $item->save();
                throw new ValidationException(["error" => "xypp-store.forum.use_result.fail.fail_expire"]);
            }
        }
        if ($context->noConsume)
            $item->rest_cnt++;

        if ($item->isDirty()) {
            $item->save();
        }
        return new JsonResponse([
            "error" => ""
        ]);
    }
}
