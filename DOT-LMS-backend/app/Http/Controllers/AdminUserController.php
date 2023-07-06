<?php

namespace App\Http\Controllers;

use App\Models\AdminUser;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;

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
            'admin_id' => 'required',
            'email' => ['required', 'email'],
            'password' => 'required',
        ]);
        $Admin_user = AdminUser::create($request->all());
        $token = JWTAuth::fromUser($Admin_user);
        AdminUser::create($request->all());
        return response()->json(["success" => true, 'token' => $token]);
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
