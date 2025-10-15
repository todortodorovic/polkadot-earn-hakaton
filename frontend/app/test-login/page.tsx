'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/context/auth-context'
import { apiClient } from '@/lib/api/client'

export default function TestLoginPage() {
  const { user, login, logout, isAuthenticated, isAdmin } = useAuth()
  const [email, setEmail] = useState('admin@polkadot-grants.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [grants, setGrants] = useState<any[]>([])
  const [testResult, setTestResult] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login({ email, password })
      setTestResult('✅ Login successful!')
    } catch (err: any) {
      setError(err.message || 'Login failed')
      setTestResult('❌ Login failed: ' + (err.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const testGetGrants = async () => {
    try {
      setTestResult('Fetching grants...')
      const response = await apiClient.getGrants()
      setGrants(response.grants)
      setTestResult(`✅ Fetched ${response.grants.length} grants successfully!`)
    } catch (err: any) {
      setTestResult('❌ Failed to fetch grants: ' + (err.message || 'Unknown error'))
    }
  }

  const testGetMe = async () => {
    try {
      setTestResult('Fetching current user...')
      const response = await apiClient.getMe()
      setTestResult(`✅ Current user: ${response.user.name} (${response.user.email})`)
    } catch (err: any) {
      setTestResult('❌ Failed to fetch user: ' + (err.message || 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔗 Frontend ↔️ Backend Connection Test</h1>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="space-y-2">
            <p><strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}</p>
            <p><strong>Auth Status:</strong> {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}</p>
            {user && (
              <div className="mt-4 p-4 bg-green-50 rounded">
                <p><strong>Logged in as:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role} {isAdmin && '(Admin)'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Login Form */}
        {!isAuthenticated && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Login Test</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
              <p><strong>Test Accounts:</strong></p>
              <p>Admin: admin@polkadot-grants.com / admin123</p>
              <p>User: user@example.com / user123</p>
            </div>
          </div>
        )}

        {/* API Test Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Tests</h2>
          <div className="space-y-3">
            <button
              onClick={testGetGrants}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Test: GET /api/grants
            </button>

            {isAuthenticated && (
              <>
                <button
                  onClick={testGetMe}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
                >
                  Test: GET /api/auth/me
                </button>
                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {testResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="font-mono text-sm">{testResult}</p>
            </div>
          )}
        </div>

        {/* Grants Display */}
        {grants.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Grants ({grants.length})</h2>
            <div className="space-y-3">
              {grants.map((grant) => (
                <div key={grant.id} className="border rounded p-4">
                  <h3 className="font-semibold">{grant.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{grant.category}</p>
                  <p className="text-sm text-green-600 mt-1">
                    ${grant.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
