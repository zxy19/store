<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'purchase_history',
    function (Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned();
        $table->integer('item_id')->unsigned();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('item_id')->references('id')->on('store_item')->onDelete('cascade');
        $table->string('provider');
        $table->timestamp('expire_at')->nullable();
        $table->string('data')->nullable();
        $table->integer("rest_cnt")->nullable();
    }
);