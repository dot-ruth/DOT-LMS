<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *      title="Student",
 *      description="Student data",
 * )
 */

class StudentUser extends Model implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'department',
        'year',
        'semester',
        'student_id',
        'course_id',
    ];

    /**
     * @OA\Property(
     *      title="first_name",
     *      description="First Name of the Student",
     *      example="John"
     * )
     *
     * @var string
     */
    public $first_name;

    /**
     * @OA\Property(
     *      title="last_name",
     *      description="last Name of the Student",
     *      example="Doe"
     * )
     *
     * @var string
     */
    public $last_name;

    /**
     * @OA\Property(
     *      title="email",
     *      description="email address of the Student",
     *      example="Johndoe@gmail.com"
     * )
     *
     * @var string
     */
    public $email;

    /**
     * @OA\Property(
     *      title="department",
     *      description="department of the Student",
     *      example="Software Engineering"
     * )
     *
     * @var string
     */
    public $department;

    /**
     * @OA\Property(
     *      title="year",
     *      description="Academic year of the Student",
     *      example="4"
     * )
     *
     * @var string
     */
    public $year;

    /**
     * @OA\Property(
     *      title="semester",
     *      description="in which semester of the academic year is the student currently attending",
     *      example="2"
     * )
     *
     * @var string
     */
    public $semester;

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
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

    public function courses()
    {
        return $this->hasMany(courses::class, 'course_id');
    }

    public function assignment()
    {
        return $this->hasMany(assignment::class, 'student_id');
    }

    public function grade()
    {
        return $this->hasMany(gradebook::class, 'student_id');
    }
}
