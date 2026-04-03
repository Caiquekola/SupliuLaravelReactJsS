<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SongController;
use App\Http\Controllers\Api\SongSuggestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('songs')->group(function () {
    Route::get('/', [SongController::class, 'index']);
    Route::get('/top-five', [SongController::class, 'topFive']);
    Route::get('/{song}', [SongController::class, 'show']);
    Route::post('/', [SongController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{song}', [SongController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{song}', [SongController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('song-suggestions')->group(function () {
    Route::get('/', [SongSuggestionController::class, 'index']);
    Route::get('/{songSuggestion}', [SongSuggestionController::class, 'show']);
    Route::post('/', [SongSuggestionController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{songSuggestion}', [SongSuggestionController::class, 'update'])->middleware(['auth:sanctum', 'admin']);
    Route::delete('/{songSuggestion}', [SongSuggestionController::class, 'destroy'])->middleware(['auth:sanctum', 'admin']);
});
