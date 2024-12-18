import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN_KEY = 'auth_token';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    // 1. localStorage에서 토큰 확인
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      return storedToken;
    }

    // 2. URL 쿼리 파라미터에서 토큰 확인
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    
    // URL에 토큰이 있으면 localStorage에 저장
    if (urlToken) {
      localStorage.setItem(TOKEN_KEY, urlToken);
      return urlToken;
    }

    return null;
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { params, ...requestConfig } = config;
    
    // URL 파라미터 처리
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    
    const url = `${this.baseUrl}${endpoint}${queryString}`;

    // 토큰이 있으면 Authorization 헤더에 추가
    const token = this.getToken();
    if (token) {
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, {
      ...requestConfig,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...requestConfig.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // 인증 오류시 토큰 제거
        if (typeof window !== 'undefined') {
          localStorage.removeItem(TOKEN_KEY);
        }
      }
      throw new Error('API request failed');
    }

    return response.json();
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
}

export const client = new ApiClient(API_URL || ''); 