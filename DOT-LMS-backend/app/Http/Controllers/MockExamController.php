<?php

namespace App\Http\Controllers;

use App\Models\MockExam;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MockExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MockExam::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([]);
        return MockExam::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return MockExam::where('exam_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $exam = MockExam::where('exam_id', $id)->firstOrFail();
        $exam->update($request->all());
        return $exam;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return MockExam::destroy($id);
    }
}
