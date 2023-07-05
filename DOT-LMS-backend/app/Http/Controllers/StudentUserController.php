<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\AdminUser;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use PhpParser\Node\Expr\AssignOp\Concat;
use Illuminate\Support\Facades\Validator;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use sirajcse\UniqueIdGenerator\UniqueIdGenerator;

class StudentUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        return StudentUser::all();
    }

    /**
     * Store a newly created resource in storage.
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
        // $student_id = UniqueIdGenerator::generate([
        //     'table' => 'student_users',
        //     'field' => 'student_id',
        //     'length' => 5,
        //     'prefix' => 'DBUR-',
        //     'suffix' => date('-y'),
        //     'reset_on_change' => 'both'
        // ]);
        function userExists($id, $email)
        {
            return StudentUser::where('student_id', $id)->exists() || StudentUser::where('email', $email)->exists();
        }

        $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');

        if (userExists($student_id, $request->email)) {
            $student_id = 'DBUR-' . mt_rand(1000, 9999) . date('-y');
        }

        if (!userExists($student_id, $request->email)) {

            $Student_user = new StudentUser();
            $Student_user->student_id = $student_id;
            $Student_user->first_name = $request->first_name;
            $Student_user->last_name = $request->last_name;
            $Student_user->department = $request->department;
            $Student_user->email = $request->email;
            $Student_user->year = $request->year;
            $Student_user->semester = $request->semester;
            $Student_user->student_password = null;
            $Student_user->save();

            Mail::to($Student_user->email)->send(new DOTLMSMail($Student_user->first_name, $Student_user->student_id));

            return response()->json(["success" => true]);
        } else {
            return response()->json(['error' => 'User Already Exists']);
        }
        return userExists($student_id, $request->email);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return StudentUser::where('Student_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = StudentUser::where('Student_id', $id)->firstOrFail();
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        StudentUser::destroy($id);
    }
}
