<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'First_Name',
        'Last_Name',
        'Teacher_id',
        'Department',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function courses()
    {
        return $this->hasMany(courses::class, 'course_id');
    }

    public function mockexam()
    {
        return $this->hasMany(MockExam::class, 'teacher_id');
    }
}
