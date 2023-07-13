<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class TeacherUser extends Model implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'teacher_id',
        'email',
        'department',
        'password',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

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

    public function assignment()
    {
        return $this->hasMany(assignment::class, 'teacher_id');
    }
}
