# Vercel Environment Variables Setup

## Important: Complete These Steps for Login to Work

Your site is deployed at: **https://ll-4tkv.vercel.app**

## CRITICAL: Fix Firebase Authorized Domains First

The error "Illegal url for new iframe" means your Vercel domain is not authorized in Firebase.

### Add Vercel Domain to Firebase:

1. Go to: https://console.firebase.google.com/project/livinlease/authentication/settings
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Add these domains:
   - `ll-4tkv.vercel.app`
   - `ll-4tkv-15uol1hag-nishant-kashyaps-projects-1f95baa6.vercel.app`
5. Click "Add"

## Step 2: Add Environment Variables to Vercel

## Steps to Add Environment Variables

1. Go to: https://vercel.com/nishant-kashyaps-projects-1f95baa6/ll-4tkv/settings/environment-variables

2. Add these variables for **Production** environment:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyAvjoMzgjEImLDtKA-LMR8iYRklC3MhuvA
REACT_APP_FIREBASE_AUTH_DOMAIN=livinlease.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=livinlease
REACT_APP_FIREBASE_STORAGE_BUCKET=livinlease.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=610905276136
REACT_APP_FIREBASE_APP_ID=1:610905276136:web:9d3279c4a553071f6ed35d
REACT_APP_FIREBASE_MEASUREMENT_ID=G-850XYBXTRY
REACT_APP_APP_NAME=LivinLease
REACT_APP_APP_VERSION=2.0.0
REACT_APP_ENVIRONMENT=production
REACT_APP_WHATSAPP_NUMBER=+919876543210
REACT_APP_SUPPORT_EMAIL=support@livinlease.com
```

3. After adding all variables, click "Redeploy" in Vercel dashboard

## Alternative: Use Vercel CLI

Run these commands one by one:

```bash
vercel env add REACT_APP_FIREBASE_API_KEY production
# Paste: AIzaSyAvjoMzgjEImLDtKA-LMR8iYRklC3MhuvA

vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN production
# Paste: livinlease.firebaseapp.com

vercel env add REACT_APP_FIREBASE_PROJECT_ID production
# Paste: livinlease

vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET production
# Paste: livinlease.firebasestorage.app

vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID production
# Paste: 610905276136

vercel env add REACT_APP_FIREBASE_APP_ID production
# Paste: 1:610905276136:web:9d3279c4a553071f6ed35d

vercel env add REACT_APP_FIREBASE_MEASUREMENT_ID production
# Paste: G-850XYBXTRY

vercel env add REACT_APP_ENVIRONMENT production
# Paste: production
```

Then redeploy:
```bash
vercel --prod
```

## Verify Login Works

After redeployment, test login at: https://ll-4tkv.vercel.app/login

Admin credentials:
- Email: livinleaseuser@gmail.com
- Password: [Your admin password]
