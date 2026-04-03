<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SongSuggestion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SongSuggestionController extends Controller
{
    // Middleware is applied in routes file

    public function index(Request $request): JsonResponse
    {
        try {
            \Log::info('SongSuggestion index called', $request->all());
            
            $suggestions = SongSuggestion::with('user')
                ->when($request->has('status'), function ($query) use ($request) {
                    return $query->where('status', $request->status);
                })
                ->latest()
                ->paginate(10);

            \Log::info('SongSuggestion index success', ['count' => $suggestions->count()]);
            return response()->json($suggestions);
        } catch (\Exception $e) {
            \Log::error('SongSuggestion index error: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            return response()->json([
                'error' => 'Database error: ' . $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            \Log::info('Creating song suggestion - START');
            \Log::info('Request data:', $request->all());
            \Log::info('Auth user ID:', ['user_id' => Auth::id()]);
            \Log::info('Auth check:', ['check' => Auth::check()]);
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'artist' => 'required|string|max:255',
                'youtube_url' => 'required|url'
            ]);

            \Log::info('Validation passed:', $validated);

            // Check if user is authenticated
            if (!Auth::check()) {
                \Log::error('User not authenticated');
                return response()->json(['error' => 'Unauthorized - User not authenticated'], 401);
            }

            $userId = Auth::id();
            \Log::info('Creating suggestion with user_id: ' . $userId);

            $suggestion = SongSuggestion::create([
                'title' => $validated['title'],
                'artist' => $validated['artist'],
                'youtube_url' => $validated['youtube_url'],
                'user_id' => $userId,
                'status' => 'pending'
            ]);

            \Log::info('Suggestion created successfully:', ['suggestion_id' => $suggestion->id]);

            return response()->json($suggestion->load('user'), 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation error: ' . json_encode($e->errors()));
            return response()->json(['error' => 'Validation failed', 'details' => $e->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Error creating suggestion: ' . $e->getMessage());
            \Log::error('Error file: ' . $e->getFile());
            \Log::error('Error line: ' . $e->getLine());
            \Log::error($e->getTraceAsString());
            return response()->json([
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    public function show(SongSuggestion $songSuggestion): JsonResponse
    {
        return response()->json($songSuggestion->load('user'));
    }

    public function update(Request $request, SongSuggestion $songSuggestion): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected'
        ]);

        $songSuggestion->update($validated);
        return response()->json($songSuggestion->load('user'));
    }

    public function destroy(SongSuggestion $songSuggestion): JsonResponse
    {
        $songSuggestion->delete();
        return response()->json(null, 204);
    }
}
