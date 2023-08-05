<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;

class AdminUserController extends Controller

{

    public function __construct()
    {
        //  $this->middleware('auth:api', ['except' => ['store', 'index']]);
    }

    function userExistsEmail($email)
    {
        return AdminUser::where('email', $email)->exists();
    }

    /**
     * @OA\Get(
     *      path="/Admin",
     *      operationId="index",
     *      tags={"Admin"},
     *      summary="Get list of Admins for the DOT-LMS",
     *      description="Returns list of Admins",
     *      @OA\Response(
     *          response=200,
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
     *      )
     *     )
     */
    public function index()
    {
        return AdminUser::all();
    }

    /**
     * @OA\Post(
     *      path="/Admin",
     *      operationId="store",
     *      tags={"Admin"},
     *      summary="Store new Admin data into the database",
     *      description="Returns the entered Admin's data",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/AdminUser")
     *      ),
     *      @OA\Response(
     *          response=201,
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
     *          response=403,
     *          description="Forbidden"
     *      ),
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', 'email'],
        ]);

        function userExistsID($id)
        {
            return AdminUser::where('admin_id', $id)->exists();
        }


        $admin_id = 'ADM-' . mt_rand(1000, 9999);

        while (userExistsID($admin_id)) {
            $admin_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');
        }


        if (!$this->userExistsEmail($request->email)) {
            $Admin_user = new AdminUser();

            $Admin_user->First_Name = $request->first_name;
            $Admin_user->Last_Name = $request->last_name;
            $Admin_user->admin_id = $admin_id;
            $Admin_user->Email = $request->email;
            $Admin_user->password = $request->password;
            $Admin_user->save();

            $token = JWTAuth::fromUser($Admin_user);

            $user = Auth::user();

            $one_time_passcode = mt_rand(100000, 999999);

            Cache::put($Admin_user->admin_id, $one_time_passcode);

            Mail::to($Admin_user->Email)->send(new DOTLMSMail($Admin_user->First_Name, $Admin_user->admin_id, $one_time_passcode));

            return response()->json(["success" => true, 'token' => $token, 'user' => $user]);
        } else {
            return response()->json(['Message' => 'User Already Exists']);
        }
    }

    /**
     * @OA\Get(
     *      path="/Admin/{id}",
     *      operationId="show",
     *      tags={"Admin"},
     *      summary="Get a specific Admin",
     *      description="Returns the specified Admin's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Admin's id",
     *          required=true,
     *          example = "ADM-6832",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
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
     *      )
     * )
     */
    public function show(string $id)
    {
        return AdminUser::where('Admin_id', $id)->firstOrFail();
    }

    /**
     * @OA\Put(
     *      path="/Admin/{id}",
     *      operationId="update",
     *      tags={"Admin"},
     *      summary="Update existing Admin",
     *      description="Returns updated Admin's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Admin's id",
     *          required=true,
     * example = "ADM-6832",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/AdminUser")
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


        if (!userExistsEmail($request->email)) {
            $user = AdminUser::where('admin_id', $id)->firstOrFail();
            $user->update($request->all());
            return $user;
        } else {
            return response()->json(['Message' => 'User Already Exists']);
        }
    }

    /**
     * @OA\Delete(
     *      path="/Admin/{id}",
     *      operationId="delete",
     *      tags={"Admin"},
     *      summary="Delete existing Admin",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Admin's id",
     *          required=true,
     *          in="path",
     * example = "ADM-6832",
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



        $user = AdminUser::where('admin_id', $id)->firstorFail();
        if ($user != null) {
            $user->delete();
            return response()->json(['Message' => 'User Deleted']);
        } else {
            return response()->json(['Message' => 'User does not exist']);
        }
    }
}
