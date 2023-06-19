<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gradebook extends Model
{
    use HasFactory;

    protected $fillable = [
        'grade_id', 'course_id', 'attendance',
        'individual_assignment', 'group_assignment',
        'mid_exam', 'final_exam', 'total_value', 'student_id'
    ];

    public function course()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }

    public function student()
    {
        return $this->belongsTo(StudentUser::class, 'student_id');
    }
}
