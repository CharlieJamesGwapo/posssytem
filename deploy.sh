#!/bin/bash

# POS System Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting POS System Deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄️ Generating Prisma client..."
npx prisma generate

echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "🎯 Next Steps:"
echo "1. Set up your production database"
echo "2. Configure environment variables (.env.production)"
echo "3. Run database migrations: npx prisma db push"
echo "4. Seed database: npm run db:seed"
echo "5. Start production server: npm start"
echo ""
echo "🌐 Your POS system is ready for deployment!"
