<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return [
    'up' => function ($schema) {
        $schema->table("purchase_history", function (Blueprint $table) {
            $table->timestamps();
        });
    },
    'down' => function ($schema) {
        $schema->table("purchase_history", function (Blueprint $table) {
            $table->dropColumn('created_at');
            $table->dropColumn('updated_at');
        });
    }
];