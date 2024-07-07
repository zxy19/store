<?php

namespace Xypp\Store\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Illuminate\Support\Arr;
use Xypp\Store\PurchaseHistory;
use Xypp\Store\StoreItem;
use InvalidArgumentException;
use Xypp\Store\StoreItemRepository;

class PurchaseHistorySerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'purchase-history';
    protected StoreItemSerializer $storeItemSerializer;
    public function __construct(StoreItemSerializer $storeItemSerializer)
    {
        $this->storeItemSerializer = $storeItemSerializer;
    }

    /**
     * {@inheritdoc}
     *
     * @param StoreItem $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof PurchaseHistory)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . PurchaseHistory::class
            );
        }
        $model->dataAttrs = StoreItemRepository::getAttrHistory($model);

        return [
            "id" => $model->id,
            "provider" => $model->provider,
            "data" => $model->data,
            "can_use" => StoreItemRepository::canUse($model),
            "expire_at" => $model->expire_at,
            "rest_cnt" => $model->rest_cnt,
            "valid" => !Arr::get($model->dataAttrs, "_unavailable", false)
        ];
    }
}
