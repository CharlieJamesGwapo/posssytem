# 🚀 Deployment Guide - Sit & Scan

Complete guide to deploy your ordering system to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrated and tested
- [ ] Menu items added and verified
- [ ] Payment methods configured
- [ ] Images uploaded to Cloudinary (if using)
- [ ] Staff dashboard tested
- [ ] Customer flow tested end-to-end
- [ ] Error handling verified

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- Optimized for Next.js
- Automatic deployments from Git
- Free tier available
- Global CDN
- Built-in analytics

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/sit-and-scan.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     DATABASE_URL
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
     CLOUDINARY_API_KEY
     CLOUDINARY_API_SECRET
     NEXT_PUBLIC_GCASH_MERCHANT_ID
     GCASH_SECRET_KEY
     NEXT_PUBLIC_APP_URL
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

### Post-Deployment
- Verify all pages load correctly
- Test ordering flow
- Check staff dashboard
- Monitor error logs

---

## 🌐 Option 2: Deploy to Netlify

### Steps

1. **Build Locally**
```bash
npm run build
```

2. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up for free

3. **Deploy**
   - Drag and drop the `.next` folder to Netlify
   - Or connect your GitHub repository

4. **Configure Environment Variables**
   - In Netlify dashboard: Site settings → Build & deploy → Environment
   - Add all environment variables

5. **Set Build Command**
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## 🖥️ Option 3: Self-Hosted (VPS/Dedicated Server)

### Requirements
- Node.js 18+
- PostgreSQL database
- Nginx or Apache (reverse proxy)
- SSL certificate (Let's Encrypt)
- PM2 or similar process manager

### Steps

1. **Setup Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2
```

2. **Clone Repository**
```bash
cd /var/www
git clone https://github.com/yourusername/sit-and-scan.git
cd sit-and-scan
```

3. **Install Dependencies**
```bash
npm install --production
```

4. **Setup Environment**
```bash
nano .env.local
# Add all environment variables
```

5. **Build Application**
```bash
npm run build
```

6. **Setup PM2**
```bash
pm2 start npm --name "sit-and-scan" -- start
pm2 save
pm2 startup
```

7. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

8. **Enable SSL**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🗄️ Database Setup for Production

### Neon PostgreSQL (Recommended)

1. **Create Account**
   - Go to https://neon.tech
   - Sign up for free

2. **Create Project**
   - Click "New Project"
   - Choose region closest to your users
   - Copy connection string

3. **Update Environment**
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

4. **Run Migrations**
```bash
npm run db:push
```

### Self-Hosted PostgreSQL

1. **Install PostgreSQL**
```bash
sudo apt install postgresql postgresql-contrib
```

2. **Create Database**
```bash
sudo -u postgres createdb sit_and_scan
sudo -u postgres createuser sit_and_scan_user
```

3. **Set Password**
```bash
sudo -u postgres psql
ALTER USER sit_and_scan_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE sit_and_scan TO sit_and_scan_user;
\q
```

4. **Update Connection String**
```env
DATABASE_URL="postgresql://sit_and_scan_user:strong_password@localhost:5432/sit_and_scan"
```

---

## 🖼️ Cloudinary Setup

1. **Create Account**
   - Go to https://cloudinary.com
   - Sign up for free

2. **Get Credentials**
   - Dashboard → Settings → API Keys
   - Copy Cloud Name, API Key, API Secret

3. **Add to Environment**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

---

## 💳 GCash Payment Setup

1. **Register as Merchant**
   - Contact GCash for merchant account
   - Provide business details
   - Get merchant ID and API keys

2. **Add to Environment**
```env
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"
```

3. **Implement Payment Gateway**
   - Update checkout page with GCash API
   - Test with sandbox credentials first

---

## 🔒 Security Best Practices

### Environment Variables
- Never commit `.env.local` to Git
- Use `.gitignore` to exclude it
- Use platform-specific secret management

### Database
- Use strong passwords
- Enable SSL connections
- Regular backups
- Restrict database access

### API
- Implement rate limiting
- Validate all inputs
- Use HTTPS only
- Add CORS headers if needed

### Deployment
- Keep dependencies updated
- Monitor error logs
- Setup uptime monitoring
- Regular security audits

---

## 📊 Monitoring & Logging

### Vercel
- Built-in analytics
- Error tracking
- Performance monitoring

### Self-Hosted
```bash
# View PM2 logs
pm2 logs sit-and-scan

# Monitor processes
pm2 monit

# Setup log rotation
npm install -g pm2-logrotate
pm2 install pm2-logrotate
```

### Error Tracking
Consider using:
- Sentry (https://sentry.io)
- LogRocket (https://logrocket.com)
- Datadog (https://www.datadoghq.com)

---

## 🔄 Continuous Deployment

### GitHub Actions (Vercel)
Automatic deployment on push to main:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## 📈 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm install -g next-bundle-analyzer
ANALYZE=true npm run build
```

### Image Optimization
- Use Cloudinary for image delivery
- Enable Next.js Image Optimization
- Compress images before upload

### Database Optimization
- Add indexes to frequently queried columns
- Use connection pooling
- Monitor slow queries

---

## 🆘 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Issues
- Verify DATABASE_URL format
- Check firewall rules
- Test connection locally first

### Slow Performance
- Check database query performance
- Monitor server resources
- Enable caching

### Payment Issues
- Verify API credentials
- Test with sandbox mode first
- Check payment gateway logs

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Neon Docs**: https://neon.tech/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

## ✅ Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Menu displays correctly
- [ ] Cart functionality works
- [ ] Checkout process completes
- [ ] Staff dashboard updates in real-time
- [ ] Payment codes generate correctly
- [ ] Database backups configured
- [ ] SSL certificate valid
- [ ] Error monitoring active
- [ ] Analytics tracking enabled
- [ ] Performance acceptable

---

**Your Sit & Scan system is ready for production! 🎉**
