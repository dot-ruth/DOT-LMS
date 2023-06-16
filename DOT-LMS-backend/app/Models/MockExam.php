<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MockExam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id', 'exam_title', 'exam_topic', 'exam_content', 'course_id', 'teacher_id'
    ];
}
