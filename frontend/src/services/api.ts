import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  User,
  Song,
  SongSuggestion,
  AuthResponse,
  LoginData,
  RegisterData,
  CreateSongData,
  CreateSuggestionData,
  PaginatedResponse
} from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Add authorization token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      console.log('Token from localStorage:', token ? 'exists' : 'missing');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers.Authorization);
      } else {
        console.warn('No auth token found in localStorage');
      }
      return config;
    });

    // Handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', data);
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', data);
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
    localStorage.removeItem('auth_token');
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/auth/user');
    return response.data;
  }

  // Songs endpoints
  async getTopFiveSongs(): Promise<Song[]> {
    const response: AxiosResponse<Song[]> = await this.api.get('/songs/top-five');
    return response.data;
  }

  async getSongs(page = 1): Promise<PaginatedResponse<Song>> {
    const response: AxiosResponse<PaginatedResponse<Song>> = await this.api.get('/songs', {
      params: { page }
    });
    return response.data;
  }

  async getSong(id: number): Promise<Song> {
    const response: AxiosResponse<Song> = await this.api.get(`/songs/${id}`);
    return response.data;
  }

  async createSong(data: CreateSongData): Promise<Song> {
    const response: AxiosResponse<Song> = await this.api.post('/songs', data);
    return response.data;
  }

  async updateSong(id: number, data: Partial<CreateSongData>): Promise<Song> {
    const response: AxiosResponse<Song> = await this.api.put(`/songs/${id}`, data);
    return response.data;
  }

  async deleteSong(id: number): Promise<void> {
    await this.api.delete(`/songs/${id}`);
  }

  // Song suggestions endpoints
  async getSongSuggestions(status?: string): Promise<PaginatedResponse<SongSuggestion>> {
    const params = status ? { status } : {};
    const response: AxiosResponse<PaginatedResponse<SongSuggestion>> = await this.api.get('/song-suggestions', { params });
    return response.data;
  }

  async getSongSuggestion(id: number): Promise<SongSuggestion> {
    const response: AxiosResponse<SongSuggestion> = await this.api.get(`/song-suggestions/${id}`);
    return response.data;
  }

  async createSongSuggestion(data: CreateSuggestionData): Promise<SongSuggestion> {
    const response: AxiosResponse<SongSuggestion> = await this.api.post('/song-suggestions', data);
    return response.data;
  }

  async updateSongSuggestion(id: number, status: 'pending' | 'approved' | 'rejected'): Promise<SongSuggestion> {
    const response: AxiosResponse<SongSuggestion> = await this.api.put(`/song-suggestions/${id}`, { status });
    return response.data;
  }

  async deleteSongSuggestion(id: number): Promise<void> {
    await this.api.delete(`/song-suggestions/${id}`);
  }
}

export const apiService = new ApiService();
