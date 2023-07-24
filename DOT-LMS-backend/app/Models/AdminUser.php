<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *      title="Admin",
 *      description="Admin data",
 * )
 */

class AdminUser extends Model implements JWTSubject
{
    use  HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'admin_id'
    ];


    /**
     * @OA\Property(
     *      title="first_name",
     *      description="First Name of the Admin",
     *      example="John"
     * )
     *
     * @var string
     */
    public $first_name;

    /**
     * @OA\Property(
     *      title="last_name",
     *      description="last Name of the Admin",
     *      example="Doe"
     * )
     *
     * @var string
     */
    public $last_name;

    /**
     * @OA\Property(
     *      title="email",
     *      description="email address of the Admin",
     *      example="Johndoe@gmail.com"
     * )
     *
     * @var string
     */
    public $email;

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
}
