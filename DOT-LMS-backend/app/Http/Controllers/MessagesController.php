<?php

namespace App\Http\Controllers;

use App\Models\messages;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return messages::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([]);
        return messages::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return messages::where('message_id', $id)->findOrFail();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $message = messages::where('message_id', $id)->findOrFail();
        $message->update($request->all());
        return $message;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $message = messages::where('message_id', $id)->findOrFail();
        return $message->destroy();
    }
}
