<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $request->validate([]);
        return User::create($request->all());
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy(string $id)
    {
        User::destroy($id);
    }

    // show function(CRUD)
    public function show(string $Student_id)
    {
        return User::where('Student_id', $Student_id)->firstOrFail();
    }

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
        $user_status = StudentUser::where("Student_id", $request->user_id)->firstOrFail();

        //check the password for that email
        if (!is_null($user_status)) {
            $password_status = StudentUser::where("Student_id", $request->user_id)->where("password", $request->password)->firstOrFail();

            //if passord is correct
            if (!is_null($password_status)) {
                $user = StudentUser::where("Student_id", $request->user_id)->firstOrFail();
                $table_name = DB::select("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS where COLUMN_NAME = 'admin_id'");
                return response()->json(["success" => true, "message" => "You are Logged in", "data" => $user, "table name" => $table_name]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, Incorrect password"]);
            }
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "unable to login, User does not exist "]);
        }
    }
}
