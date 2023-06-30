<?php

namespace App\Http\Controllers;

use App\Models\StudentUser;
use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use PhpParser\Node\Expr\AssignOp\Concat;

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
        $student_id = IdGenerator::generate([
            'table' => 'student_users',
            'field' => 'student_id',
            'length' => 4, 'prefix' => 'DBUR-'
        ]);
        $Student_user = new StudentUser();
        $Student_user->student_id = $student_id;
        $Student_user->first_Name = $request->first_Name;
        $Student_user->last_Name = $request->last_Name;
        $Student_user->department = $request->department;
        $Student_user->year = $request->year;
        $Student_user->semester = $request->semester;
        $Student_user->password = $request->password;
        $Student_user->save();
        // return StudentUser::create($request->all());
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
