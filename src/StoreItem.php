<?php

namespace Xypp\Store;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
