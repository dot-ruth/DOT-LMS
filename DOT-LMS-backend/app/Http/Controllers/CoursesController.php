<?php

namespace App\Http\Controllers;

use App\Models\courses;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return courses::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_title' => 'required',
            'course_id' => 'required',
            'course_img' => 'required',
            'course_topic' => 'required',
            'course_description' => 'required'
        ]);
        $path = Storage::putFile('course_image', $request->course_img);
        $image = Storage::get($path);
        return response($image, 200)->header('Content-Type', Storage::getMimeType($path));

        // return courses::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return courses::where('course_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $course = courses::where('course_id', $id)->firstOrFail();
        $course->update($request->all());
        return $course;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return courses::destroy($id);
    }
}
