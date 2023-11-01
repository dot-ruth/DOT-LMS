<?php

namespace App\Http\Controllers;

use Pusher\Pusher;
use App\Models\messages;
use App\Events\ChatMessage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User_Role;

class MessagesController extends Controller
{


    /**
     * @OA\Get(
     *      path="/Messages",
     *      tags={"Messages"},
     *      summary="Get list of Messages ",
     *      description="Returns list of Messages",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server error",
     *      ),
     *     )
     */
    public function index()
    {
        return messages::with('user_roles')->get();
    }

    /**
     * @OA\Post(
     *      path="/Messages",
     *      tags={"Messages"},
     *      summary="Send Message functionality",
     *      description="Returns the status if the message is sent or not",
     *      @OA\RequestBody(
     *          required=true,
     *     @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(ref="#/components/schemas/messages")
     *   )  
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */

    public function store(Request $request)
    {
        // $message_id = 'MSG-' . mt_rand(100, 999);
        // $message = new messages();
        // $message->message_id = $message_id;
        // $message->Message_content = $request->message_content;
        // $message->Message_reciever_id = $request->message_reciever_id;
        // $message->Message_sender_id = $request->message_sender_id;
        // $message->save();
        $user = User_Role::where('user_id', $request->id);

        $message = $user->messages()->create([
            'message' => $request->input('message')
        ]);

        // send event to listeners
        broadcast(new ChatMessage($message, $user))->toOthers();

        return [
            'message' => $message,
            'user' => $user,
        ];
    }

    /* @OA\Get(
        *      path="/Messages/{id}",
        *      tags={"Messages"},
        *      summary="Get a specific Message data",
        *      description="Returns the specified Message data",
        *      @OA\Parameter(
        *          name="id",
        *          description="Message id",
        *          required=true,
        * example = "MSG-7539",
        *          in="path",
        *          @OA\Schema(
        *              type="string"
        *          )
        *      ),
        *      @OA\Response(
        *          response=200,
        *          description="Successful operation",
        *          
        *       ),
        *      @OA\Response(
        *          response=400,
        *          description="Bad Request"
        *      ),
        *      @OA\Response(
        *          response=401,
        *          description="Unauthenticated",
        *      ),
        *      @OA\Response(
        *          response=500,
        *          description="Server Error"
        *      )
        * )
        */

    public function show(string $id)
    {
        return messages::where('message_id', $id)->findOrFail();
    }

    /**
     * @OA\Put(
     *      path="/Messages/{id}",
     *      tags={"Messages"},
     *      summary="Update existing Message",
     *      description="Returns updated Message's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Message's id",
     *          required=true,
     *          example = "MSG-7539",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *         @OA\MediaType(
     *          mediaType="multipart/form-data",
     *          @OA\Schema(ref="#/components/schemas/messages")
     *     )    
     *      ),
     *      @OA\Response(
     *          response=202,
     *          description="Successful operation",
     *       ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */

    public function update(Request $request, string $id)
    {
        $message = messages::where('message_id', $id)->findOrFail();
        $message->update($request->all());
        return $message;
    }

    /**
     * @OA\Delete(
     *      path="/Messages/{id}",
     *      tags={"Messages"},
     *      summary="Delete existing Message",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Message's id",
     *          required=true,
     *          in="path",
     * example = "MSG-7539",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Successful operation",
     *          
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Resource Not Found"
     *      )
     * )
     */

    public function destroy(string $id)
    {
        $message = messages::where('message_id', $id)->findOrFail();
        return $message->destroy();
    }
}
