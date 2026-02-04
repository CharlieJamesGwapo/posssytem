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

async function seed() {
  console.log('🌱 Starting database seed for Filtra Café...')
  
  try {
    // Clear existing data
    await prisma.orderAddOn.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.addOn.deleteMany()
    await prisma.menuItem.deleteMany()
    await prisma.table.deleteMany()
    await prisma.staff.deleteMany()
    
    console.log('📝 Creating menu items with size pricing...')
    
    // Create menu items from the images
    const menuItems = [
      // Coffee Drinks
      {
        name: 'Caffe Americano',
        description: 'Rich espresso diluted with hot water',
        price: 95,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Caffe Latte',
        description: 'Smooth espresso with steamed milk and light foam',
        price: 130,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Caffe Mocha',
        description: 'Espresso with chocolate, steamed milk, and whipped cream',
        price: 145,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Cappuccino',
        description: 'Classic espresso with equal parts steamed milk and foam',
        price: 120,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Caramel Macchiato',
        description: 'Espresso marked with vanilla syrup and steamed milk, topped with caramel drizzle',
        price: 155,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Caramel Frappuccino',
        description: 'Blended caramel coffee with ice, topped with whipped cream and caramel drizzle',
        price: 175,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Chocolate Frappuccino',
        description: 'Blended mocha with ice, topped with whipped cream and chocolate drizzle',
        price: 175,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Espresso',
        description: 'Pure, rich espresso shot',
        price: 80,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: false,
        isAvailable: true
      },
      {
        name: 'Espresso Macchiato',
        description: 'Espresso marked with a dollop of foam',
        price: 95,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: false,
        isAvailable: true
      },
      {
        name: 'Flat White',
        description: 'Double ristretto espresso with velvety microfoam',
        price: 135,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'French Vanilla Latte',
        description: 'Smooth latte with french vanilla syrup',
        price: 145,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Hazelnut Latte',
        description: 'Rich latte with hazelnut syrup flavor',
        price: 145,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: false,
        isAvailable: true
      },
      {
        name: 'Iced Caffe Americano',
        description: 'Espresso shots with cold water over ice',
        price: 105,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced Caffe Latte',
        description: 'Espresso with cold milk over ice',
        price: 140,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced Caramel Macchiato',
        description: 'Espresso with vanilla syrup, milk, ice, and caramel drizzle',
        price: 165,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced Chocolate Almond Milk Latte',
        description: 'Chocolate latte with almond milk, served over ice',
        price: 160,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced Cinnamon Dolce Latte',
        description: 'Sweet cinnamon-flavored latte over ice',
        price: 155,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: false,
        isAvailable: true
      },
      {
        name: 'Iced Coffee',
        description: 'Cold brew coffee with ice',
        price: 90,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced Toasted Vanilla Oatmilk Shaken Espresso',
        description: 'Shaken espresso with toasted vanilla and oat milk over ice',
        price: 170,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced Vanilla Latte',
        description: 'Classic vanilla latte served over ice',
        price: 145,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Iced White Chocolate Mocha',
        description: 'White chocolate and espresso over ice',
        price: 165,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Java Chip Frappuccino',
        description: 'Blended mocha with chocolate chips and ice',
        price: 185,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Mocha Frappuccino',
        description: 'Blended chocolate coffee with ice and whipped cream',
        price: 175,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Pumpkin Spice Frappuccino',
        description: 'Seasonal blended pumpkin spice coffee',
        price: 185,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Pumpkin Spice Latte',
        description: 'Seasonal espresso with pumpkin spice syrup',
        price: 165,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Strawberry Cream Frappuccino',
        description: 'Blended strawberry cream with ice and whipped cream',
        price: 175,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Toasted White Chocolate Mocha',
        description: 'Toasted white chocolate with espresso',
        price: 165,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Vanilla Bean Frappuccino',
        description: 'Blended vanilla cream with ice',
        price: 165,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Vanilla Latte',
        description: 'Classic vanilla-flavored latte',
        price: 140,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'White Chocolate Mocha',
        description: 'White chocolate and espresso combination',
        price: 160,
        category: 'Coffee',
        sizes: SIZES,
        isBestSeller: true,
        isAvailable: true
      },
      
      // Food Items
      {
        name: 'Chocolate Croissant',
        description: 'Buttery croissant with rich chocolate filling',
        price: 85,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Almond Croissant',
        description: 'Flaky croissant with almond filling and sliced almonds',
        price: 90,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Classic Croissant',
        description: 'Traditional buttery French croissant',
        price: 75,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Pain Au Chocolat',
        description: 'French chocolate-filled pastry',
        price: 85,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Blueberry Muffin',
        description: 'Fresh muffin with real blueberries',
        price: 65,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Chocolate Chip Muffin',
        description: 'Moist muffin loaded with chocolate chips',
        price: 65,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Banana Bread',
        description: 'Moist banana bread with walnuts',
        price: 70,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      },
      {
        name: 'Cinnamon Roll',
        description: 'Sweet roll with cinnamon frosting',
        price: 80,
        category: 'Food',
        sizes: null,
        isBestSeller: true,
        isAvailable: true
      }
    ]

    // Create all menu items
    const createdItems = await prisma.menuItem.createMany({
      data: menuItems
    })

    console.log(`✅ Created ${createdItems.count} menu items`)

    console.log('➕ Creating add-ons...')
    
    // Create add-ons for each menu item
    const allMenuItems = await prisma.menuItem.findMany()
    
    for (const item of allMenuItems) {
      if (item.category === 'Coffee') {
        await prisma.addOn.createMany({
          data: ADD_ONS.map(addOn => ({
            ...addOn,
            menuItemId: item.id
          }))
        })
      }
    }

    console.log('📱 Creating tables with QR codes...')
    
    // Create tables
    const tables = Array.from({ length: 12 }, (_, i) => ({
      tableNumber: i + 1,
      qrCode: `/qr-codes/table-${i + 1}.png`,
      qrCodeData: JSON.stringify({
        tableNumber: i + 1,
        url: `http://localhost:3000?table=${i + 1}`
      }),
      status: 'AVAILABLE'
    }))

    await prisma.table.createMany({
      data: tables
    })

    console.log('👤 Creating staff accounts...')
    
    // Create staff accounts
    await prisma.staff.createMany({
      data: [
        {
          username: 'admin',
          password: 'admin123', // In production, hash this password
          name: 'Administrator',
          role: 'ADMIN',
          email: 'admin@filtracafe.com',
          isActive: true
        },
        {
          username: 'manager',
          password: 'manager123',
          name: 'Store Manager',
          role: 'MANAGER',
          email: 'manager@filtracafe.com',
          isActive: true
        },
        {
          username: 'barista',
          password: 'barista123',
          name: 'Barista Staff',
          role: 'BARISTA',
          email: 'barista@filtracafe.com',
          isActive: true
        }
      ]
    })

    console.log('✅ Seed completed successfully!')
    console.log(`📊 Created ${createdItems.count} menu items with add-ons`)
    console.log(`🪑 Created ${tables.length} tables`)
    console.log(`👤 Created 3 staff accounts`)
    console.log('')
    console.log('🔑 Staff Login Credentials:')
    console.log('   Admin: admin / admin123')
    console.log('   Manager: manager / manager123')
    console.log('   Barista: barista / barista123')

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

seed()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
