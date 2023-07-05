<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'department',
        'year',
        'semester',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];



    public function assignment()
    {
        return $this->hasMany(assignment::class, 'student_id');
    }

    public function grade()
    {
        return $this->hasMany(gradebook::class, 'student_id');
    }
}
