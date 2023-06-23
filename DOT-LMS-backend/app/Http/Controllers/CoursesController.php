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
        $uploadFolder = 'course_image';
        $image = $request->file('course_img');
        $image_uploaded_path = $image->store($uploadFolder, 'public');

        /** @var \Illuminate\Filesystem\FilesystemManager $image_url */
        $image_url = Storage::disk('public');
        $url = $image_url->url($image_uploaded_path);

        $uploadedImageResponse = array(
            "image_name" => basename($image_uploaded_path),
            "image_url" => $url,
            "mime" => $image->getClientMimeType()
        );
        courses::create($request->all());
        return response()->json(['File Uploaded Successfully', 'success', 200, $uploadedImageResponse]);
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
