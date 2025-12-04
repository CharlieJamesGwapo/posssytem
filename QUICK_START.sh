#!/bin/bash

# Flitra Café Sit & Scan - Quick Start Script

echo "🎉 Flitra Café Sit & Scan Ordering System"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Initialize database
echo "🗄️  Initializing database..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to initialize database"
    exit 1
fi

echo "✅ Database initialized"
echo ""

# Seed demo data
echo "🌱 Seeding demo data..."
npm run seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed data"
    exit 1
fi

echo "✅ Demo data seeded"
echo ""

# Start development server
echo "🚀 Starting development server..."
echo ""
echo "=========================================="
echo "✅ Server is running!"
echo "📱 Visit: http://localhost:3000"
echo "👨‍💼 Staff Dashboard: http://localhost:3000/staff"
echo "=========================================="
echo ""

npm run dev
