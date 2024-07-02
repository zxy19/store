<?php

namespace Xypp\Store;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;

class PurchaseHistory extends AbstractModel
{
    protected $table = 'purchase_history';
}
