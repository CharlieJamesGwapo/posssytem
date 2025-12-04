@echo off
REM Flitra Café Sit & Scan - Quick Start Script for Windows

echo.
echo 🎉 Flitra Café Sit & Scan Ordering System
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Initialize database
echo 🗄️  Initializing database...
call npm run db:push

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to initialize database
    pause
    exit /b 1
)

echo ✅ Database initialized
echo.

REM Seed demo data
echo 🌱 Seeding demo data...
call npm run seed

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to seed data
    pause
    exit /b 1
)

echo ✅ Demo data seeded
echo.

REM Start development server
echo 🚀 Starting development server...
echo.
echo ==========================================
echo ✅ Server is running!
echo 📱 Visit: http://localhost:3000
echo 👨‍💼 Staff Dashboard: http://localhost:3000/staff
echo ==========================================
echo.

call npm run dev

pause
