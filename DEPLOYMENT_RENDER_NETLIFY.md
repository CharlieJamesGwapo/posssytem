# 🚀 Render & Netlify Deployment Guide

## Quick Start

### For Render Deployment (Recommended for Full-Stack)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Select "Web Service"
   - Use the existing `render.yaml` configuration
   - Set environment variables in Render dashboard

3. **Required Environment Variables**
   ```
   DATABASE_URL=your_postgresql_connection_string
   DIRECT_DATABASE_URL=your_postgresql_connection_string
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtr1tnutd
   CLOUDINARY_API_KEY=996924146567939
   CLOUDINARY_API_SECRET=WshNRCdR45yOImVBoMxCCeLrFY
   NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
   GCASH_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
   NEXT_PUBLIC_BASE_URL=https://your-app-name.onrender.com
   ```

### For Netlify Deployment (Static Frontend Only)

1. **Build for Netlify**
   ```bash
   set NETLIFY=true
   npm run build
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Use the existing `netlify.toml` configuration
   - Set environment variables in Netlify dashboard

3. **Netlify Environment Variables**
   ```
   NETLIFY=true
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtr1tnutd
   NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
   NEXT_PUBLIC_APP_URL=https://your-app-name.netlify.app
   NEXT_PUBLIC_BASE_URL=https://your-app-name.netlify.app
   ```

## Key Differences

### Render (Full-Stack)
- ✅ Full Next.js with API routes
- ✅ Server-side rendering
- ✅ Database connectivity
- ✅ File uploads
- ✅ Real-time features

### Netlify (Static)
- ✅ Static site generation
- ✅ Fast loading
- ✅ Free hosting
- ❌ No server-side features
- ❌ Limited API functionality

## Configuration Files

### `render.yaml` - Render Configuration
- Automatically configures your Render service
- Sets up build commands and environment variables
- Optimized for Node.js 22

### `netlify.toml` - Netlify Configuration  
- Configures static build settings
- Sets up redirects and headers
- Optimized for static deployment

### `next.config.js` - Next.js Configuration
- Automatically detects deployment platform
- Optimizes images for each platform
- Handles static vs dynamic builds

## Deployment Commands

### Render
```bash
# Automatic deployment on git push
git push origin main

# Manual deployment (if needed)
npm run build
npm start
```

### Netlify
```bash
# Build for static deployment
set NETLIFY=true && npm run build

# Local development
npm run dev
```

## Environment Setup

1. **Copy environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Update URLs in .env**
   - For Render: `https://your-app-name.onrender.com`
   - For Netlify: `https://your-app-name.netlify.app`

3. **Install dependencies**
   ```bash
   npm install
   ```

## Troubleshooting

### Render Issues
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure database connection is working

### Netlify Issues
- Check that NETLIFY=true is set
- Verify build output in `out/` directory
- Check redirect rules in `netlify.toml`

## Next Steps

1. Choose your deployment platform (Render recommended)
2. Update environment variables with your URLs
3. Push to GitHub
4. Deploy on chosen platform
5. Test all functionality

## Support

For platform-specific issues:
- Render: [render.com/docs](https://render.com/docs)
- Netlify: [netlify.com/docs](https://netlify.com/docs)
