<?php

namespace App\Http\Controllers;

use App\Models\User_Role;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use PhpParser\Node\Expr\Cast\String_;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\StudentUserController;

class UserRoleController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['ConfigurePassword']]);
    // }
    //
    public function userLogin(Request $request)
    {
        $FormFeilds = [$request->user_id, $request->password];
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
                $request->session()->regenerate();
                $token = JWTAuth::fromUser($user);
                return response()->json(["success" => true, "token" => $token, "message" => "You are Logged in", "data" => $user_data, "role" => $user->role]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, Incorrect password"]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, User does not exist "]);
        }
    }


    public function ConfigurePassword(Request $request)
    {
        $otp = Cache::pull('otp');
        $hashed_password = Hash::make($request->password);
        if ($request->otp == $otp) {
            User_Role::where("user_id", $request->user_id)->firstOrFail()
                ->update([
                    'password' => $hashed_password
                ]);
            return response()->json(['status' => "password has been updated"]);
        } else {
            return response()->json([
                'message' => "Wrong one time passcode please check your email",
            ]);
        }
    }
}
