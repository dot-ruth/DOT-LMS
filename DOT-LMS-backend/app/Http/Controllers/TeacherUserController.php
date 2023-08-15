<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\TeacherUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class TeacherUserController extends Controller
{


    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * @OA\Get(
     *      path="/Teacher",
     *      tags={"Teacher"},
     *      summary="Get list of Teachers in the DOT-LMS",
     *      description="Returns list of Teachers",
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
        return response()->json(["teachers" => TeacherUser::all(), "teacher_count" => TeacherUser::count()]);
    }

    /**
     * @OA\Post(
     *      path="/Teacher",
     *      security={{"jwt":{}}},
     *      tags={"Teacher"},
     *      summary="Store new Teacher's data into the database",
     *      description="Returns the entered Teacher's data",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/TeacherUser")
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
            'department' => 'required',
        ]);

        function userExists($id, $email)
        {
            return TeacherUser::where('teacher_id', $id)->exists() || TeacherUser::where('email', $email)->exists();
        }

        $teacher_id = 'TCH-' . mt_rand(1000, 9999);

        if (userExists($teacher_id, $request->email)) {
            $teacher_id = 'TCH-' . mt_rand(1000, 9999);
        }

        if (!userExists($teacher_id, $request->email)) {
            $teacher_user = new TeacherUser();
            $teacher_user->First_Name = $request->first_name;
            $teacher_user->Last_Name = $request->last_name;
            $teacher_user->Email = $request->email;
            $teacher_user->teacher_id = $teacher_id;
            $teacher_user->Department = $request->department;
            $teacher_user->password = $request->password;
            $teacher_user->save();

            $token = JWTAuth::fromUser($teacher_user);

            $one_time_passcode = mt_rand(100000, 999999);

            Cache::put($teacher_user->teacher_id, $one_time_passcode);

            Mail::to($teacher_user->Email)->send(new DOTLMSMail($teacher_user->First_Name, $teacher_user->teacher_id, $one_time_passcode));

            return response()->json(["success" => true, 'token' => $token]);
        } else {
            return response()->json(['error' => 'User Already Exists']);
        }
    }

    /**
     * @OA\Get(
     *      path="/Teacher/{id}",
     *      
     *      tags={"Teacher"},
     *      summary="Get a specific Teacher",
     *      description="Returns the specified Teacher's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Teacher's id",
     *          required=true,
     * example = "TCH-6832",
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
        return TeacherUser::where('Teacher_id', $id)->firstOrFail();
    }

    /**
     * @OA\Put(
     *      path="/Teacher/{id}",
     *      
     *      tags={"Teacher"},
     *      summary="Update existing Teacher",
     *      description="Returns updated Teacher's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Teacher's id",
     *          required=true,
     * example = "TCH-6832",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/TeacherUser")
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
        $user = TeacherUser::where('Teacher_id', $id)->firstOrFail();
        $user->update($request->all());
        return $user;
    }

    /**
     * @OA\Delete(
     *      path="/Teacher/{id}",
     *      
     *      tags={"Teacher"},
     *      summary="Delete existing Teacher",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Teacher's id",
     *          required=true,
     *          in="path",
     * example = "TCH-6832",
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
        $user = TeacherUser::where('teacher_id', $id)->firstorFail();
        if ($user != null) {
            $user->delete();
            return response()->json(['Message' => 'User Deleted']);
        } else {
            return response()->json(['Message' => 'User does not exist']);
        }
    }

    /**
     * @OA\Post(
     *      path="/Teacher/Assign_courses",
     *      tags={"Teacher"},
     *      summary="Assign courses to teachers",
     *      description="Assign courses to teachers",
     *      @OA\RequestBody(
     *          required=true,
     * @OA\MediaType(
     *     mediaType="multipart/form-data",
     *     @OA\Schema(
     * @OA\Property(
     *                     property="teacher_id",
     *                     type="string",
     *                     example="TCH-3213"
     *                 ),
     * @OA\Property(
     *                     property="course_id",
     *                     type="string",
     *                     example="CUS-3245"
     * 
     *                 ),
     * )
     *   )
     *         
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
     * @OA\Response(
     *          response=500,
     *          description="Server Error"
     *      )
     * )
     */
    public function Assign_course(Request $request)
    {
        //$current_files = DB::table('chapters')->where('chapter_id', $request->chapter_id)->value($chapter_contents_column);
        $assigned_courses = DB::table('teacher_users')->where('teacher_id', $request->teacher_id)->value('course_id');
        $new_assigned_course =  $assigned_courses . ',' . $request->course_id;

        $teacher_user = TeacherUser::where('teacher_id', $request->teacher_id)->firstorFail();

        $teacher_user->update([
            'course_id' => $new_assigned_course,
        ]);

        return response()->json([
            'Assigned Courses' => DB::table('teacher_users')->where('teacher_id', $request->teacher_id)->value('course_id'),

        ]);
    }
}
