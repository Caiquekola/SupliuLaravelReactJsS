import React, { useState, useEffect } from 'react';
import type { Song, SongSuggestion, CreateSuggestionData } from '../types';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Music, Play, Plus, Clock, User as UserIcon, TrendingUp, Star, Heart, Share2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const Home: React.FC = () => {
  const [topSongs, setTopSongs] = useState<Song[]>([]);
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestionData, setSuggestionData] = useState<CreateSuggestionData>({
    title: '',
    artist: '',
    youtube_url: ''
  });
  
  const { isAuthenticated, user } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [topSongsData, allSongsData, suggestionsData] = await Promise.all([
        apiService.getTopFiveSongs(),
        apiService.getSongs(),
        apiService.getSongSuggestions('pending')
      ]);
      
      setTopSongs(topSongsData);
      setAllSongs(allSongsData.data);
      setSuggestions(suggestionsData.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createSongSuggestion(suggestionData);
      setSuggestionData({ title: '', artist: '', youtube_url: '' });
      setShowSuggestionForm(false);
      loadData(); // Reload suggestions
      showSuccess('Sugestão enviada!', 'Sua sugestão foi enviada para análise e será avaliada em breve.');
    } catch (error: any) {
      console.error('Error creating suggestion:', error);
      showError('Erro ao enviar sugestão', error.response?.data?.message || 'Não foi possível enviar sua sugestão. Tente novamente.');
    }
  };

  const formatPlayCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Carregando músicas...</h2>
          <p className="mt-2 text-gray-600">Preparando as melhores músicas de Tião Carreiro</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10 space-y-12 py-8">
      {/* Hero Section - Design vibrante e colorido */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white">
              Top 5 Músicas
            </span>
            <br />
            <span className="text-3xl md:text-5xl font-bold">Tião Carreiro e Pardinho</span>
          </h1>
          
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-8">
            ✨ Descubra as músicas mais icônicas da dupla caipira que revolucionou a música sertaneja brasileira
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white border-opacity-20">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">🏆</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{topSongs.length}</div>
                <div className="text-sm text-purple-200">Músicas no Top</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white bg-opacity-10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white border-opacity-20">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">🎧</span>
              </div>
              <div>
                <div className="text-2xl font-bold">{formatPlayCount(topSongs.reduce((acc, song) => acc + song.play_count, 0))}</div>
                <div className="text-sm text-purple-200">Total de Plays</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Songs - Design colorido e vibrante */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
              <Music className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900">🏆 Top 5 Mais Tocadas</h2>
              <p className="text-gray-600 mt-1">As músicas mais populares da semana</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-800">Atualizado em tempo real</span>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {topSongs.map((song, index) => (
            <div 
              key={song.id} 
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-2"
              style={{
                borderColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#E5E7EB'
              }}
            >
              {/* Colorful top border */}
              <div 
                className="h-2 w-full"
                style={{
                  background: index === 0 ? 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)' :
                             index === 1 ? 'linear-gradient(90deg, #C0C0C0, #A0A0A0, #C0C0C0)' :
                             index === 2 ? 'linear-gradient(90deg, #CD7F32, #B87333, #CD7F32)' :
                             'linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)'
                }}
              ></div>
              
              {/* Ranking Badge - Medal Style */}
              <div className="absolute -top-1 -left-1 z-10">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-xl border-4 border-white transform -rotate-12"
                  style={{
                    background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                               index === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                               index === 2 ? 'linear-gradient(135deg, #CD7F32, #B87333)' :
                               'linear-gradient(135deg, #3B82F6, #1D4ED8)'
                  }}
                >
                  <span className="text-lg">{index + 1}</span>
                </div>
              </div>
              
              {/* Crown for #1 */}
              {index === 0 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="text-3xl filter drop-shadow-lg">👑</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className="flex flex-col space-y-2">
                  <button className="w-9 h-9 bg-gradient-to-br from-pink-400 to-red-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                  <button className="w-9 h-9 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <Share2 className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Play Count Badge */}
              <div className="absolute top-3 right-3 z-10 opacity-100 group-hover:opacity-0 transition-opacity">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ▶ {formatPlayCount(song.play_count)}
                </div>
              </div>
              
              <div className="p-6 pt-14">
                {/* Music Icon */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
                    style={{
                      background: index === 0 ? 'linear-gradient(135deg, #FFD70020, #FFA50020)' :
                                 index === 1 ? 'linear-gradient(135deg, #C0C0C020, #A0A0A020)' :
                                 index === 2 ? 'linear-gradient(135deg, #CD7F3220, #B8733320)' :
                                 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
                    }}
                  >
                    <Music 
                      className="h-8 w-8"
                      style={{
                        color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#3B82F6'
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2 leading-tight">{song.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{song.artist}</p>
                </div>
                
                {/* Stars for top 3 */}
                {index < 3 && (
                  <div className="flex justify-center mb-4 space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4 fill-current"
                        style={{
                          color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'
                        }}
                      />
                    ))}
                  </div>
                )}
                
                {/* Play Button */}
                <a
                  href={song.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <button 
                    className="w-full text-white rounded-xl py-3 px-4 flex items-center justify-center transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{
                      background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                                 index === 1 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                                 index === 2 ? 'linear-gradient(135deg, #CD7F32, #B87333)' :
                                 'linear-gradient(135deg, #EF4444, #DC2626)'
                    }}
                  >
                    <Play className="h-5 w-5 mr-2 fill-current" />
                    Ouvir Agora
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Songs - Tabela colorida */}
      <section>
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6">
            <Music className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900">📀 Catálogo Completo</h2>
            <p className="text-gray-600 mt-1">Explore todas as músicas disponíveis</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 px-8 py-5 border-b border-blue-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <span className="mr-2">🎼</span> Todas as Músicas ({allSongs.length})
              </h3>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">🥇 Top 3</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">🎵 Total: {allSongs.length}</span>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    🏆 Pos
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    🎵 Música
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    🎤 Artista
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    ▶ Plays
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    ⚡ Ação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allSongs.map((song, index) => (
                  <tr 
                    key={song.id} 
                    className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {song.position ? (
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg ${
                            song.position <= 3 
                              ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                              : 'bg-gradient-to-br from-blue-400 to-purple-500'
                          }`}
                        >
                          {song.position <= 3 ? ['🥇','🥈','🥉'][song.position-1] : song.position}
                        </div>
                      ) : (
                        <span className="text-gray-400 font-bold">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mr-3">
                          <Music className="h-5 w-5 text-purple-500" />
                        </div>
                        <div className="text-sm font-bold text-gray-900">{song.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800">
                        {song.artist}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mr-2">
                          <Play className="h-4 w-4 text-white fill-current" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{formatPlayCount(song.play_count)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={song.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-bold shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <Play className="h-4 w-4 mr-2 fill-current" />
                        ▶ Ouvir
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {allSongs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma música encontrada</h3>
              <p className="text-gray-600">O catálogo está vazio no momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Suggestions Section - Design colorido e vibrante */}
      {isAuthenticated && (
        <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                  <span className="text-2xl">🎵</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">💫 Sugestões da Comunidade</h2>
                  <p className="text-gray-600 mt-1">Participe sugerindo novas músicas para o ranking</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-bold">🌟 Ativo</span>
                <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs font-bold">👥 {suggestions.length} Sugestões</span>
              </div>
            </div>
            <button
              onClick={() => setShowSuggestionForm(!showSuggestionForm)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              🎤 Sugerir Música
            </button>
          </div>

          {showSuggestionForm && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-200 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-xl opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🎼</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">🎵 Nova Sugestão Musical</h3>
                </div>
                <form onSubmit={handleSuggestionSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                        <span className="mr-2">🎼</span> Título da Música
                      </label>
                      <input
                        type="text"
                        required
                        value={suggestionData.title}
                        onChange={(e) => setSuggestionData({ ...suggestionData, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gradient-to-r from-purple-50 to-pink-50"
                        placeholder="Digite o título da música"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                        <span className="mr-2">🎤</span> Artista
                      </label>
                      <input
                        type="text"
                        required
                        value={suggestionData.artist}
                        onChange={(e) => setSuggestionData({ ...suggestionData, artist: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gradient-to-r from-blue-50 to-cyan-50"
                        placeholder="Nome do artista"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <span className="mr-2">🎥</span> URL do YouTube
                    </label>
                    <input
                      type="url"
                      required
                      value={suggestionData.youtube_url}
                      onChange={(e) => setSuggestionData({ ...suggestionData, youtube_url: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gradient-to-r from-red-50 to-orange-50"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="mr-2">📤</span> Enviar Sugestão
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSuggestionForm(false)}
                      className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all duration-300 font-bold"
                    >
                      <span className="mr-2">❌</span> Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border-2 border-purple-100 relative overflow-hidden group">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">🎵</span>
                        </div>
                        <h3 className="font-black text-gray-900 text-xl mr-3">{suggestion.title}</h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
                          ⏳ Aguardando aprovação
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 font-medium flex items-center">
                        <span className="mr-2">🎤</span> {suggestion.artist}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-bold">
                          <UserIcon className="h-4 w-4 mr-1" />
                          👤 {suggestion.user.name}
                        </span>
                        <span className="flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-bold">
                          <Clock className="h-4 w-4 mr-1" />
                          📅 {new Date(suggestion.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <a
                        href={suggestion.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Play className="h-5 w-5 mr-2 fill-current" />
                        ▶ Ouvir
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {suggestions.length === 0 && (
              <div className="text-center py-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-100">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">🎵</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Nenhuma sugestão pendente</h3>
                <p className="text-gray-600 text-lg">Seja o primeiro a sugerir uma nova música! 🎤</p>
                <button
                  onClick={() => setShowSuggestionForm(true)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="mr-2">✨</span> Criar Primeira Sugestão
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      </div>
    </div>
  );
};

export default Home;
