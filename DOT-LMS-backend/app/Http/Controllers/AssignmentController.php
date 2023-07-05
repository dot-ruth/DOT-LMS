<?php

namespace App\Http\Controllers;

use App\Models\assignment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return assignment::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([]);
        return assignment::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return assignment::where('assignment_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $assignment = assignment::where('assignment_id', $id)->firstOrFail();
        $assignment->update($request->all());
        return $assignment;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $assignment = assignment::where('assignment_id', $id)->firstOrFail();
        return $assignment->destroy();
    }
}
