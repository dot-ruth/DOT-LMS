<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TeacherUser;
use Illuminate\Http\Request;

class TeacherUserController extends Controller
{
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
