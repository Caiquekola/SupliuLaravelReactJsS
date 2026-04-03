<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Song;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        $songs = [
            [
                'title' => 'Rei do Gado',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example1',
                'play_count' => 1500000,
                'position' => 1
            ],
            [
                'title' => 'Cabo de Machado',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example2',
                'play_count' => 1200000,
                'position' => 2
            ],
            [
                'title' => 'Pagode em Brasília',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example3',
                'play_count' => 980000,
                'position' => 3
            ],
            [
                'title' => 'Filho Pródigo',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example4',
                'play_count' => 850000,
                'position' => 4
            ],
            [
                'title' => 'Chico Mineiro',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example5',
                'play_count' => 720000,
                'position' => 5
            ],
            [
                'title' => 'Morte do Ligeiro',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example6',
                'play_count' => 450000,
                'position' => 6
            ],
            [
                'title' => 'Disparada',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example7',
                'play_count' => 380000,
                'position' => 7
            ],
            [
                'title' => 'Tristeza do Jeca',
                'artist' => 'Tião Carreiro e Pardinho',
                'youtube_url' => 'https://www.youtube.com/watch?v=example8',
                'play_count' => 320000,
                'position' => 8
            ]
        ];

        foreach ($songs as $song) {
            Song::create($song);
        }
    }
}
