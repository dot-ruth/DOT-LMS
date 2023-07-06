<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\TeacherUser;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class TeacherUserController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store', 'index', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TeacherUser::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([]);
        return TeacherUser::create($request->all());

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', 'email'],
            'department' => 'required',
            'password' => 'required',
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
            $teacher_user->first_name = $request->first_name;
            $teacher_user->last_name = $request->last_name;
            $teacher_user->email = $request->email;
            $teacher_user->department = $request->department;
            $teacher_user->password = $request->password;
            $teacher_user->save();

            $token = JWTAuth::fromUser($teacher_user);

            Mail::to($teacher_user->email)->send(new DOTLMSMail($teacher_user->first_name, $teacher_user->admin_id));

            return response()->json(["success" => true, 'token' => $token]);
        } else {
            return response()->json(['error' => 'User Already Exists']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return TeacherUser::where('Teacher_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = TeacherUser::where('Teacher_id', $id)->firstOrFail();
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return TeacherUser::destroy($id);
    }
}
