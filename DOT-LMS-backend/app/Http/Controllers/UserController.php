<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{


    public function loginForm()
    {
        return view('users.login');
    }
    public function authenticate(Request $request)
    {
        $FormFeilds = $request->validate([
            'Student_id' => 'required',
            'password' => 'required',
        ]);

        if (auth()->attempt($FormFeilds)) {
            $request->session()->regenerate();
            return redirect('/')->with('message', 'You are Logged in ');
        }
        return back()->withErrors(['Student_id' => 'Invalid Credentials'])->onlyInput('Student_id');
    }
}
