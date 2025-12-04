'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'

interface WelcomeScreenProps {
  tableNumber: number
  onStartOrder: () => void
}

export default function WelcomeScreen({
  tableNumber,
  onStartOrder,
}: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
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

        {/* Welcome Text */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Filtra Café
        </h1>

        <p className="text-xl md:text-2xl text-amber-100 mb-8 drop-shadow-md">
          Welcome to Your Table
        </p>

        {/* Table Number Display */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white border-opacity-20 shadow-2xl">
          <p className="text-amber-100 text-lg mb-2">Your Table Number</p>
          <p className="text-6xl font-bold text-white drop-shadow-lg">{tableNumber}</p>
        </div>

        {/* Description */}
        <p className="text-amber-50 text-base md:text-lg mb-12 leading-relaxed">
          Browse our delicious menu, customize your drink, and place your order. We'll notify you when it's ready!
        </p>

        {/* Start Button */}
        <button
          onClick={onStartOrder}
          className="group relative w-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-amber-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Start Ordering
          <Sparkles className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
        </button>

      </div>

      {/* Animated styles */}
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
