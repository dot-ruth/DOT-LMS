<?php

namespace App\Http\Controllers;

use App\Models\chapter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return chapter::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([]);
        return chapter::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return chapter::where('chapter_id', $id)->firstOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $chapter = chapter::where('chapter_id', $id)->firstOrFail();
        $chapter->update($request->all());
        return $chapter;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return chapter::destroy($id);
    }
}
