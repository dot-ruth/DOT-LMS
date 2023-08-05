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
        Schema::create('gradebook', function (Blueprint $table) {
            $table->id();
            $table->string('grade_id')->unique();
            $table->string('course_id');
            $table->foreign('course_id')->references('course_id')->on('courses')->onDelete('cascade');
            $table->string('attendance');
            $table->string('individual_assignment');
            $table->string('group_assignment');
            $table->string('mid_exam');
            $table->string('final_exam');
            $table->string('total_value');
            $table->string('student_id');
            $table->foreign('student_id')->references('student_id')->on('student_users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gradebooks');
    }
};
