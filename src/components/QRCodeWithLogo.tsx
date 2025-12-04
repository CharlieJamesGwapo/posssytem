'use client'

import { useEffect, useState } from 'react'

interface QRCodeWithLogoProps {
  qrImageUrl: string
  logoUrl: string
  alt: string
  width?: number
  height?: number
  logoSize?: number
}

export default function QRCodeWithLogo({
  qrImageUrl,
  logoUrl,
  alt,
  width = 128,
  height = 128,
  logoSize = 0.25,
}: QRCodeWithLogoProps) {
  const [qrWithLogo, setQrWithLogo] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const addLogoToQR = async () => {
      try {
        if (!qrImageUrl) {
          setLoading(false)
          return
        }

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          setQrWithLogo(qrImageUrl)
          setLoading(false)
          return
        }

        // Load QR code image with timeout
        const loadImage = (src: string): Promise<HTMLImageElement> => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            
            const timeout = setTimeout(() => {
              reject(new Error('Image load timeout'))
            }, 5000)

            img.onload = () => {
              clearTimeout(timeout)
              resolve(img)
            }

            img.onerror = () => {
              clearTimeout(timeout)
              reject(new Error('Image load failed'))
            }

            img.src = src
          })
        }

        try {
          const qrImage = await loadImage(qrImageUrl)
          
          // Set canvas size
          canvas.width = qrImage.width
          canvas.height = qrImage.height

          // Draw QR code
          ctx.drawImage(qrImage, 0, 0)

          // Try to add logo if available
          if (logoUrl) {
            try {
              const logo = await loadImage(logoUrl)
              
              // Calculate logo dimensions
              const logoWidth = canvas.width * logoSize
              const logoHeight = canvas.height * logoSize
              const logoX = (canvas.width - logoWidth) / 2
              const logoY = (canvas.height - logoHeight) / 2

              // Draw white background for logo
              ctx.fillStyle = 'white'
              ctx.fillRect(logoX - 4, logoY - 4, logoWidth + 8, logoHeight + 8)

              // Draw border
              ctx.strokeStyle = '#ddd'
              ctx.lineWidth = 1
              ctx.strokeRect(logoX - 4, logoY - 4, logoWidth + 8, logoHeight + 8)

              // Draw logo
              ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight)
            } catch (logoError) {
              console.warn('Logo loading failed, using QR without logo:', logoError)
            }
          }

          setQrWithLogo(canvas.toDataURL('image/png'))
          setLoading(false)
        } catch (qrError) {
          console.error('QR image loading failed:', qrError)
          setQrWithLogo(qrImageUrl)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error adding logo to QR:', error)
        setQrWithLogo(qrImageUrl)
        setLoading(false)
      }
    }

    addLogoToQR()
  }, [qrImageUrl, logoUrl, logoSize])

  if (loading) {
    return (
      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">
        <div className="text-gray-400 text-xs">Loading...</div>
      </div>
    )
  }

  return (
    <img
      src={qrWithLogo || qrImageUrl}
      alt={alt}
      width={width}
      height={height}
      className="w-32 h-32"
    />
  )
}
