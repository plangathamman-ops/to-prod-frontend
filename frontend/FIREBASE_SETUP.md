# Firebase Auth Integration Setup Guide

This guide walks you through setting up Firebase Authentication for your project.

## Table of Contents

1. [Create Firebase Project](#create-firebase-project)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Testing](#testing)

---

## Create Firebase Project

### Step 1: Go to Firebase Console

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `industrial-attachment` (or your preference)
4. Accept terms and click **"Continue"**
5. Disable Google Analytics (optional) and click **"Create project"**

### Step 2: Enable Authentication Methods

1. In the Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **Email/Password**:
   - Enable **Email/Password**
   - Enable **Email link (passwordless sign-in)** (optional)
   - Click **Save**

3. Click **Google**:
   - Enable **Google**
   - Add your support email
   - Click **Save**

### Step 3: Get Web App Credentials

1. Click the **Web icon** (</>) to create a web app
2. App nickname: `industrial-attachment-frontend`
3. Check **Firebase Hosting** (optional)
4. Click **Register app**
5. Copy the Firebase config (you'll need this for the frontend)

**Keep this config safe!** It looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "12345678",
  appId: "1:12345678:web:abc123def456"
};
```

---

## Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

This will install Firebase SDK (already added to package.json).

### Step 2: Add Firebase Credentials to Environment

1. Create `.env` file in `frontend/` directory (copy from `.env.example`)
2. Add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=12345678
VITE_FIREBASE_APP_ID=1:12345678:web:abc123def456
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Test Frontend

```bash
npm run dev
```

Visit `http://localhost:5173/login`:
- Try **Email/Password login**
- Try **Google Sign-in** (should show popup)
- Try **Register** with email/password

---

## Backend Setup

### Step 1: Get Firebase Service Account Key

1. In Firebase Console, go to **Project Settings** (gear icon) → **Service Accounts**
2. Click **Generate New Private Key**
3. A JSON file will download - **keep this safe!**

### Step 2: Add Firebase Admin SDK to Backend

Already added firebase-admin to `package.json`. Install dependencies:

```bash
cd backend
npm install
```

### Step 3: Set Up Firebase Credentials

**Option A: Environment Variable (Production)**

1. Convert the service account JSON to a string
2. Set as environment variable:

```bash
export FIREBASE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
```

**Option B: File (Development)**

1. Save the downloaded service account JSON as:
   ```
   backend/src/config/serviceAccountKey.json
   ```
2. Add to `.gitignore`:
   ```
   # Firebase
   src/config/serviceAccountKey.json
   ```

### Step 4: Update Backend Environment

Copy `.env.example` to `.env` and update:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_EXPIRE=7d

# Firebase (if using file method, leave this commented out)
# FIREBASE_SERVICE_ACCOUNT_JSON=...
```

### Step 5: Test Backend

```bash
npm run dev
```

The server should start without Firebase errors.

---

## Testing

### Test Complete Flow

1. **Open Frontend**: `http://localhost:5173/`

2. **Test Email/Password Registration**:
   - Go to `/register`
   - Fill form with:
     - First Name: John
     - Last Name: Doe
     - Email: john@example.com
     - Phone: 254712345678
     - Password: Password123
   - Click **Create Account**
   - Should redirect to dashboard

3. **Test Google Sign-in**:
   - Go to `/login`
   - Click **Sign in with Google**
   - Select your Google account
   - Should redirect to dashboard

4. **Test Login**:
   - Logout (top right menu)
   - Go to `/login`
   - Enter email and password
   - Click **Sign in**
   - Should redirect to dashboard

5. **Test Browse Opportunities**:
   - From login page, click **Browse Opportunities**
   - Should show opportunities without logging in

### Check User Data in MongoDB

Users created via Firebase should appear in your MongoDB with:

```javascript
{
  email: "john@example.com",
  firebaseUid: "abc123xyz...",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "254712345678",
  isVerified: true
}
```

---

## Troubleshooting

### Firebase Config Not Loading

**Error**: `Firebase: Error (auth/invalid-api-key)`

**Solution**: Check that environment variables are correctly set in `.env`

```bash
# Frontend
echo $VITE_FIREBASE_API_KEY
```

### Firebase Admin SDK Error

**Error**: `Firebase Admin SDK could not be initialized`

**Solution**: Check service account JSON is valid:

```bash
# Backend
node -e "console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))"
```

### Token Verification Failed

**Error**: `Invalid Firebase token`

**Solution**: 
- Ensure backend Firebase is correctly initialized
- Check serviceAccountKey.json path
- Verify tokens are being sent correctly from frontend

### User Already Exists Error

**Solution**: This is expected if you register with the same email twice. Create a new user with different email.

---

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `serviceAccountKey.json` to Git
- Never expose Firebase API key in production (it's okay, it's public)
- Use environment variables for sensitive data
- Enable Firebase security rules in production
- Implement rate limiting on auth endpoints

---

## Next Steps

1. **Add Email Verification**: Firebase can send verification emails
2. **Add Password Reset**: Implement Firebase password reset
3. **Add Additional Providers**: Twitter, GitHub, Facebook, etc.
4. **Implement Security Rules**: Set up Firestore rules
5. **Enable Two-Factor Authentication**: Add 2FA for extra security

---

## Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase Web SDK](https://firebase.google.com/docs/web/setup)
