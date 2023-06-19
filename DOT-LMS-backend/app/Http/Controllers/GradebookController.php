<?php

namespace App\Http\Controllers;

use App\Models\gradebook;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GradebookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return gradebook::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([]);
        return gradebook::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return gradebook::where('grade_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $grade = gradebook::where('grade_id', $id)->firstOrFail();
        $grade->update($request->all());
        return $grade;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $grade = gradebook::where('grade_id', $id)->firstOrFail();
        $grade->destroy();
    }
}
