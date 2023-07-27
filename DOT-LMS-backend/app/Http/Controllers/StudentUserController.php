<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class StudentUserController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['store', 'index']]);
    }


    /**
     * @OA\Get(
     *      path="/Student",
     *      tags={"Student"},
     *      summary="Get list of Students in the DOT-LMS",
     *      description="Returns list of Students",
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
        return response()->json(["students" => StudentUser::all(), "student_count" => StudentUser::count()]);
    }




    /**
     * @OA\Post(
     *      path="/Student",
     *      tags={"Student"},
     *      summary="Store new Student's data into the database",
     *      description="Returns the entered Student's data",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/StudentUser")
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
        $validation = Validator::make($request->all(), [
            "first_name" => "required",
            "last_name" => "required",
            "email" => ['required', 'email'],
            'department' => 'required'
        ]);

        if ($validation->fails()) {
            return response()->json(["success" => false, "validation_error" => $validation->errors()]);
        }

        function userExistsID($id)
        {
            return StudentUser::where('student_id', $id)->exists();
        }

        function userExistsEmail($email)
        {
            return StudentUser::where('email', $email)->exists();
        }

        $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');



        while (userExistsID($student_id)) {
            $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');
        }


        if (!userExistsEmail($request->email)) {

            $Student_user = new StudentUser();
            $Student_user->student_id = $student_id;
            $Student_user->First_Name = $request->first_name;
            $Student_user->Last_Name = $request->last_name;
            $Student_user->Department = $request->department;
            $Student_user->Email = $request->email;
            $Student_user->Year = $request->year;
            $Student_user->Semester = $request->semester;
            $Student_user->password = null;
            $Student_user->save();

            $token = Auth::fromUser($Student_user);

            $one_time_passcode = mt_rand(100000, 999999);

            Cache::put($Student_user->student_id, $one_time_passcode);

            Mail::to($Student_user->Email)->send(new DOTLMSMail($Student_user->First_Name, $Student_user->student_id, $one_time_passcode));


            return response()->json(["success" => true, 'token' => $token]);
        } else {
            return response()->json([

                'error' => 'User Already Exists',

            ]);
        }
    }



    /**
     * @OA\Get(
     *      path="/Student/{id}",
     *      
     *      tags={"Student"},
     *      summary="Get a specific Student",
     *      description="Returns the specified Student's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Student's id",
     *          required=true,
     * example = "DBUR-6832-23",
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
        $Student_user = StudentUser::where('student_id', $id)->firstOrFail();

        $token = Auth::fromUser($Student_user);

        $user = StudentUser::where('Student_id', $id)->firstorFail();

        return response()->json(['user' => $user, 'token' => $token]);
    }

    /**
     * @OA\Put(
     *      path="/Student/{id}",
     *      tags={"Student"},
     *      summary="Update existing Student",
     *      description="Returns updated Student's data",
     *      @OA\Parameter(
     *          name="id",
     *          description="Student's id",
     *          required=true,
     *          example = "DBUR-6832-23",
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(ref="#/components/schemas/StudentUser")
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
        $user = StudentUser::where('Student_id', $id)->first();
        $user->update($request->all());
        return $user;
    }

    /**
     * @OA\Delete(
     *      path="/Student/{id}",
     *      
     *      tags={"Student"},
     *      summary="Delete existing Student",
     *      description="Deletes a record and returns no content",
     *      @OA\Parameter(
     *          name="id",
     *          description="Student's id",
     *          required=true,
     *          in="path",
     * example = "DBUR-6832-23",
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
        $user = StudentUser::where('student_id', $id)->firstorFail();
        if ($user != null) {
            $user->delete();
            return response()->json(['Message' => 'User Deleted']);
        } else {
            return response()->json(['Message' => 'User does not exist']);
        }
    }
}
