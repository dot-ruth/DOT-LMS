<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="Events",
 * )
 */

class Events extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_title', 'event_start', 'event_end', 'event_id', 'teacher_id', 'course_id'
    ];

    /**
     * @OA\Property(
     *      title="event_title",
     *      description="The title of the Event",
     *      example="Assignment Deadline"
     * )
     *
     * @var string
     */
    public $event_title;

    /**
     * @OA\Property(
     *      title="event_start",
     *      description="The starting date of the event",
     *      type="string",
     *      format="date"
     * )
     *
     * @var string
     */
    public $event_start;

    /**
     * @OA\Property(
     *      title="event_end",
     *      description="The ending date of the event",
     *      type="string",
     *      format="date"
     * )
     *
     * @var string
     */
    public $event_end;

    /**
     * @OA\Property(
     *      title="teacher_id",
     *      description="The id of the teacher that created the event",
     *      example=""
     * )
     *
     * @var string
     */
    public $teacher_id;

    /**
     * @OA\Property(
     *      title="course_id",
     *      description="The id of the course the event belongs to",
     *      example=""
     * )
     *
     * @var string
     */
    public $course_id;
}
