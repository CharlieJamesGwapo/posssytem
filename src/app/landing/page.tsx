'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Coffee, Users, Lock } from 'lucide-react'

export default function LandingPage() {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'staff' | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full blur-lg opacity-75"></div>
              <div className="relative bg-white rounded-full p-2 shadow-2xl w-32 h-32 flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Filtra Café Logo"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Filtra Café
          </h1>
          <p className="text-2xl text-amber-100 drop-shadow-md mb-2">
            Smart Ordering System
          </p>
          <p className="text-sm text-amber-200 drop-shadow-md font-semibold">
            2025 Made by Group 2 SIT • Scan & Order
          </p>
        </div>

        {/* Grid Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Customer Option */}
          <div>
            <Link href="/qr-scanner" className="block">
              <div
                onClick={() => setSelectedRole('customer')}
                className={`group p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedRole === 'customer'
                    ? 'bg-white border-orange-500 shadow-2xl'
                    : 'bg-white border-gray-300 hover:border-orange-400 hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <Users
                    size={48}
                    className={`${
                      selectedRole === 'customer'
                        ? 'text-orange-600'
                        : 'text-gray-700 group-hover:text-orange-600'
                    } transition-colors`}
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  Customer
                </h2>

                <p className="text-gray-700 text-center mb-4">
                  Scan QR code on your table to order coffee
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Scan table QR code</p>
                  <p>✓ Auto-detect your table</p>
                  <p>✓ Browse menu</p>
                  <p>✓ Place order</p>
                </div>

                <div className="w-full mt-6 bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 text-center shadow-md">
                  Scan QR Code
                </div>
              </div>
            </Link>
          </div>

          {/* Staff Option */}
          <Link href="/staff-login" className="block">
            <div
              onClick={() => setSelectedRole('staff')}
              className={`group p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                selectedRole === 'staff'
                  ? 'bg-white border-blue-600 shadow-2xl'
                  : 'bg-white border-gray-300 hover:border-blue-400 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-center mb-4">
                <Lock
                  size={48}
                  className={`${
                    selectedRole === 'staff'
                      ? 'text-blue-600'
                      : 'text-gray-700 group-hover:text-blue-600'
                  } transition-colors`}
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Staff
              </h2>

              <p className="text-gray-700 text-center mb-4">
                Login to manage orders and coffee preparation
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Login with credentials</p>
                <p>✓ View pending orders</p>
                <p>✓ Update order status</p>
                <p>✓ Manage menu</p>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md">
                Staff Login
              </button>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="text-center text-amber-200">
          <p className="text-sm font-bold">
            © 2025 Filtra Café Smart Ordering System
          </p>
          <p className="text-xs mt-2 opacity-75">
            Made by Group 2 SIT • Scan & Order • Advanced POS Technology
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
