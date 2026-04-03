import React, { useState, useEffect } from 'react';
import type { SongSuggestion, Song, CreateSongData } from '../types';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Music, 
  Plus, 
  Edit, 
  Trash2,
  Play,
  User as UserIcon,
  Save,
  X
} from 'lucide-react';
import AnimatedStats from '../components/AnimatedStats';

const AdminDashboard: React.FC = () => {
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'suggestions' | 'songs'>('suggestions');
  const [showSongForm, setShowSongForm] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [songForm, setSongForm] = useState<CreateSongData>({
    title: '',
    artist: '',
    youtube_url: '',
    play_count: 0,
    position: 0
  });

  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [suggestionsData, songsData] = await Promise.all([
        apiService.getSongSuggestions(),
        apiService.getSongs()
      ]);
      
      setSuggestions(suggestionsData.data);
      setSongs(songsData.data);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionAction = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await apiService.updateSongSuggestion(id, status);
      loadData(); // Reload data
      showSuccess(
        status === 'approved' ? 'Sugestão Aprovada!' : 'Sugestão Rejeitada',
        `A sugestão foi ${status === 'approved' ? 'aprovada' : 'rejeitada'} com sucesso.`
      );
    } catch (error: any) {
      console.error('Error updating suggestion:', error);
      showError('Erro ao atualizar', error.response?.data?.message || 'Não foi possível atualizar a sugestão.');
    }
  };

  const handleDeleteSuggestion = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta sugestão?')) {
      try {
        await apiService.deleteSongSuggestion(id);
        loadData();
        showSuccess('Sugestão Excluída', 'A sugestão foi excluída com sucesso.');
      } catch (error: any) {
        console.error('Error deleting suggestion:', error);
        showError('Erro ao excluir', error.response?.data?.message || 'Não foi possível excluir a sugestão.');
      }
    }
  };

  const handleSongSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSong) {
        await apiService.updateSong(editingSong.id, songForm);
        showSuccess('Música Atualizada!', 'A música foi atualizada com sucesso.');
      } else {
        await apiService.createSong(songForm);
        showSuccess('Música Criada!', 'A nova música foi adicionada com sucesso.');
      }
      
      setSongForm({ title: '', artist: '', youtube_url: '', play_count: 0, position: 0 });
      setEditingSong(null);
      setShowSongForm(false);
      loadData();
    } catch (error: any) {
      console.error('Error saving song:', error);
      showError('Erro ao salvar', error.response?.data?.message || 'Não foi possível salvar a música.');
    }
  };

  const handleEditSong = (song: Song) => {
    setEditingSong(song);
    setSongForm({
      title: song.title,
      artist: song.artist,
      youtube_url: song.youtube_url,
      play_count: song.play_count,
      position: song.position || 0
    });
    setShowSongForm(true);
  };

  const handleDeleteSong = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta música?')) {
      try {
        await apiService.deleteSong(id);
        loadData();
        showSuccess('Música Excluída', 'A música foi excluída com sucesso.');
      } catch (error: any) {
        console.error('Error deleting song:', error);
        showError('Erro ao excluir', error.response?.data?.message || 'Não foi possível excluir a música.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pattern">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="h-8 w-8 text-purple-600 animate-pulse" />
            </div>
          </div>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">Carregando painel...</h2>
          <p className="mt-2 text-gray-600">Preparando o ambiente administrativo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">⚡ Painel Administrativo</h1>
              <p className="text-purple-100">Bem-vindo de volta, {user?.name}! 👋</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{songs.length}</div>
              <div className="text-sm text-purple-100">Músicas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{suggestions.filter(s => s.status === 'pending').length}</div>
              <div className="text-sm text-purple-100">Pendentes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div className="mb-8">
        <AnimatedStats 
          songsCount={songs.length}
          usersCount={42}
          playsCount={songs.reduce((acc, song) => acc + song.play_count, 0)}
          suggestionsCount={suggestions.length}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <nav className="flex space-x-2">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === 'suggestions'
                ? 'bg-gradient-warning text-white shadow-md'
                : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Sugestões ({suggestions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
              activeTab === 'songs'
                ? 'bg-gradient-primary text-white shadow-md'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Music className="h-4 w-4" />
            <span>Músicas ({songs.length})</span>
          </button>
        </nav>
      </div>

      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-6 py-4 border-b border-orange-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>📝 Sugestões Pendentes</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🎼 Música
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      👤 Usuário
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      📅 Data
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🏷️ Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      ⚡ Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {suggestions.map((suggestion) => (
                    <tr key={suggestion.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{suggestion.title}</div>
                          <div className="text-sm text-gray-600">{suggestion.artist}</div>
                          <a
                            href={suggestion.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-orange-600 hover:text-orange-800 text-xs mt-2 font-medium"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            YouTube
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">{suggestion.user.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(suggestion.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(suggestion.status)}`}>
                          {getStatusIcon(suggestion.status)}
                          <span className="ml-1">
                            {suggestion.status === 'approved' ? '✅ Aprovado' : 
                               suggestion.status === 'rejected' ? '❌ Rejeitado' : '⏳ Pendente'}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {suggestion.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleSuggestionAction(suggestion.id, 'approved')}
                                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Aprovar"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleSuggestionAction(suggestion.id, 'rejected')}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Rejeitar"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteSuggestion(suggestion.id)}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {suggestions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma sugestão encontrada</h3>
                <p className="text-gray-600">Aguardando novas sugestões dos usuários!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Songs Tab */}
      {activeTab === 'songs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <Music className="h-6 w-6 text-purple-600" />
              <span>Gerenciar Músicas</span>
            </h2>
            <button
              onClick={() => {
                setEditingSong(null);
                setSongForm({ title: '', artist: '', youtube_url: '', play_count: 0, position: 0 });
                setShowSongForm(true);
              }}
              className="inline-flex items-center px-6 py-3 bg-gradient-success text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md font-semibold"
            >
              <Plus className="h-5 w-5 mr-2" />
              🎵 Nova Música
            </button>
          </div>

          {/* Song Form */}
          {showSongForm && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 border border-purple-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Music className="h-5 w-5 text-purple-600" />
                  <span>{editingSong ? '✏️ Editar Música' : '🎵 Nova Música'}</span>
                </h3>
                <button
                  onClick={() => {
                    setShowSongForm(false);
                    setEditingSong(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSongSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      🎼 Título da Música
                    </label>
                    <input
                      type="text"
                      required
                      value={songForm.title}
                      onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Digite o título da música"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      🎤 Artista
                    </label>
                    <input
                      type="text"
                      required
                      value={songForm.artist}
                      onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Nome do artista"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      🎥 URL do YouTube
                    </label>
                    <input
                      type="url"
                      required
                      value={songForm.youtube_url}
                      onChange={(e) => setSongForm({ ...songForm, youtube_url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      🏆 Posição no Ranking
                    </label>
                    <input
                      type="number"
                      value={songForm.position}
                      onChange={(e) => setSongForm({ ...songForm, position: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Posição (opcional)"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold flex items-center justify-center"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {editingSong ? '💾 Atualizar Música' : '✨ Criar Música'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSongForm(false);
                      setEditingSong(null);
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Songs List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Music className="h-5 w-5 text-purple-600" />
                <span>📀 Catálogo de Músicas</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🎼 Música
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🏆 Posição
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      🎧 Reproduções
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      ⚡ Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {songs.map((song) => (
                    <tr key={song.id} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{song.title}</div>
                          <div className="text-sm text-gray-600">{song.artist}</div>
                          <a
                            href={song.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-purple-600 hover:text-purple-800 text-xs mt-2 font-medium"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            YouTube
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {song.position ? (
                          <div className={`inline-flex items-center w-8 h-8 rounded-full text-white text-xs font-bold ${
                            song.position <= 3 ? 'bg-gradient-warning' : 'bg-gradient-primary'
                          }`}>
                            {song.position}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Play className="h-4 w-4 mr-2 text-purple-400" />
                          <span className="font-semibold">{song.play_count.toLocaleString('pt-BR')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditSong(song)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSong(song.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {songs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma música encontrada</h3>
                <p className="text-gray-600">Comece adicionando músicas ao catálogo!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
