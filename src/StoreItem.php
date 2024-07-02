<?php

namespace Xypp\Store;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;

class StoreItem extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'store_item';

    public $dataAttrs = [];
    public $unavailable = false;
}
