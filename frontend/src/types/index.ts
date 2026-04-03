export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  youtube_url: string;
  play_count: number;
  position: number | null;
  created_at: string;
  updated_at: string;
}

export interface SongSuggestion {
  id: number;
  title: string;
  artist: string;
  youtube_url: string;
  user_id: number;
  status: 'pending' | 'approved' | 'rejected';
  user: User;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface CreateSongData {
  title: string;
  artist: string;
  youtube_url: string;
  play_count?: number;
  position?: number;
}

export interface CreateSuggestionData {
  title: string;
  artist: string;
  youtube_url: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
