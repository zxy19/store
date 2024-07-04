<?php

namespace Xypp\Store\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Xypp\Store\StoreItem;
use InvalidArgumentException;
use Xypp\Store\StoreItemRepository;

class StoreItemSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'store-items';
    /**
     * {@inheritdoc}
     *
     * @param StoreItem $model
     * @throws InvalidArgumentException
     */
    protected function getDefaultAttributes($model)
    {
        if (!($model instanceof StoreItem)) {
            throw new InvalidArgumentException(
                get_class($this) . ' can only serialize instances of ' . StoreItem::class
            );
        }

        // See https://docs.flarum.org/extend/api.html#serializers for more information.
        if ($model->dataAttrs == null) {
            $model->dataAttrs = StoreItemRepository::getAttrData($model);
        }

        return [
            "id" => $model->id,
            "provider" => $model->provider,
            "name" => $model->name,
            "desc" => $model->desc,
            "price" => $model->price,
            "data" => $model->dataAttrs,
            "unavailable" => $model->unavailable,
            "provider_data" => $model->provider_data
        ];
    }
}