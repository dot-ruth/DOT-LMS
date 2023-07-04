<?php

namespace App\Http\Controllers;

use App\Mail\DOTLMSMail;
use App\Models\AdminUser;
use App\Models\StudentUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use PhpParser\Node\Expr\AssignOp\Concat;
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
        $request->validate([]);
        $student_id = UniqueIdGenerator::generate([
            'table' => 'student_users',
            'field' => 'student_id',
            'length' => 5,
            'prefix' => 'DBUR-',
            'suffix' => date('-y'),
            'reset_on_change' => 'both'
        ]);

        $Student_user = new StudentUser();
        $Student_user->student_id = $student_id;
        $Student_user->first_name = $request->first_name;
        $Student_user->last_name = $request->last_name;
        $Student_user->department = $request->department;
        $Student_user->email = $request->email;
        $Student_user->year = $request->year;
        $Student_user->semester = $request->semester;
        $Student_user->password = $request->password;
        $Student_user->save();




        // return StudentUser::create($request->all());
    }

    public function SendStudentemail(Request $request)
    {
        $Student_user = new StudentUser();

        $first_name = $Student_user->first_name;
        $user_id = $Student_user->student_id;
        $password = $request->password;

        Mail::to($Student_user->email)->send(new DOTLMSMail($first_name, $user_id, $password));
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
