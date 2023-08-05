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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('assignment_id')->unique();
            $table->string('assignment_title');
            $table->string('assignment_content');
            $table->string('course_id');
            $table->string('student_id');
            $table->string('teacher_id');
            $table->foreign('course_id')->references('course_id')->on('courses');
            $table->foreign('student_id')->references('student_id')->on('student_users');
            $table->foreign('teacher_id')->references('teacher_id')->on('teacher_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
