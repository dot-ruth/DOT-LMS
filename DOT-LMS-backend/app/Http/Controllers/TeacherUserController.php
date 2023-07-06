<?php

namespace App\Http\Controllers;

use App\Models\TeacherUser;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;

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
            'teacher_id' => 'required',
            'email' => ['required', 'email'],
            'department' => 'required',
            'password' => 'required',
        ]);
        $Teacher_user = new TeacherUser();
        $token = JWTAuth::fromUser($Teacher_user);
        TeacherUser::create($request->all());
        return response()->json(["success" => true, 'token' => $token]);
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
