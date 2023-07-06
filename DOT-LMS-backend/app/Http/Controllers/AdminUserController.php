<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\AdminUser;
use App\Models\TeacherUser;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class AdminUserController extends Controller

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
        return AdminUser::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', 'email'],
            'password' => 'required',
        ]);

        function userExists($id, $email)
        {
            return AdminUser::where('admin_id', $id)->exists() || AdminUser::where('email', $email)->exists();
        }

        $admin_id = 'ADM-' . mt_rand(1000, 9999);

        if (userExists($admin_id, $request->email)) {
            $admin_id = 'ADM-' . mt_rand(1000, 9999);
        }

        if (!userExists($admin_id, $request->email)) {
            $Admin_user = new AdminUser();
            $Admin_user->first_name = $request->first_name;
            $Admin_user->last_name = $request->last_name;
            $Admin_user->admin_id = $admin_id;
            $Admin_user->email = $request->email;
            $Admin_user->password = $request->password;
            $Admin_user->save();

            $token = JWTAuth::fromUser($Admin_user);

            Mail::to($Admin_user->email)->send(new DOTLMSMail($Admin_user->first_name, $Admin_user->admin_id));

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
        return AdminUser::where('Admin_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = AdminUser::where('Admin_id', $id)->firstOrFail();
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        AdminUser::destroy($id);
    }
}
