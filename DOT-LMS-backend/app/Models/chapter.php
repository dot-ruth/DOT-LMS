<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="Chapters",
 *      description="Chapter data",
 * )
 */

class chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'chapter_id', 'chapter_title', 'file_name', 'course_id', 'chapter_description', 'chapter_contents'
    ];

    // protected $casts = [
    //     'file_name' => 'array',
    //     'chapter_contents' => 'array'
    // ];

    /**
     * @OA\Property(
     *      title="chapter_title",
     *      description="Title of the Chapter",
     *      example="HTML"
     * )
     *
     * @var string
     */
    public $chapter_title;

    /**
     * @OA\Property(
     *      title="course_id",
     *      description="The ID of the course this chapter belongs to",
     *      example="CUS-4857"
     * )
     *
     * @var string
     */
    public $course_id;

    /**
     * @OA\Property(
     *      title="file_name",
     *      description="The name of the file to be uploaded",
     *      example="HTML"
     * )
     *
     * @var string
     */
    public $file_name;

    /**
     * @OA\Property(
     *      title="chapter_contents",
     *      description="A pdf or any other type file for the chapter",
     *      property="chapter_contents",
     *      type="string",
     *      format="binary",
     * )
     *
     * @var string
     */
    public $chapter_contents;

    /**
     * @OA\Property(
     *      title="chapter_description",
     *      description="A Brief description of the chapter ",
     *      example="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a varius nisl, a tempor felis. Aenean pretium convallis odio, at gravida lorem imperdiet porttitor. Pellentesque vitae eros rhoncus, euismod lectus at, bibendum urna. Integer id dolor at mi vulputate iaculis. Donec sodales nisl cursus, fermentum nibh quis, vehicula dolor. In facilisis lacus vitae imperdiet gravida. Suspendisse leo erat, rutrum vel pharetra vitae, vehicula commodo dui. Donec molestie, magna ut sodales faucibus, est turpis finibus tellus, tincidunt dapibus libero metus non orci. Sed tempor turpis dui, at vehicula tortor lacinia vel. Quisque at leo eget leo pretium semper. Suspendisse venenatis porta sapien eu finibus. Maecenas ultrices ut lacus nec feugiat. Quisque laoreet sapien ac dui faucibus, non euismod dui condimentum. Fusce ultrices leo id nibh hendrerit, non maximus justo scelerisque. Fusce semper lacus massa, quis auctor risus feugiat et. Curabitur volutpat nulla non nibh elementum, ut tempus metus imperdiet."
     * )
     *
     * @var string
     */
    public $chapter_description;

    public function courses()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }
}
