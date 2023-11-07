<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="Grade",
 *      description="Grade data",
 * )
 */

class gradebook extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id', 'attendance',
        'individual_assignment', 'group_assignment',
        'mid_exam', 'final_exam',  'student_id'
    ];

    /**
     * @OA\Property(
     *      title="course_id",
     *      description="The ID of the course the grade belongs to",
     *      example="CUS-4161"
     * )
     *
     * @var string
     */
    public $course_id;

    /**
     * @OA\Property(
     *      title="attendance",
     *      description="The attendance value of a student",
     *      example="5"
     * )
     *
     * @var string
     */
    public $attendance;

    /**
     * @OA\Property(
     *      title="individual_assignment",
     *      description="individual_assignment value of the Student",
     *      example="15"
     * )
     *
     * @var string
     */
    public $individual_assignment;

    /**
     * @OA\Property(
     *      title="group_assignment",
     *      description="group_assignment value of the Student",
     *      example="15"
     * )
     *
     * @var string
     */
    public $group_assignment;

    /**
     * @OA\Property(
     *      title="mid_exam",
     *      description=" mid_exam value of the Student",
     *      example="15"
     * )
     *
     * @var string
     */
    public $mid_exam;

    /**
     * @OA\Property(
     *      title="final_exam",
     *      description=" final_exam value of a student",
     *      example="50"
     * )
     *
     * @var string
     */
    public $final_exam;

    /**
     * @OA\Property(
     *      title="student_id",
     *      description=" the ID of the student the grade belongs to",
     *      example="DBUR-4825-23"
     * )
     *
     * @var string
     */
    public $student_id;

    public function course()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }

    public function student()
    {
        return $this->belongsTo(StudentUser::class, 'Student_id');
    }
}
