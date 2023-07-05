<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'assignment_id', 'assignment_title', 'assignment_content',
        'student_id', 'teacher_id', 'course_id'
    ];

    public function student()
    {
        return $this->belongsTo(StudentUser::class, 'Student_id');
    }

    public function teacher()
    {
        return $this->belongsTo(TeacherUser::class, 'teacher_id');
    }

    public function course()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }
}
