<?php

namespace Xypp\Store;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Store Item Model. Describing a item that can be purchased.
 * @property string $name Item name
 * @property string $description Item description
 * @property string $provider Item provider name
 * @property string $provider_data Item provider data
 * @property ?int $expire_time Item expire time, how many seconds after purchase
 * @property double $price Item price
 * @property ?int $rest_cnt Item rest count, means how many remain can be purchased
 * @property ?int $use_cnt Item use count, means how many times can be used
 * @property int $id
 */
class StoreItem extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'store_item';

    public $dataAttrs = [];
    public $unavailable = false;
    public $valid = true;

    public function history(): HasMany
    {
        return $this->hasMany(PurchaseHistory::class, "item_id", "id");
    }
}
