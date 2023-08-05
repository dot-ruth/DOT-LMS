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
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->string('chapter_id')->unique();
            $table->string('chapter_title');
            $table->string('course_id');
            $table->foreign('course_id')->references('course_id')->on('courses');
            $table->longText('chapter_description');
            $table->string('file_name');
            $table->string('chapter_contents');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
