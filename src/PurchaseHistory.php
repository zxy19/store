<?php

namespace Xypp\Store;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;

class PurchaseHistory extends AbstractModel
{
    protected $dates = ['expire_at',"created_at", "updated_at"];
    protected $table = 'purchase_history';
    public $valid = true;
    public $dataAttrs = [];
    public $unavailable = false;
    public function user()
    {
        return $this->belongsTo(\Flarum\User\User::class, "user_id", "id");
    }
    public function store_item()
    {
        return $this->belongsTo(StoreItem::class, "item_id", "id");
    }
}