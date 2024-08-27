<?php

namespace Xypp\Store;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;

/**
 * Purchase History Model. Describing a purchased item and also a history.
 * @property string $provider The provider of the store item.
 * @property string $user_id The user who purchased the item.
 * @property string $item_id The item id.
 * @property ?string $data The data of the purchase.
 * @property ?int $rest_cnt The rest count can be used.
 * @property ?\Carbon\Carbon $expire_at The expire time of the item.
 * @property int $id
 */
class PurchaseHistory extends AbstractModel
{
    protected $dates = ['expire_at', "created_at", "updated_at"];
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