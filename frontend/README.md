# Polkadot Grant System - Frontend

Next.js frontend application for the Polkadot Grant System.

## 🚀 Features

- Modern React 19 with Next.js 15
- Tailwind CSS for styling
- Radix UI component library
- TypeScript for type safety
- Responsive design
- Dark mode support

## 📋 Prerequisites

- Node.js 18+
- npm or pnpm
- Backend API running on http://localhost:4000

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment file (if needed)
cp .env.example .env

# Configure backend API URL in .env
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local
```

## 🚀 Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js pages and routes
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── grants/            # Grant pages
│   ├── bounties/          # Bounty pages
│   └── admin/             # Admin pages
├── components/            # Reusable React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── ...
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # Utility functions
│   └── ...
├── hooks/                 # Custom React hooks
├── styles/               # Global styles
└── public/               # Static assets
```

## 🎨 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **date-fns** - Date utilities
- **zod** - Schema validation
- **react-hook-form** - Form handling

## 🔗 Integration with Backend

To connect the frontend with the backend API, you'll need to:

1. **Create an API client** in `lib/api-client.ts` (example provided in backend docs)
2. **Update environment variables** to point to backend URL
3. **Implement authentication flow** using JWT tokens
4. **Create pages for**:
   - Login/Register
   - Grant listing
   - Application submission
   - My Applications
   - Admin dashboard

### Example API Integration

```typescript
// lib/api-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}
```

## 📱 Pages to Implement

### Public Pages
- [ ] `/` - Home page with grant overview
- [ ] `/grants` - List all available grants
- [ ] `/grants/[id]` - Grant details and apply button
- [ ] `/login` - User login
- [ ] `/register` - User registration

### Authenticated Pages
- [ ] `/dashboard` - User dashboard
- [ ] `/applications` - My applications
- [ ] `/applications/[id]` - Application details
- [ ] `/grants/[id]/apply` - Application form

### Admin Pages
- [ ] `/admin` - Admin dashboard
- [ ] `/admin/applications` - All applications list
- [ ] `/admin/applications/[id]` - Application review

## 🎯 Next Steps

1. **Implement Authentication**
   - Create auth context/provider
   - Add login/register pages
   - Store JWT token in localStorage
   - Add protected routes

2. **Create Grant Pages**
   - Grant listing with filters
   - Grant detail view
   - Application form

3. **Build User Dashboard**
   - My applications list
   - Application status tracking

4. **Implement Admin Panel**
   - Applications review table
   - Approve/Reject actions
   - Statistics dashboard

## 🔐 Authentication Flow

```typescript
// Example auth context
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📝 Notes

- Make sure backend API is running before starting frontend
- Default backend URL is http://localhost:4000
- Configure CORS in backend to allow frontend origin
- JWT tokens are stored in localStorage

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT

## 👥 Authors

Hackathon project for Polkadot Earn
