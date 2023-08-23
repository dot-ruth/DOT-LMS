<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="MockExam",
 *      description="Exam data",
 * )
 */

class MockExam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id', 'exam_title', 'exam_topic', 'exam_content', 'course_id', 'teacher_id'
    ];


    /**
     * @OA\Property(
     *      title="exam_title",
     *      description="Title of the Exam",
     *      example="Web Development"
     * )
     *
     * @var string
     */
    public $exam_title;



    /**
     * @OA\Property(
     *      title="exam_contents",
     *      description="The exam in a pdf form",
     *      property="exam_contents",
     *      type="string",
     *      format="binary",
     * )
     *
     * @var string
     */
    public $exam_contents;

    /**
     * @OA\Property(
     *      title="exam_topic",
     *      description="The topic's the exam focuses on",
     *      example="Javascript"
     * )
     *
     * @var string
     */
    public $exam_topic;

    /**
     * @OA\Property(
     *      title="course_id",
     *      description="The id of the course the exam is related to",
     *      example="CUS-5432"
     *      
     * )
     *
     * @var string
     */
    public $course_id;

    /**
     * @OA\Property(
     *      title="teacher_id",
     *      description="The id of the teacher the exam belongs to",
     *      example="TCH-5432"
     *      
     * )
     *
     * @var string
     */
    public $teacher_id;

    public function course()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }

    public function teacher()
    {
        return $this->belongsTo(TeacherUser::class, 'teacher_id');
    }
}
