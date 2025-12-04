const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Standard sizes with pricing
const SIZES = JSON.stringify([
  { name: 'Small', price: 130 },
  { name: 'Medium', price: 145 },
  { name: 'Large', price: 160 }
])

// Standard add-ons
const ADD_ONS = [
  { name: 'Extra Espresso Shot', price: 25 },
  { name: 'Flavored Syrup', price: 20 }, // vanilla, caramel, hazelnut
  { name: 'Almond / Oat Milk Substitute', price: 25 },
  { name: 'Extra Ice / Cold Brew Upgrade', price: 20 },
  { name: 'Whipped Cream / Topping', price: 20 }
]

async function main() {
  console.log('🌱 Starting database seed for Filtra Café...')

  try {
    // Clear existing data
    await prisma.orderAddOn.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.addOn.deleteMany()
    await prisma.menuItem.deleteMany()

    console.log('📝 Creating menu items with size pricing...')

    // ICED DRINKS
    const icedAmericano = await prisma.menuItem.create({
      data: {
        name: 'Iced Americano',
        description: 'Bold espresso shots with ice and water',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Iced Drinks',
        ingredients: JSON.stringify(['Espresso', 'Ice', 'Water']),
        allergens: JSON.stringify(['None']),
        sizes: SIZES,
      },
    })

    const icedSpanishLatte = await prisma.menuItem.create({
      data: {
        name: 'Iced Spanish Latte',
        description: 'Creamy condensed milk latte with ice',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Iced Drinks',
        ingredients: JSON.stringify(['Espresso', 'Condensed Milk', 'Ice', 'Milk']),
        allergens: JSON.stringify(['Dairy']),
        sizes: SIZES,
      },
    })

    const icedCaramelLatte = await prisma.menuItem.create({
      data: {
        name: 'Iced Caramel Latte',
        description: 'Sweet caramel-flavored iced latte',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Iced Drinks',
        ingredients: JSON.stringify(['Espresso', 'Milk', 'Caramel Syrup', 'Ice']),
        allergens: JSON.stringify(['Dairy']),
        sizes: SIZES,
      },
    })

    const icedMocha = await prisma.menuItem.create({
      data: {
        name: 'Iced Mocha',
        description: 'Chocolate and espresso blend served cold',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Iced Drinks',
        ingredients: JSON.stringify(['Espresso', 'Chocolate', 'Milk', 'Ice']),
        allergens: JSON.stringify(['Dairy', 'Cocoa']),
        sizes: SIZES,
      },
    })

    const icedCappuccino = await prisma.menuItem.create({
      data: {
        name: 'Iced Cappuccino',
        description: 'Classic cappuccino served over ice',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Iced Drinks',
        ingredients: JSON.stringify(['Espresso', 'Milk', 'Foam', 'Ice']),
        allergens: JSON.stringify(['Dairy']),
        sizes: SIZES,
      },
    })

    // HOT DRINKS
    const hotAmericano = await prisma.menuItem.create({
      data: {
        name: 'Hot Americano',
        description: 'Bold espresso shots with hot water',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Hot Drinks',
        ingredients: JSON.stringify(['Espresso', 'Hot Water']),
        allergens: JSON.stringify(['None']),
        sizes: SIZES,
      },
    })

    const hotSpanishLatte = await prisma.menuItem.create({
      data: {
        name: 'Hot Spanish Latte',
        description: 'Creamy condensed milk latte served hot',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Hot Drinks',
        ingredients: JSON.stringify(['Espresso', 'Condensed Milk', 'Milk']),
        allergens: JSON.stringify(['Dairy']),
        sizes: SIZES,
      },
    })

    const hotCaramelLatte = await prisma.menuItem.create({
      data: {
        name: 'Hot Caramel Latte',
        description: 'Sweet caramel-flavored hot latte',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Hot Drinks',
        ingredients: JSON.stringify(['Espresso', 'Milk', 'Caramel Syrup']),
        allergens: JSON.stringify(['Dairy']),
        sizes: SIZES,
      },
    })

    const hotMocha = await prisma.menuItem.create({
      data: {
        name: 'Hot Mocha',
        description: 'Chocolate and espresso blend served hot',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Hot Drinks',
        ingredients: JSON.stringify(['Espresso', 'Chocolate', 'Milk']),
        allergens: JSON.stringify(['Dairy', 'Cocoa']),
        sizes: SIZES,
      },
    })

    const hotCappuccino = await prisma.menuItem.create({
      data: {
        name: 'Hot Cappuccino',
        description: 'Classic cappuccino with espresso and foam',
        price: 130,
        image: 'https://res.cloudinary.com/dtr1tnutd/image/upload/v1764641589/iced-american_tytfm6.avif',
        category: 'Hot Drinks',
        ingredients: JSON.stringify(['Espresso', 'Milk', 'Foam']),
        allergens: JSON.stringify(['Dairy']),
        sizes: SIZES,
      },
    })

    console.log('➕ Creating add-ons...')

    // Create standard add-ons for each menu item
    const allMenuItems = [
      icedAmericano, icedSpanishLatte, icedCaramelLatte, icedMocha, icedCappuccino,
      hotAmericano, hotSpanishLatte, hotCaramelLatte, hotMocha, hotCappuccino
    ]

    for (const menuItem of allMenuItems) {
      for (const addOn of ADD_ONS) {
        await prisma.addOn.create({
          data: {
            name: addOn.name,
            price: addOn.price,
            menuItemId: menuItem.id,
          },
        })
      }
    }

    // Create tables with QR codes
    console.log('📱 Creating tables with QR codes...')
    const QRCode = require('qrcode')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Create 10 tables
    for (let i = 1; i <= 10; i++) {
      const qrData = `${baseUrl}/?table=${i}`
      const qrCodeImage = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })

      await prisma.table.create({
        data: {
          tableNumber: i,
          qrCode: qrCodeImage,
          qrCodeData: qrData,
          status: 'AVAILABLE',
        },
      })
    }

    console.log('✅ Seed completed successfully!')
    console.log(`📊 Created 10 menu items with ${ADD_ONS.length} add-ons each`)
    console.log(`💰 All items have size pricing: Small (₱130), Medium (₱145), Large (₱160)`)
    console.log(`📱 Created 10 tables with QR codes`)
  } catch (error) {
    console.error('❌ Error during seed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
