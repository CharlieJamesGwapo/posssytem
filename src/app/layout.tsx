import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Filtra Café | Smart Ordering System - 2025 Group 2 SIT',
  description: 'Filtra Café Smart Ordering System. Scan & Order - Powered by Group 2 SIT. Modern QR-based ordering for restaurants and cafes.',
  keywords: ['Filtra Café', 'Smart Ordering', 'QR Scanning', 'Restaurant POS', 'Group 2 SIT'],
  authors: [{ name: 'Group 2 SIT' }],
  creator: 'Group 2 SIT',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://filtra-cafe.example.com',
    siteName: 'Filtra Café Smart Ordering System',
    title: 'Filtra Café | Smart Ordering System - 2025 Group 2 SIT',
    description: 'Scan & Order - Modern QR-based ordering for Filtra Café',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ea580c" />
        <link rel="icon" href="/logo.jpg" sizes="any" />
      </head>
      <body className="bg-gradient-to-br from-amber-50 to-orange-50 antialiased">
        {children}
        <footer className="fixed bottom-0 left-0 right-0 text-center text-xs text-gray-600 bg-white/50 backdrop-blur-sm py-1 border-t border-gray-200/50 z-10 pointer-events-none">
          © 2025 Filtra Café Smart Ordering System • Made by Group 2 SIT
        </footer>
      </body>
    </html>
  )
}
