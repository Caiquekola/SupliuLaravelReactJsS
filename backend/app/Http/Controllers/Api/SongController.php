<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SongController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $songs = Song::query()
            ->when($request->has('top_five'), function ($query) {
                return $query->topFive();
            })
            ->when(!$request->has('top_five'), function ($query) use ($request) {
                return $query->ordered()->paginate(10);
            });

        if ($request->has('top_five')) {
            return response()->json($songs->get());
        }

        return response()->json($songs);
    }

    public function topFive(): JsonResponse
    {
        $songs = Song::topFive()->get();
        return response()->json($songs);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'youtube_url' => 'required|url',
            'play_count' => 'integer|min:0',
            'position' => 'integer|min:1'
        ]);

        $song = Song::create($validated);
        return response()->json($song, 201);
    }

    public function show(Song $song): JsonResponse
    {
        return response()->json($song);
    }

    public function update(Request $request, Song $song): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'artist' => 'sometimes|string|max:255',
            'youtube_url' => 'sometimes|url',
            'play_count' => 'sometimes|integer|min:0',
            'position' => 'sometimes|integer|min:1'
        ]);

        $song->update($validated);
        return response()->json($song);
    }

    public function destroy(Song $song): JsonResponse
    {
        $song->delete();
        return response()->json(null, 204);
    }
}
