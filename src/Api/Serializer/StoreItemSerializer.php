<?php

namespace Xypp\Store\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Illuminate\Support\Arr;
use Xypp\Store\StoreItem;
use InvalidArgumentException;
use Xypp\Store\Helper\ProviderHelper;

class StoreItemSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'store-item';
    protected ProviderHelper $helper;
    public function __construct(ProviderHelper $helper)
    {
        $this->helper = $helper;
    }

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
        try{
            $model->dataAttrs = $this->helper->getAttrData($model);
        }catch (\Exception $e){
            $model->dataAttrs = [];
        }

        return [
            "id" => $model->id,
            "provider" => $model->provider,
            "name" => $model->name,
            "desc" => $model->desc,
            "price" => $model->price,
            "unavailable" => $model->unavailable,
            "provider_data" => $model->provider_data,
            "data" => $model->dataAttrs,
            "expire_time" => $model->expire_time,
            "can_use" => $this->helper->canUse($model,true),
            "rest_cnt" => $model->rest_cnt,
            "use_cnt" => $model->use_cnt,
            "valid" => !Arr::get($model->dataAttrs, "_unavailable", false)
        ];
    }
}
