<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *      title="Teacher",
 *      description="Teacher data",
 * )
 */

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
        'course_id',
    ];

    /**
     * @OA\Property(
     *      title="first_name",
     *      description="First Name of the Teacher",
     *      example="John"
     * )
     *
     * @var string
     */
    public $first_name;

    /**
     * @OA\Property(
     *      title="last_name",
     *      description="Last Name of the Teacher",
     *      example="Doe"
     * )
     *
     * @var string
     */
    public $last_name;

    /**
     * @OA\Property(
     *      title="email",
     *      description="Email Address of the Teacher",
     *      example="Johndoe@gmail.com"
     * )
     *
     * @var string
     */
    public $email;

    /**
     * @OA\Property(
     *      title="department",
     *      description="department of the Teacher",
     *      example="Software Engineering"
     * )
     *
     * @var string
     */
    public $department;

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
