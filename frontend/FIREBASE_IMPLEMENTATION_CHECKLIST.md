# Firebase Auth Implementation Checklist

Use this checklist to track your progress through the entire Firebase Auth setup.

---

## Phase 1: Planning & Understanding (✏️ 10 minutes)

- [ ] Read `README_FIREBASE.md` (orientation)
- [ ] Read `QUICK_START_FIREBASE.md` (understand scope)
- [ ] Review `IMPLEMENTATION_SUMMARY.md` (grasp architecture)
- [ ] Understand you keep: Node.js, MongoDB, M-Pesa integration
- [ ] Understand you gain: Email/password, Google Sign-in, security

---

## Phase 2: Firebase Project Setup (⏱️ 15 minutes)

### Create Firebase Project
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Click "Add project" 
- [ ] Name: `industrial-attachment` (or your choice)
- [ ] Accept terms and create
- [ ] Wait for project to be ready

### Enable Authentication Methods
- [ ] Go to Authentication → Sign-in method
- [ ] Enable Email/Password provider
- [ ] Enable Google provider
- [ ] Add support email for Google provider
- [ ] Click Save

### Get Web App Credentials
- [ ] Click Web icon (</>) to create app
- [ ] Name: `industrial-attachment-frontend`
- [ ] Register app
- [ ] Copy the Firebase config (keep safe)
- [ ] Note: Don't implement Firebase Hosting (optional)

**Firebase Config Template:**
```
apiKey: _______________
authDomain: _______________
projectId: _______________
storageBucket: _______________
messagingSenderId: _______________
appId: _______________
```

### Get Backend Service Account Key
- [ ] Go to Project Settings (⚙️ icon)
- [ ] Select "Service Accounts" tab
- [ ] Click "Generate New Private Key"
- [ ] Save the JSON file securely
- [ ] File should be named: `serviceAccountKey.json`
- [ ] Note: This is sensitive - don't share

---

## Phase 3: Frontend Configuration (⏱️ 10 minutes)

### Setup Environment Variables
- [ ] Navigate to `frontend/` directory
- [ ] Find `.env.example` file
- [ ] Create `.env` file (copy from example)
- [ ] Fill in VITE_FIREBASE variables (from Phase 2)
- [ ] Set VITE_API_URL=http://localhost:5000/api (for local dev)
- [ ] Save `.env` file

**Your `.env` should have:**
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_API_URL=http://localhost:5000/api
```

### Install Dependencies
- [ ] Open terminal in `frontend/` directory
- [ ] Run: `npm install`
- [ ] Wait for installation to complete
- [ ] No errors in installation output

### Verify Frontend Setup
- [ ] Check `.env` file exists and is populated
- [ ] Check `src/config/firebaseConfig.js` exists
- [ ] Check `src/context/authStore.js` is updated
- [ ] Check `src/pages/Login.jsx` has Google button
- [ ] Check `src/pages/Register.jsx` has Google button
- [ ] Check `src/App.jsx` has useEffect for auth init

---

## Phase 4: Backend Configuration (⏱️ 10 minutes)

### Setup Service Account Key
- [ ] Navigate to `backend/` directory
- [ ] Create folder: `src/config/` (if doesn't exist)
- [ ] Save service account JSON as: `src/config/serviceAccountKey.json`
- [ ] Add `.gitignore` entry: `src/config/serviceAccountKey.json`
- [ ] Verify file is NOT tracked by git

**Check .gitignore:**
```bash
echo "src/config/serviceAccountKey.json" >> backend/.gitignore
```

### Setup Environment Variables
- [ ] Find `backend/.env.example`
- [ ] Create `backend/.env` (copy from example)
- [ ] Fill in your values:
  - PORT=5000
  - NODE_ENV=development
  - MONGO_URI=your-mongodb-connection
  - JWT_SECRET=your-random-secret
  - JWT_EXPIRE=7d
  - Others as needed
- [ ] Save `.env` file

**Your `.env` should have:**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://user:pass@host/db
JWT_SECRET=your-super-secure-random-string-here
JWT_EXPIRE=7d
```

### Install Dependencies
- [ ] Open terminal in `backend/` directory
- [ ] Run: `npm install`
- [ ] Wait for installation (should see firebase-admin)
- [ ] No errors in output

### Verify Firebase Admin SDK
- [ ] Run: `node -e "require('./src/config/firebase.js'); console.log('Firebase OK')"`
- [ ] Should print: "Firebase OK" (not an error)
- [ ] Firebase Admin SDK is properly initialized

### Verify Backend Files
- [ ] Check `src/config/firebase.js` exists
- [ ] Check `src/middleware/firebaseAuth.js` exists
- [ ] Check `src/models/User.js` has `firebaseUid` field
- [ ] Check `src/controllers/authController.js` has new functions
- [ ] Check `src/routes/auth.js` has new routes

---

## Phase 5: Local Testing (⏱️ 20 minutes)

### Start Backend
- [ ] Open Terminal 1
- [ ] Navigate to `backend/` directory
- [ ] Run: `npm run dev`
- [ ] Wait for startup (2-3 seconds)
- [ ] Should see: "Server running on port 5000"
- [ ] Should see: "Firebase Admin SDK initialized successfully"
- [ ] Keep terminal open

### Start Frontend
- [ ] Open Terminal 2 (new window)
- [ ] Navigate to `frontend/` directory
- [ ] Run: `npm run dev`
- [ ] Wait for startup (3-5 seconds)
- [ ] Should see: "VITE v... ready in ... ms"
- [ ] Look for local URL (usually http://localhost:5173)
- [ ] Keep terminal open

### Test Email/Password Registration
- [ ] Open `http://localhost:5173` in browser
- [ ] Click "/register" link
- [ ] Fill form:
  - First Name: John
  - Last Name: Doe
  - Email: john.doe@example.com
  - Phone: 254712345678
  - Password: Password123
  - Confirm: Password123
- [ ] Click "Create Account"
- [ ] Should see success message (toast notification)
- [ ] Should redirect to dashboard
- [ ] Check MongoDB - user should exist with `firebaseUid`

### Test Email/Password Login
- [ ] Click logout button (if visible)
- [ ] Or go to `/login` manually
- [ ] Fill form:
  - Email: john.doe@example.com
  - Password: Password123
- [ ] Click "Sign in"
- [ ] Should see success message
- [ ] Should redirect to dashboard

### Test Google Sign-In
- [ ] Go to `/login`
- [ ] Click "Sign in with Google" button
- [ ] Google popup should appear
- [ ] Select your test Google account
- [ ] Should see success toast notification
- [ ] Should redirect to dashboard
- [ ] Check MongoDB - user should be created or linked

### Test Browse Opportunities (No Login)
- [ ] Logout (if needed)
- [ ] Go to `/login`
- [ ] Click "Browse Opportunities" button
- [ ] Should show opportunities list
- [ ] Should work WITHOUT being logged in

### Verify Data in MongoDB
- [ ] Go to MongoDB Atlas console
- [ ] Select your database
- [ ] View "Users" collection
- [ ] New users should appear with:
  - `email` field
  - `firebaseUid` field (for Firebase users)
  - `firstName` field
  - `lastName` field
  - `phoneNumber` field
  - `isVerified: true` field

---

## Phase 6: Testing Different Scenarios (⏱️ 10 minutes)

### Test Invalid Email
- [ ] Go to register
- [ ] Enter invalid email: `notanemail`
- [ ] Try to submit - should show error

### Test Password Mismatch
- [ ] Enter password: Password123
- [ ] Confirm password: Different123
- [ ] Should show error: "Passwords do not match"

### Test Duplicate Registration
- [ ] Try to register with same email as before
- [ ] Should see error: "User already exists"

### Test Wrong Password Login
- [ ] Try to login with correct email
- [ ] Enter wrong password
- [ ] Should show error: "Invalid credentials"

### Test Multiple Browsers/Devices
- [ ] Register/login from different device or incognito
- [ ] Should work fine
- [ ] Google prompt should appear each time

---

## Phase 7: Console Error Checking (⏱️ 5 minutes)

### Frontend Console (Ctrl+Shift+K or F12)
- [ ] Open browser DevTools → Console tab
- [ ] Go through authentication flows
- [ ] Should see NO red errors
- [ ] WARNING messages are OK
- [ ] Note any actual ERROR messages

### Backend Console (Terminal)
- [ ] Watch backend terminal during auth
- [ ] Should see token verification logs
- [ ] Should see no error messages in red
- [ ] Successful operations should log

### If Errors Appear
- [ ] Write down exact error message
- [ ] Check relevant troubleshooting guide
- [ ] Review .env variables
- [ ] Ensure Firebase project is correctly configured
- [ ] Try restarting both services

---

## Phase 8: Git & Version Control (⏱️ 5 minutes)

### Update .gitignore
- [ ] Backend `.gitignore`: includes `src/config/serviceAccountKey.json`
- [ ] Frontend `.gitignore`: verify firebase.js configs not exposed
- [ ] Run: `git status` (should not show serviceAccountKey.json)

### Commit Code
- [ ] Stage changes: `git add .`
- [ ] Commit: `git commit -m "Add Firebase Auth integration"`
- [ ] Check status: `git status` (should be clean)
- [ ] Do NOT push serviceAccountKey.json

### Before Pushing
- [ ] Remove any sensitive keys from commits
- [ ] Ensure .env files are in .gitignore
- [ ] Ensure serviceAccountKey.json is in .gitignore
- [ ] Run: `git status` to verify nothing sensitive is staged

---

## Phase 9: Prepare for Production (⏱️ 15 minutes)

### Frontend Production Setup
- [ ] Create `.env.production` (if needed)
- [ ] Set VITE_API_URL to your production backend URL
  - Example: `https://your-backend.railway.app/api`
- [ ] Keep Firebase credentials (they're public)
- [ ] When deploying to Vercel:
  - [ ] Add all VITE_FIREBASE_* variables to Vercel
  - [ ] Add VITE_API_URL pointing to production backend

### Backend Production Setup
- [ ] Prepare FIREBASE_SERVICE_ACCOUNT_JSON as env variable
- [ ] Create strong JWT_SECRET (use random generator)
- [ ] Set NODE_ENV=production
- [ ] When deploying to Railway:
  - [ ] Set all required environment variables
  - [ ] Set FIREBASE_SERVICE_ACCOUNT_JSON
  - [ ] Verify MongoDB connection in production

### Firebase Console
- [ ] Add production domain to authorized domains
  - [ ] Vercel project URL (e.g., your-app.vercel.app)
  - [ ] Your custom domain (if using one)
- [ ] Save changes

---

## Phase 10: Deployment (⏱️ 30 minutes)

### Pre-Deployment Verification
- [ ] Local testing complete and working
- [ ] No sensitive data in git
- [ ] All environment variables documented
- [ ] MongoDB connection verified
- [ ] Firebase credentials confirmed

### Deploy Frontend to Vercel
- [ ] Go to Vercel Dashboard
- [ ] Select your project
- [ ] Settings → Environment Variables
- [ ] Add all VITE_FIREBASE_* variables
- [ ] Add VITE_API_URL=<your-production-backend>
- [ ] Trigger redeploy (git push or manual)
- [ ] Wait for build to complete
- [ ] Test login at deployed URL

### Deploy Backend to Railway
- [ ] Go to Railway Dashboard
- [ ] Select your project
- [ ] Variables settings
- [ ] Add/update environment variables
- [ ] Add FIREBASE_SERVICE_ACCOUNT_JSON (full JSON string)
- [ ] Trigger redeploy
- [ ] Monitor logs for Firebase initialization
- [ ] Verify no errors in deployment logs

### Verify Production
- [ ] Go to frontend URL (Vercel)
- [ ] Test register/login flow
- [ ] Test Google sign-in
- [ ] Check MongoDB for new users
- [ ] Monitor both service logs
- [ ] No errors should appear

---

## Phase 11: Post-Deployment Monitoring (⏱️ Ongoing)

### Week 1 - Daily Checks
- [ ] Check Vercel logs for errors
- [ ] Check Railway logs for errors
- [ ] Monitor Firebase Authentication dashboard
- [ ] Invite beta testers to try

### Week 2+ - Weekly Checks
- [ ] Review failed login attempts (Firebase Console)
- [ ] Check for any auth-related bugs
- [ ] Monitor user registrations
- [ ] Test manual scenarios

### Ongoing - Monthly
- [ ] Review Firebase usage/costs
- [ ] Update dependencies (npm update)
- [ ] Backup MongoDB regularly
- [ ] Review security logs

---

## Troubleshooting Quick Reference

### Issue: "Firebase is not initialized"
- [ ] Check VITE_FIREBASE_API_KEY in `.env`
- [ ] Restart frontend dev server
- [ ] Clear browser cache

### Issue: "Invalid Firebase token"
- [ ] Verify serviceAccountKey.json exists
- [ ] Verify Firebase project ID matches
- [ ] Check backend logs for specific error

### Issue: "User already exists"
- [ ] This is normal for duplicate emails
- [ ] Use different email for testing
- [ ] Or clear database and start fresh

### Issue: Google popup doesn't appear
- [ ] Ensure Google enabled in Firebase
- [ ] Check Firefox/Safari browser privacy settings
- [ ] Verify domain authorized in Firebase Console

### Issue: Cannot find serviceAccountKey.json
- [ ] Must use environment variable in production
- [ ] File cannot be committed to GitHub
- [ ] Deploy FIREBASE_SERVICE_ACCOUNT_JSON as env var

---

## Success Criteria

### Local Development ✅
- [ ] Frontend starts without errors
- [ ] Backend starts without errors
- [ ] Can register with email/password
- [ ] Can login with email/password
- [ ] Can sign in with Google
- [ ] "Browse Opportunities" works without login
- [ ] User data appears in MongoDB with firebaseUid

### Production Deployment ✅
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Can register at production URL
- [ ] Can login at production URL
- [ ] Can Google sign-in at production URL
- [ ] No errors in production logs
- [ ] Firebase Console shows authentication events

---

## Final Checklist

- [ ] All phases completed (1-11)
- [ ] All testing passed
- [ ] All data correctly in MongoDB
- [ ] Production deployment verified
- [ ] Monitoring in place
- [ ] Documentation reviewed
- [ ] Team briefed on changes
- [ ] Backup procedure tested
- [ ] Rollback plan documented
- [ ] Support guides available

---

## 🎉 You're Ready!

You have successfully implemented Firebase Auth hybrid authentication. Your system now provides:

✅ Email/password authentication (Firebase)
✅ Google Sign-in/Sign-up (Firebase)
✅ User profile management (MongoDB)
✅ Opportunity management (your backend)
✅ M-Pesa integration (your backend)
✅ Secure token handling (JWT)

**Estimated Time Summary:**
- Planning: 10 min
- Firebase setup: 15 min
- Frontend config: 10 min
- Backend config: 10 min
- Local testing: 20 min
- Scenarios: 10 min
- Error check: 5 min
- Git: 5 min
- Production prep: 15 min
- Deployment: 30 min
- **TOTAL: ~2 hours**

---

## Need Help?

Refer to:
- `QUICK_START_FIREBASE.md` for quick reference
- `FIREBASE_SETUP.md` for frontend details
- `FIREBASE_SETUP_BACKEND.md` for backend details
- `DEPLOYMENT_GUIDE.md` for production issues
- `IMPLEMENTATION_SUMMARY.md` for architecture details

**Let's go! Start at Phase 1 (Planning) and work through each phase.** 🚀

---

**Last Updated**: February 12, 2026
**Status**: Ready for Production
