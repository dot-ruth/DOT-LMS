<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="Course",
 *      description="Course data",
 * )
 */

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

    /**
     * @OA\Property(
     *      title="course_title",
     *      description="Title of the Course",
     *      example="Web Development"
     * )
     *
     * @var string
     */
    public $course_title;



    /**
     * @OA\Property(
     *      title="course_img",
     *      description="A descriptive image of the course to be added",
     *      property="course_img",
     *      type="string",
     *      format="binary",
     * )
     *
     * @var string
     */
    public $course_img;

    /**
     * @OA\Property(
     *      title="course_topic",
     *      description="The topic's the course focuses on",
     *      example="Javascript,html,css,react"
     * )
     *
     * @var string
     */
    public $course_topic;

    /**
     * @OA\Property(
     *      title="course_description",
     *      description="A Brief description of the course to added",
     *      example="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a varius nisl, a tempor felis. Aenean pretium convallis odio, at gravida lorem imperdiet porttitor. Pellentesque vitae eros rhoncus, euismod lectus at, bibendum urna. Integer id dolor at mi vulputate iaculis. Donec sodales nisl cursus, fermentum nibh quis, vehicula dolor. In facilisis lacus vitae imperdiet gravida. Suspendisse leo erat, rutrum vel pharetra vitae, vehicula commodo dui. Donec molestie, magna ut sodales faucibus, est turpis finibus tellus, tincidunt dapibus libero metus non orci. Sed tempor turpis dui, at vehicula tortor lacinia vel. Quisque at leo eget leo pretium semper. Suspendisse venenatis porta sapien eu finibus. Maecenas ultrices ut lacus nec feugiat. Quisque laoreet sapien ac dui faucibus, non euismod dui condimentum. Fusce ultrices leo id nibh hendrerit, non maximus justo scelerisque. Fusce semper lacus massa, quis auctor risus feugiat et. Curabitur volutpat nulla non nibh elementum, ut tempus metus imperdiet."
     * )
     *
     * @var string
     */
    public $course_description;

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
