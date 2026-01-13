/**
 * Utility to add logo to QR code image
 */

export async function addLogoToQR(
  qrImageUrl: string,
  logoUrl: string,
  logoSize: number = 0.25 // Logo size as percentage of QR code (0.25 = 25%)
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Create canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      // Load QR code image
      const qrImage = new Image()
      qrImage.crossOrigin = 'anonymous'
      qrImage.onload = () => {
        // Set canvas size to match QR code
        canvas.width = qrImage.width
        canvas.height = qrImage.height

        // Draw QR code
        ctx.drawImage(qrImage, 0, 0)

        // Draw white background for logo
        const logoWidth = canvas.width * logoSize
        const logoHeight = canvas.height * logoSize
        const logoX = (canvas.width - logoWidth) / 2
        const logoY = (canvas.height - logoHeight) / 2

        // White background
        ctx.fillStyle = 'white'
        ctx.fillRect(logoX - 5, logoY - 5, logoWidth + 10, logoHeight + 10)

        // Border
        ctx.strokeStyle = '#ccc'
        ctx.lineWidth = 2
        ctx.strokeRect(logoX - 5, logoY - 5, logoWidth + 10, logoHeight + 10)

        // Load and draw logo
        const logo = new Image()
        logo.crossOrigin = 'anonymous'
        logo.onload = () => {
          ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight)
          resolve(canvas.toDataURL('image/png'))
        }
        logo.onerror = () => {
          // If logo fails to load, return QR without logo
          resolve(canvas.toDataURL('image/png'))
        }
        logo.src = logoUrl
      }
      qrImage.onerror = () => {
        reject(new Error('Could not load QR code image'))
      }
      qrImage.src = qrImageUrl
    } catch (error) {
      reject(error)
    }
  })
}
