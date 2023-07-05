<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user__roles', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('role');
            $table->string('password')->nullable();
            $table->string('table_name');
            $table->string('column_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user__roles');
    }
};
