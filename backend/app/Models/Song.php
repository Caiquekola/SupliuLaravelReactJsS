<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'title',
        'artist',
        'youtube_url',
        'play_count',
        'position'
    ];

    protected $casts = [
        'play_count' => 'integer',
        'position' => 'integer'
    ];

    public function scopeTopFive($query)
    {
        return $query->orderBy('play_count', 'desc')->take(5);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('position', 'asc');
    }
}
