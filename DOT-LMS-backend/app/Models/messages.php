<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      title="messages",
 *      description="Message data",
 * )
 */

class messages extends Model
{
    use HasFactory;

    protected $fillable = [
        'message_id', 'message_content', 'message_reciever_id', 'message_sender_id'
    ];

    /**
     * @OA\Property(
     *      title="message_content",
     *      description="The Message to be sent",
     *      property="message_content",
     *      type="string",
     * )
     *
     * @var string
     */
    public $message_content;

    /**
     * @OA\Property(
     *      title="message_reciever_id",
     *      description="The user id of the reciever of the message",
     *      example="TCH-8734"
     * )
     *
     * @var string
     */
    public $message_reciever_id;

    /**
     * @OA\Property(
     *      title="message_sender_id",
     *      description="The user id of the sender of the message",
     *      example="TCH-5432"
     *      
     * )
     *
     * @var string
     */
    public $message_sender_id;
}
