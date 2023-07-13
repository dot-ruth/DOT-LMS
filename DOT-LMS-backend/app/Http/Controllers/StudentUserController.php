<?php

namespace App\Http\Controllers;

use PragmaRX\Google2FAQRCode\Google2FA;
use App\Mail\DOTLMSMail;
use App\Models\StudentUser;
use App\Models\User_Role;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class StudentUserController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt');
    }

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
            $Student_user->first_name = $request->first_name;
            $Student_user->last_name = $request->last_name;
            $Student_user->department = $request->department;
            $Student_user->email = $request->email;
            $Student_user->year = $request->year;
            $Student_user->semester = $request->semester;
            $Student_user->password = null;
            $Student_user->save();

            $token = JWTAuth::fromUser($Student_user);

            $one_time_passcode = mt_rand(100000, 999999);

            Cache::put('otp', $one_time_passcode);


            Mail::to($Student_user->email)->send(new DOTLMSMail($Student_user->first_name, $Student_user->student_id, $one_time_passcode));


            return response()->json(["success" => true, 'token' => $token]);
        } else {
            return response()->json([

                'error' => 'User Already Exists',

            ]);
        }
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
