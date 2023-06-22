<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User_Role;

class UserRoleController extends Controller
{
    //
    public function userLogin(Request $request)
    {
        $validation = Validator::make($request->all(), [
            "user_id" => "required",
            "password" => "required"
        ]);

        if ($validation->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validation->errors()]);
        }

        //checking if the user_id exists
        $user_status = User_Role::where("user_id", $request->user_id)->firstOrFail();

        //check the password for that email
        if (!is_null($user_status)) {
            // $hashed_password = Hash::make($request->password);
            $hashed_password = $user_status->password;
            $password_status = Hash::check($request->password, $hashed_password);
            // $password_status = User_Role::where("user_id", $request->user_id)->where("password", $request->password)->firstOrFail();

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
                return response()->json(["success" => true, "message" => "You are Logged in", "data" => $user_data, "role" => $user->role]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, Incorrect password"]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, User does not exist "]);
        }
    }
}
