import {
  RegisterRequest,
  LoginRequest,
  CreateApplicationRequest,
  ApproveRejectRequest,
  AuthResponse,
  GrantsResponse,
  GrantResponse,
  ApplicationsResponse,
  ApplicationResponse,
  AdminApplicationsResponse,
  ErrorResponse,
} from '../types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

class APIClient {
  private token: string | null = null

  constructor() {
    // Load token from localStorage on initialization (client-side only)
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error((data as ErrorResponse).error || 'API request failed')
    }

    return data as T
  }

  // Auth
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    this.setToken(response.token)
    return response
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    this.setToken(response.token)
    return response
  }

  async getMe(): Promise<{ user: AuthResponse['user'] }> {
    return this.request<{ user: AuthResponse['user'] }>('/api/auth/me')
  }

  logout() {
    this.clearToken()
  }

  // Grants
  async getGrants(params?: {
    category?: string
    active?: boolean
  }): Promise<GrantsResponse> {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.active !== undefined)
      searchParams.set('active', params.active.toString())

    const query = searchParams.toString()
    return this.request<GrantsResponse>(
      `/api/grants${query ? `?${query}` : ''}`
    )
  }

  async getGrant(id: string): Promise<GrantResponse> {
    return this.request<GrantResponse>(`/api/grants/${id}`)
  }

  // Applications
  async createApplication(
    data: CreateApplicationRequest
  ): Promise<ApplicationResponse> {
    return this.request<ApplicationResponse>('/api/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getMyApplications(): Promise<ApplicationsResponse> {
    return this.request<ApplicationsResponse>('/api/applications')
  }

  async getApplication(id: string): Promise<ApplicationResponse> {
    return this.request<ApplicationResponse>(`/api/applications/${id}`)
  }

  // Admin
  async getAdminApplications(params?: {
    status?: string
    grantId?: string
  }): Promise<AdminApplicationsResponse> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.grantId) searchParams.set('grantId', params.grantId)

    const query = searchParams.toString()
    return this.request<AdminApplicationsResponse>(
      `/api/admin/applications${query ? `?${query}` : ''}`
    )
  }

  async approveApplication(
    id: string,
    data?: ApproveRejectRequest
  ): Promise<ApplicationResponse & { message: string }> {
    return this.request<ApplicationResponse & { message: string }>(
      `/api/admin/applications/${id}/approve`,
      {
        method: 'POST',
        body: JSON.stringify(data || {}),
      }
    )
  }

  async rejectApplication(
    id: string,
    data?: ApproveRejectRequest
  ): Promise<ApplicationResponse & { message: string }> {
    return this.request<ApplicationResponse & { message: string }>(
      `/api/admin/applications/${id}/reject`,
      {
        method: 'POST',
        body: JSON.stringify(data || {}),
      }
    )
  }
}

// Export singleton instance
export const apiClient = new APIClient()
