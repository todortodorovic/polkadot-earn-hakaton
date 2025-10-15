// API Response Types

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  walletAddress: string | null
  createdAt: string
  updatedAt?: string
}

export interface Grant {
  id: string
  title: string
  description: string
  amount: number
  category: string
  requirements: string
  deadline: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  _count?: {
    applications: number
  }
}

export interface Milestone {
  title: string
  description: string
  duration: string
  amount: number
}

export interface Application {
  id: string
  userId: string
  grantId: string
  projectTitle: string
  projectDescription: string
  teamInfo: string | null
  milestones: string // JSON string
  requestedAmount: number
  walletAddress: string
  status: 'pending' | 'approved' | 'rejected'
  adminNotes: string | null
  createdAt: string
  updatedAt: string
  grant?: Grant
  user?: Pick<User, 'id' | 'email' | 'name' | 'walletAddress'>
}

// API Request Types

export interface RegisterRequest {
  email: string
  password: string
  name: string
  walletAddress?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface CreateApplicationRequest {
  grantId: string
  projectTitle: string
  projectDescription: string
  teamInfo?: string
  milestones?: Milestone[]
  requestedAmount: number
  walletAddress: string
}

export interface ApproveRejectRequest {
  adminNotes?: string
}

// API Response Types

export interface AuthResponse {
  user: User
  token: string
}

export interface GrantsResponse {
  grants: Grant[]
}

export interface GrantResponse {
  grant: Grant
}

export interface ApplicationsResponse {
  applications: Application[]
}

export interface ApplicationResponse {
  application: Application
}

export interface AdminApplicationsResponse {
  applications: Application[]
  stats: {
    total: number
    byStatus: {
      pending?: number
      approved?: number
      rejected?: number
    }
  }
}

export interface ErrorResponse {
  error: string
}
