<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'chapter_id', 'chapter_title', 'course_id', 'chapter_description', 'chapter_contents'
    ];

    public function courses()
    {
        return $this->belongsTo(courses::class, 'course_id');
    }
}
