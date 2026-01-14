'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Eye, EyeOff, Home } from 'lucide-react'
import Image from 'next/image'
import { showErrorAlert, showSuccessAlert } from '@/utils'

export default function StaffLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('staffToken')
    const name = localStorage.getItem('staffName')
    
    // Clear corrupted data if token exists but name doesn't
    if (token && !name) {
      console.log('Corrupted auth data found, clearing...')
      localStorage.removeItem('staffToken')
      localStorage.removeItem('staffName')
      localStorage.removeItem('staffRole')
      localStorage.removeItem('staffId')
      return
    }
    
    // Only redirect if we have both token and name, and we're not already on staff page
    if (token && name && window.location.pathname === '/staff-login') {
      console.log('User already logged in, redirecting to staff dashboard...')
      router.replace('/staff')
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/staff/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        await showErrorAlert('Login Failed', data.error || 'Invalid credentials')
        setLoading(false)
        return
      }

      // Store token and user info in localStorage
      localStorage.setItem('staffToken', data.token)
      localStorage.setItem('staffName', data.name)
      localStorage.setItem('staffRole', data.role)
      localStorage.setItem('staffId', data.id)

      // Also set token in cookie for middleware protection
      document.cookie = `staffToken=${data.token}; path=/; max-age=86400; SameSite=Strict`

      // Show success alert and redirect
      await showSuccessAlert('Login Successful', `Welcome back, ${data.name}!`)
      
      // Redirect to dashboard immediately after alert closes
      router.push('/staff')
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
      await showErrorAlert('Error', 'An error occurred during login')
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading && username && password) {
      handleLogin(e as any)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-3 sm:p-4">
      {/* Back to Home Button */}
      <Link
        href="/landing"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg transition-all transform hover:scale-105 font-semibold text-sm shadow-md"
      >
        <Home size={18} />
        <span className="hidden sm:inline">Back Home</span>
        <span className="sm:hidden">Back</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 sm:p-8 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <Image
                  src="/logo.jpg"
                  alt="Filtra Café Logo"
                  width={80}
                  height={80}
                  className="rounded-full object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">Filtra Café</h1>
            <p className="text-sm sm:text-base text-amber-100">Staff Dashboard Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-3 sm:p-4 animate-pulse">
                <p className="text-xs sm:text-sm text-red-900">{error}</p>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                👤 Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="admin"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                disabled={loading}
                autoComplete="username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                🔑 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="admin123"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  disabled={loading}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={loading}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className={`w-full font-bold py-2.5 sm:py-3 rounded-lg transition-all transform flex items-center justify-center gap-2 text-sm sm:text-base ${
                loading || !username || !password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:scale-105 active:scale-95'
              }`}
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              {loading ? '⏳ Logging in...' : '✓ Login to Dashboard'}
            </button>

            {/* Demo Credentials */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3 sm:p-4">
              <p className="text-xs font-semibold text-blue-900 mb-2">📋 Demo Credentials:</p>
              <div className="space-y-1 text-xs text-blue-800">
                <p>👤 Admin: <span className="font-mono font-bold bg-blue-100 px-2 py-1 rounded">admin</span></p>
                <p>🔑 Password: <span className="font-mono font-bold bg-blue-100 px-2 py-1 rounded">admin123</span></p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6 text-gray-600 text-xs sm:text-sm">
          <p>🔒 Secure Staff Access Only</p>
          <p className="text-xs text-gray-500 mt-2">© 2025 Filtra Café Smart Ordering System</p>
          <p className="text-xs text-gray-400 mt-1">Made by Group 2 SIT • Scan & Order</p>
        </div>
      </div>
    </div>
  )
}
