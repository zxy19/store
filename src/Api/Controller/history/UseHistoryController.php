<?php

namespace Xypp\Store\Api\Controller\history;

use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItemRepository;


class UseHistoryController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        if (is_null($id))
            return new JsonResponse([
                "error" => "id_not_found"
            ], 404);
        $item = PurchaseHistory::findOrFail($id);
        if (!StoreItemRepository::canUse($item))
            return new JsonResponse([
                "error" => "cant_use"
            ], 500);
        if (!is_null($item->rest_cnt) && $item->rest_cnt <= 0) {
            return new JsonResponse([
                "error" => "no_rest"
            ], 500);
        }
        $data = Arr::get($request->getParsedBody(), 'data', "");
        $item->rest_cnt--;
        $item->save();
        if (!StoreItemRepository::useItem($item, $actor, $data)) {
            $item->rest_cnt++;
            $item->save();
            return new JsonResponse([
                "error" => "fail"
            ], 500);
        }
        if ($item->isDirty()) {
            $item->save();
        }
        return new JsonResponse([
            "error" => ""
        ]);
    }
}
