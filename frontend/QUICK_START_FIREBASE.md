# Firebase Auth - Quick Start Guide

## For Already-Deployed Apps (Vercel + Railway)

This guide assumes you've already deployed your React frontend on **Vercel** and Express backend on **Railway**. The steps below will add Firebase Authentication to your production app.

⏱️ **Setup time:** 10–15 min (mostly copying values from Firebase Console to Vercel/Railway).

---

## 5-Minute Setup

### Step 1: Get Firebase Credentials (5 min)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** → Name: `industrial-attachment`
3. Go to **Authentication** → **Sign-in method**
4. Enable: **Email/Password** + **Google**
5. Create **Web App** and copy the config

### Step 2: Configure Frontend (.env)

Create `frontend/.env`:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Get Backend Firebase Key

1. Firebase Console → **Project Settings** → **Service Accounts**
2. Click **Generate New Private Key**
3. Save as `backend/src/config/serviceAccountKey.json`
4. Add to `.gitignore`: `src/config/serviceAccountKey.json`

### Step 4: Configure Vercel (Frontend)

1. Go to **Vercel Dashboard** → Select your project
2. **Settings** → **Environment Variables**
3. Add the following (from your Firebase config):
   - `VITE_FIREBASE_API_KEY=AIzaSyD_lmqHYrGYBi9EsmJc2enVApKYq6KnbJQ`
   - `VITE_FIREBASE_AUTH_DOMAIN=opportunityhub-ab3fe.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID=opportunityhub-ab3fe`
   - `VITE_FIREBASE_STORAGE_BUCKET=opportunityhub-ab3fe.firebasestorage.app`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID=207090492391`
   - `VITE_FIREBASE_APP_ID=1:207090492391:web:9a1e0d1125c206c490d342`
   - `VITE_API_URL=https://your-railway-backend.railway.app/api` (replace with your Railway backend URL)
4. Trigger a **Redeploy** (Deployments → Redeploy) to apply changes

### Step 5: Configure Railway (Backend)

1. Go to **Railway Dashboard** → Select your backend project
2. **Variables** tab:
   - Add your Firebase service account credentials (option: paste JSON as raw or create `SERVICE_ACCOUNT_JSON` variable)
   - Add any backend `.env` vars (`MONGODB_URI`, `JWT_SECRET`, etc.)
3. Ensure start command loads the service account key (see Step 5b below)
4. Railway auto-redeploys on changes

#### Step 5b: Railway Service Account Key Setup

**Option A (Recommended): Store as Railway Secret**
- Download `serviceAccountKey.json` from Firebase Console → Project Settings → Service Accounts → Generate New Private Key
- Copy the JSON contents and create a Railway secret variable: `SERVICE_ACCOUNT_JSON` = (paste the entire JSON)
- Modify `backend/src/config/firebase.js` to read from the env var
- Add this helper to parse it at startup

**Option B: Local File**
- Manual upload of `serviceAccountKey.json` to Railway via CLI or dashboard file manager

### Step 6: Firebase Console - Add Authorized Domains

1. Go to **Firebase Console** → **Authentication** → **Authorized domains**
2. Add:
   - Your Vercel frontend domain (e.g., `your-app.vercel.app`)
   - Any custom domain (e.g., `app.hamanmatage.com`)
   - Keep `localhost` for local testing

### Step 7: Test Deployment

Open your Vercel frontend URL:
- Click `/login` → Try email/password
- Click **"Sign in with Google"**
- Click **"Create Account"** in register
- Try **"Browse Opportunities"** button
- Check browser DevTools → Network tab & Console for errors
- Check Railway logs (Logs tab) for backend errors

---

## Files Already Updated (In Your Repo)

### Frontend
- ✅ Firebase SDK in `package.json`
- ✅ `src/config/firebaseConfig.js` (initializes Firebase client SDK)
- ✅ `src/context/authStore.js` (Zustand/auth state)
- ✅ `src/pages/Login.jsx` (email/password + Google sign-in)
- ✅ `src/pages/Register.jsx` (email/password + Google sign-up)
- ✅ `src/App.jsx` (auth initialization)
- ✅ `frontend/.env` (local development only)

### Backend
- ✅ Firebase Admin SDK in `package.json`
- ✅ `src/config/firebase.js` (initializes Firebase Admin; reads `SERVICE_ACCOUNT_JSON` env var)
- ✅ `src/middleware/firebaseAuth.js` (verifies Firebase tokens)
- ✅ `src/models/User.js` (user schema with `firebaseUid`)
- ✅ `src/controllers/authController.js` (Firebase endpoints)
- ✅ `src/routes/auth.js` (POST `/firebase-login`, `/firebase-register` routes)
- ✅ `backend/.gitignore` (ignores `serviceAccountKey.json`)

---

## API Endpoints (New)

### Registration with Email/Password
```bash
POST /api/auth/firebase-register
Content-Type: application/json

{
  "firebaseToken": "eyJhbGci...",
  "email": "user@example.com",
  "uid": "firebase-uid-123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "254712345678"
}

Response:
{
  "success": true,
  "token": "your-session-jwt",
  "user": {
    "id": "mongodb-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "254712345678"
  }
}
```

### Login with Email/Password
```bash
POST /api/auth/firebase-login
Content-Type: application/json

{
  "firebaseToken": "eyJhbGci...",
  "email": "user@example.com",
  "uid": "firebase-uid-123"
}

Response:
{
  "success": true,
  "token": "your-session-jwt",
  "user": { ... }
}
```

### Google Sign-In (same endpoint as login)
```bash
POST /api/auth/firebase-login
{
  "firebaseToken": "eyJhbGci...",
  "email": "user@gmail.com",
  "uid": "firebase-uid-123",
  "displayName": "John Doe"
}
```

---

## Auth Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           Frontend (React)                      │
│  1. User enters email/password                  │
│  2. Calls Firebase.auth().signInWithEmailAndPassword()
│  3. Firebase verifies & returns ID token        │
│  4. Sends token to backend                      │
└────────────────────┬────────────────────────────┘
                     │ Firebase ID Token
                     ▼
┌─────────────────────────────────────────────────┐
│     Backend (Express)                           │
│  1. POST /auth/firebase-login                   │
│  2. admin.auth().verifyIdToken(token)          │
│  3. Find/Create user in MongoDB                │
│  4. Generate session JWT                       │
│  5. Return JWT + user data                     │
└────────────────────┬────────────────────────────┘
                     │ Session JWT
                     ▼
┌─────────────────────────────────────────────────┐
│           Frontend (React)                      │
│  1. Save JWT to localStorage                   │
│  2. Save user data                             │
│  3. Redirect to dashboard                      │
└─────────────────────────────────────────────────┘
```

---

## User Data in MongoDB

### Before Firebase
```javascript
{
  email: "user@example.com",
  password: "hashed_password_here", // hashed with bcrypt
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "254712345678",
  isVerified: false
}
```

### After Firebase
```javascript
{
  email: "user@example.com",
  password: null, // Firebase users don't have password
  firebaseUid: "abc123xyz...", // Firebase user ID
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "254712345678",
  isVerified: true // Firebase auto-verifies
}
```

---

## Troubleshooting

### Error: "No token provided"
- Check Firebase credentials in Vercel environment variables
- Verify `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_PROJECT_ID` are set
- Redeploy Vercel (Deployments → Redeploy)

### Error: "Invalid Firebase token" or 401 on API calls
- Check Railway backend has `SERVICE_ACCOUNT_JSON` env var set
- Verify `backend/src/config/firebase.js` reads from `process.env.SERVICE_ACCOUNT_JSON`
- Check Firebase project IDs match (frontend ≠ different backend project)
- Check Railway logs for initialization errors

### Error: "Unauthorized domain"
- Go to Firebase Console → Authentication → Authorized domains
- Add your Vercel domain (e.g., `your-app.vercel.app`)
- Wait 5 minutes for propagation

### Error: "User already exists"
- Register with a different email address
- This is expected for duplicate emails

### Google Sign-in doesn't work
- Enable Google in Firebase Console → Authentication → Sign-in methods
- Add your Vercel domain and custom domain to Firebase **Authorized domains**
- Check Google Cloud Console → APIs & Services → OAuth consent screen (app must be published)
- Clear browser cache and cookies

---

## What's Different?

| Feature | Before | After |
|---------|--------|-------|
| Password hashing | Manual bcryptjs | Firebase handles it |
| Email verification | Manual token | Firebase can send auto |
| Password reset | Manual implementation | Firebase provides it |
| Google Sign-in | Not available | ✅ Works now |
| Security | Manual implementation | ✅ Firebase best practices |
| Database | MongoDB only | MongoDB + Firebase |

---

## Next Steps (Already Deployed)

1. ✅ Configure Firebase Project with your web app
2. ✅ Generated Firebase credentials (service account key)
3. ✅ Deployed frontend to Vercel
4. ✅ Deployed backend to Railway
5. 🔜 Add Firebase env vars to Vercel (Step 4)
6. 🔜 Add Firebase service account to Railway (Step 5)
7. 🔜 Update Firebase authorized domains (Step 6)
8. 🔜 Test production deployment
9. 🎉 Production authentication ready

---

## Environment Variables Reference

### Vercel Frontend (Steps 4)
Copy these from your Firebase web app config to Vercel **Settings → Environment Variables**:

| Variable | Firebase Config Key | Example Value |
|----------|-------------------|----------------|
| `VITE_FIREBASE_API_KEY` | `apiKey` | `AIzaSyD_lmqHYrGYBi9EsmJc2enVApKYq6KnbJQ` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` | `opportunityhub-ab3fe.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` | `opportunityhub-ab3fe` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` | `opportunityhub-ab3fe.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` | `207090492391` |
| `VITE_FIREBASE_APP_ID` | `appId` | `1:207090492391:web:9a1e0d1125c206c490d342` |
| `VITE_API_URL` | (Your Railway backend) | `https://your-railway-app.railway.app/api` |

### Railway Backend (Step 5)
1. Create a variable `SERVICE_ACCOUNT_JSON` with the entire JSON from Firebase **Project Settings → Service Accounts → Private Key**
2. Modify `backend/src/config/firebase.js` to parse it (see Step 5b)
3. Add other `.env` vars as needed: `MONGODB_URI`, `JWT_SECRET`, etc.

---

If you want to test locally before pushing to production:

```bash
# Create frontend/.env with your Firebase config
cd frontend
npm install
npm run dev

# In another terminal, create backend/.env with service account key copied into src/config/
cd backend
npm install
npm run dev
```

Then open `http://localhost:5173/` and test login/register.

---

- **Setup Help**: See `FIREBASE_SETUP.md`
- **Full Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Errors**: Check console logs in browser and terminal

**Questions? Check the Firebase documentation: https://firebase.google.com/docs/auth**
