<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class courses extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_title',
        'course_id',
        'course_img',
        'course_topic',
        'course_description'
    ];

    public function chapter()
    {
        return $this->hasMany(chapter::class, 'course_id');
    }

    public function teacher()
    {
        return $this->belongsTo(TeacherUser::class, 'course_id');
    }

    public function mockexam()
    {
        return $this->hasMany(MockExam::class, 'course_id');
    }

    public function assignment()
    {
        return $this->hasMany(assignment::class, 'course_id');
    }

    public function grade()
    {
        return $this->hasOne(gradebook::class, 'course_id');
    }
}
