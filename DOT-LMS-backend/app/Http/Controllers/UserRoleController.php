<?php

namespace App\Http\Controllers;

use App\Models\User_Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use App\Mail\forgotPasswordMail;
use App\Models\StudentUser;
use App\Models\TeacherUser;

class UserRoleController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['ConfigurePassword']]);
    // }

    /**
     * @OA\Post(
     *      path="/Login",
     *      tags={"User Management Endpoints"},
     *      summary="Login a user into the system",
     *      description="Login a user into the system",
     * 
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *       required={"user_id","password"},
     *       @OA\Property(property="user_id", type="string", example="ADM-7864"),
     *       @OA\Property(property="password", type="string", format="text", example="1abc123"),
     *    ),
     *      ),
     * 
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     * @OA\Response(
     *          response=500,
     *          description="Server error",
     *      ),
     *     )
     */

    public function userLogin(Request $request)
    {
        //$FormFeilds = [$request->user_id, $request->password];
        $validation = Validator::make($request->all(), [
            "user_id" => "required",
            "password" => "required"
        ]);

        // if (! $token = auth()->attempt($validation->validated())) {
        //     return response()->json(['error' => 'Unauthorized'], 401);
        // }

        if ($validation->fails()) {
            return response()->json(["success" => "failed", "validation_error" => $validation->errors()]);
        }

        //checking if the user_id exists
        $user_status = User_Role::where("user_id", $request->user_id)->first();

        //check the password for that user_id
        if ($user_status != null) {
            $hashed_password = $user_status->password;
            $password_status = Hash::check($request->password, $hashed_password);

            //if passord is correct
            if ($password_status) {
                $user = User_Role::where("user_id", $request->user_id)->firstOrFail();
                $table_name_array = DB::select("SELECT table_name FROM user__roles where user_id = '$request->user_id'");
                $column_name_array = DB::select("SELECT column_name FROM user__roles where user_id = '$request->user_id'");
                $table_name_raw = $table_name_array[0]->table_name;
                $table_name = str_replace('"', '', $table_name_raw);
                $column_name_raw = $column_name_array[0]->column_name;
                $column_name = str_replace('"', '', $column_name_raw);
                $user_data = DB::select("SELECT * from $table_name where $column_name = '$request->user_id'");
                $token = JWTAuth::fromUser($user);
                return response()->json([
                    "success" => true, "token" => $token, "message" => "You are Logged in",
                    "data" => $user_data, "role" => $user->role
                ]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, Incorrect password"]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, User does not exist "]);
        }
    }

    /**
     * @OA\Get(
     *      path="/Users",
     *      tags={"User Management Endpoints"},
     *      description="Returns all the users in the system except for admins",
     *     
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *       ),
     * )
     */

    public function AllUsers()
    {
        $user_array = [];
        $student_id_array = DB::select("SELECT user_id FROM user__roles where role = 'student'");
        $teacher_id_array = DB::select("SELECT user_id FROM user__roles where role = 'teacher'");
        for ($i = 0; $i < sizeof($teacher_id_array); $i++) {
            //  $user_id = str_replace('"', '', $teacher_id_array[$i]->user_id);
            $teacher_data = TeacherUser::where('teacher_id', $teacher_id_array[$i]->user_id)->first();
            if ($teacher_data) {
                array_push($user_array, [$teacher_data['first_name'] . " " . $teacher_data['last_name'], $teacher_data['teacher_id']]);
            }
        }

        for ($i = 0; $i < sizeof($student_id_array); $i++) {
            //  $user_id = str_replace('"', '', $teacher_id_array[$i]->user_id);
            $student_data = StudentUser::where('student_id', $student_id_array[$i]->user_id)->first();
            if ($student_data) {
                array_push($user_array, [$student_data['first_name'] . " " . $student_data['last_name'], $student_data['student_id']]);
            }
        }
        return response()->json([
            $user_array
        ]);
    }

    /**
     * @OA\Post(
     *      path="/ConfigurePassword",
     *      tags={"User Management Endpoints"},
     *      summary="configure a user password",
     *      description="an API Endpoint that enables a user to configure a password, otp=> one time passcode",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *       required={"user_id","otp","password"},
     *       @OA\Property(property="user_id", type="string", example="ADM-7864"),
     *       @OA\Property(property="otp", type="integer", example="234123"),
     *       @OA\Property(property="password", type="string", format="text", example="1abc123"),
     *    ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     * @OA\Response(
     *          response=500,
     *          description="Server error",
     *      ),
     *     )
     */

    public function ConfigurePassword(Request $request)
    {
        $otp = Cache::pull($request->user_id);
        $hashed_password = Hash::make($request->password);
        $user = User_Role::where("user_id", $request->user_id)->first();

        if ($user != null) {
            if ($request->otp == $otp) {
                $table_name_array = DB::select("SELECT table_name FROM user__roles where user_id = '$request->user_id'");
                $column_name_array = DB::select("SELECT column_name FROM user__roles where user_id = '$request->user_id'");
                $table_name_raw = $table_name_array[0]->table_name;
                $table_name = str_replace('"', '', $table_name_raw);
                $column_name_raw = $column_name_array[0]->column_name;
                $column_name = str_replace('"', '', $column_name_raw);
                $user_data = DB::select("SELECT * from $table_name where $column_name = '$request->user_id'");
                User_Role::where("user_id", $request->user_id)->firstOrFail()
                    ->update([
                        'password' => $hashed_password
                    ]);
                return response()->json(['message' => "password has been updated", 'role' => $user->role, "data" => $user_data]);
            } else {
                return response()->json([
                    'message' => "Wrong one time passcode please check your email",
                ]);
            }
        } else {
            return response()->json(["message" => "User doesn't Exist"]);
        }
    }


    /**
     * @OA\Post(
     *      path="/forgotPassword",
     *      tags={"User Management Endpoints"},
     *      summary="user enters his/her ID to get a configure password email",
     *      description="an API Endpoint that enables a user to configure a password,if they forgot their password, otp=> one time passcode",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *       required={"user_id"},
     *       @OA\Property(property="user_id", type="string", example="ADM-7864"),
     *    ),
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *       ),
     * @OA\Response(
     *          response=500,
     *          description="Server error",
     *      ),
     *     )
     */

    public function ForgotPassword(Request $request)
    {
        $user = User_Role::where("user_id", $request->user_id)->firstOrFail();
        $table_name_array = DB::select("SELECT table_name FROM user__roles where user_id = '$request->user_id'");
        $column_name_array = DB::select("SELECT column_name FROM user__roles where user_id = '$request->user_id'");
        $table_name_raw = $table_name_array[0]->table_name;
        $table_name = str_replace('"', '', $table_name_raw);
        $column_name_raw = $column_name_array[0]->column_name;
        $column_name = str_replace('"', '', $column_name_raw);
        $user_data = DB::select("SELECT * from $table_name where $column_name = '$request->user_id'");
        $one_time_passcode = mt_rand(100000, 999999);
        Cache::put($request->user_id, $one_time_passcode);
        Mail::to($user_data[0]->email)->send(new forgotPasswordMail($user_data[0]->first_name, $one_time_passcode));
    }
}
