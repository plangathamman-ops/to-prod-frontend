# Production Deployment Guide - Firebase Auth

This guide covers deploying your Firebase Auth setup to production (Vercel + Railway).

## Overview

- **Frontend**: Vercel (same as before)
- **Backend**: Railway (same as before)
- **Database**: MongoDB Atlas (same as before)
- **Auth**: Firebase (new)

No infrastructure changes needed - just add environment variables.

## Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Frontend `.env.production` has Firebase credentials
- [ ] Backend has Firebase service account key
- [ ] MongoDB connection verified
- [ ] Local testing completed
- [ ] Git repository updated

## Frontend Deployment (Vercel)

### Step 1: Update Environment Variables in Vercel

1. Go to Your Vercel Project
2. Settings → **Environment Variables**
3. Add the following (with your Firebase credentials):

```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_API_URL=https://to-prod-backend-production.up.railway.app/api
```

### Step 2: Update VITE_API_URL

Change from localhost to your production backend URL:
```
VITE_API_URL=https://your-railway-backend.up.railway.app/api
```

### Step 3: Test Frontend Build

```bash
cd frontend
npm run build
npm run preview
```

Should build without errors. Check for any console errors.

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Add Firebase Auth integration"
git push origin main
```

Vercel will auto-deploy with new environment variables.

### Step 5: Verify Frontend Deployment

1. Visit your Vercel deployment URL
2. Try `/login` → Email/password login
3. Try **Sign in with Google**
4. Try `/register`

## Backend Deployment (Railway)

### Step 1: Add Firebase Package

Already added to `package.json`. No additional steps needed.

### Step 2: Prepare Firebase Service Account

**Option A: Environment Variable (Recommended)**

1. Open your Firebase Service Account JSON
2. Convert to single-line string:
```bash
# macOS/Linux:
cat src/config/serviceAccountKey.json | tr '\n' ' ' | sed 's/ //g'

# Windows PowerShell:
Get-Content src/config/serviceAccountKey.json | ConvertFrom-Json | ConvertTo-Json -Compress
```

3. Copy the output

**Option B: Upload as File**

1. Add to Railway project (if supported)
2. Set path in environment variable

### Step 3: Add Environment Variables to Railway

1. Go to Railway Project → Variables
2. Add the following:

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@host/db
JWT_SECRET=your-super-secure-random-string-here
JWT_EXPIRE=7d
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

⚠️ **Important**: For `FIREBASE_SERVICE_ACCOUNT_JSON`:
```
Paste the full Firebase service account JSON as a single line
```

### Step 4: Deploy Backend

```bash
git add .
git commit -m "Add Firebase Auth to backend"
git push origin main
```

Railway will auto-deploy.

### Step 5: Verify Backend Logs

1. Go to Railway Deployments
2. Check logs for Firebase initialization:
```
✓ Firebase Admin SDK initialized successfully
✓ Server running on port 5000
```

### Step 6: Test Backend Endpoints

```bash
# Get your Railway backend URL from deployment
BACKEND_URL=https://your-railway-backend.up.railway.app

# Test health check
curl $BACKEND_URL/api/health

# Test Firebase register
curl -X POST $BACKEND_URL/api/auth/firebase-register \
  -H "Content-Type: application/json" \
  -d '{
    "firebaseToken": "token-from-frontend",
    "email": "test@example.com",
    "uid": "firebase-uid-123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## Firebase Console Configuration

### Add Authorized Domains

1. Firebase Console → **Authentication** → **Settings**
2. Go to **Authorized domains**
3. Add your domain:
   ```
   your-frontend.vercel.app
   yourdomain.com
   ```

### Enable CORS (if needed)

Firebase automatically handles CORS. No additional configuration needed.

### Monitor Firebase Usage

1. Firebase Console → **Authentication**
2. View:
   - Signed-up users
   - Sign-in events
   - Failed auth attempts

## Testing Production Deployment

### Test Email/Password Flow
```
1. Go to https://your-frontend.vercel.app/register
2. Create account with new email
3. Check MongoDB for new user
4. Login with same credentials
5. Should see dashboard
```

### Test Google Sign-In
```
1. Go to https://your-frontend.vercel.app/login
2. Click "Sign in with Google"
3. Google popup should appear
4. After auth, should see dashboard
5. Check MongoDB for new user
```

### Test Backend API
```bash
# Using your production URLs:
curl -X POST https://your-backend.railway.app/api/auth/firebase-login \
  -H "Content-Type: application/json" \
  -d '{"firebaseToken":"...","email":"test@example.com","uid":"..."}'
```

### Monitor Logs

**Vercel Frontend**:
1. Project Settings → **Function Logs**
2. Check for any errors in Next.js/Vite build

**Railway Backend**:
1. Deployments → **Logs**
2. Look for Firebase initialization messages
3. Monitor for auth errors

## Troubleshooting Production

### Frontend: Firebase Config Not Loading
**Error**: `Firebase is not initialized`

**Solution**:
```bash
# Verify env variables in Vercel:
1. Go to Settings → Environment Variables
2. Check all VITE_FIREBASE_* variables are set
3. Redeploy: git push origin main
4. Wait 1-2 minutes for new build
```

### Backend: Firebase Admin SDK Error
**Error**: `Cannot find module 'firebase-admin'`

**Solution**:
```bash
# In Railway:
1. Check node_modules is not in .gitignore
2. Railway should auto-install from package.json
3. If error persists, manually run: npm install
4. Redeploy
```

### Backend: Service Account Key Not Found
**Error**: `ENOENT: no such file or directory 'src/config/serviceAccountKey.json'`

**Solution**:
```bash
# Must use environment variable in production:
1. Set FIREBASE_SERVICE_ACCOUNT_JSON in Railway
2. Don't commit serviceAccountKey.json to GitHub
3. The firebase.js config checks for env var first
```

### OAuth: 400 Error from Google
**Error**: `redirect_uri_mismatch`

**Solution**:
```
1. Firebase Console → Authentication → Google Provider
2. Click "Web SDK configuration" → Authorized JavaScript origins
3. Add: https://your-frontend.vercel.app
4. Also add: https://www.your-domain.com (if using domain)
```

### Backend: CORS Errors
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
Firebase handles CORS automatically. If you see this:
1. Check `VITE_API_URL` in Vercel env
2. Check backend CORS middleware is enabled
3. Verify backend URL matches what frontend calls

## Monitoring & Maintenance

### Daily Checks
- [ ] Firebase Authentication logs
- [ ] Backend error logs
- [ ] MongoDB connection health

### Weekly Checks
- [ ] Review failed login attempts
- [ ] Check for suspicious auth patterns
- [ ] Update dependencies (if needed)

### Monthly Checks
- [ ] Review Firebase usage/costs
- [ ] Test backup/recovery procedures
- [ ] Review security logs

### Useful Monitoring Links

**Firebase**:
- [Firebase Analytics](https://console.firebase.google.com/) → Analytics
- [Firebase Billing](https://console.firebase.google.com/billing)

**Vercel**:
- [Vercel Analytics](https://vercel.com/dashboard) → Analytics
- [Vercel Logs](https://vercel.com/dashboard) → Deployments

**Railway**:
- [Railway Logs](https://railway.app/) → Logs
- [Railway Metrics](https://railway.app/) → Metrics

## Rollback Plan

If something goes wrong:

### Rollback Frontend
```bash
# Go back to previous version:
1. Vercel Dashboard → Deployments
2. Click previous deployment
3. Click "Rollback to this Deployment"

# Or from git:
git revert HEAD
git push origin main
```

### Rollback Backend
```bash
# Same approach:
1. Railway Dashboard → Deployments
2. Select previous deployment
3. Click "Activate"
```

### Rollback Database
```bash
# MongoDB Atlas backup procedure:
1. MongoDB Atlas → Snapshots
2. Restore from previous snapshot
3. Wait for restore to complete
```

## Scaling Considerations

### When Firebase Usage Grows

Firebase provides:
- **Free tier**: 50K monthly active users
- **Blaze pay-as-you-go**: After free tier

Monitor usage in Firebase Console → Billing.

### When Backend Needs Scaling

Your backend on Railway:
- Scales automatically with load
- Monitor CPU/memory in Railway dashboard
- Increase instance size if needed

### When MongoDB Needs Scaling

MongoDB Atlas handles auto-scaling:
- M0 (free) → M5+ (paid)
- Upgrade in MongoDB Atlas console

## Success Metrics

After deployment, verify:
- ✅ New user registrations via email working
- ✅ Google sign-in working
- ✅ Existing users can login
- ✅ User data in MongoDB correct
- ✅ Dashboard loads after login
- ✅ No console errors in browser
- ✅ No errors in backend logs

## Final Checklist

- [ ] Frontend deployed and tested
- [ ] Backend deployed and tested
- [ ] Firebase credentials in both
- [ ] MongoDB working
- [ ] Email/password auth working
- [ ] Google sign-in working
- [ ] User data synced to MongoDB
- [ ] Logs monitored
- [ ] Backup strategy in place

## Support

If issues arise:

1. **Check logs first**
   - Vercel: Settings → Function Logs
   - Railway: Logs tab

2. **Test locally**
   ```bash
   npm run dev  # Frontend
   npm run dev  # Backend (in another terminal)
   ```

3. **Review documentation**
   - `FIREBASE_SETUP.md` (Frontend)
   - `FIREBASE_SETUP_BACKEND.md` (Backend)
   - `IMPLEMENTATION_SUMMARY.md` (Overview)

4. **Firebase Documentation**
   - https://firebase.google.com/docs/auth
   - https://firebase.google.com/docs/admin/setup

---

**Deployment complete! Monitor your production system and enjoy Firebase Auth.** 🚀
