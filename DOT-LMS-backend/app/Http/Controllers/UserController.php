<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}
