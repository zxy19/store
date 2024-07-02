<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'store_item',
    function (Blueprint $table) {
        $table->increments('id');
        $table->timestamps();
        $table->string('name');
        $table->string('desc');
        $table->string('provider');
        $table->double('price');
        $table->string('provider_data');
        $table->boolean('is_enabled');
        $table->boolean('is_valid');
    }
);