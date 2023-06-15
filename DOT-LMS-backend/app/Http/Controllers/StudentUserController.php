<?php

namespace App\Http\Controllers;

use App\Models\StudentUser;
use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;

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
        $request->validate([]);
        return StudentUser::create($request->all());
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
