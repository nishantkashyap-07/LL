# Firebase Setup Instructions

## Issue: "Missing or insufficient permissions"

This error occurs because your Firestore database and Storage don't have proper security rules configured.

## Step 1: Configure Firestore Security Rules

1. Go to Firebase Console: https://console.firebase.google.com/project/livinlease/firestore/rules

2. Replace the existing rules with the content from `firestore.rules` file in this project

3. Click "Publish" to apply the rules

## Step 2: Configure Storage Security Rules

1. Go to Firebase Console: https://console.firebase.google.com/project/livinlease/storage/rules

2. Replace the existing rules with the content from `storage.rules` file in this project

3. Click "Publish" to apply the rules

## Step 3: Enable Authentication Methods

1. Go to: https://console.firebase.google.com/project/livinlease/authentication/providers

2. Enable these sign-in methods:
   - Email/Password ✓
   - Google ✓

## Step 4: Add Authorized Domains

1. Go to: https://console.firebase.google.com/project/livinlease/authentication/settings

2. Scroll to "Authorized domains"

3. Add these domains:
   - `ll-4tkv.vercel.app`
   - `ll-4tkv-yq7qpvlei-nishant-kashyaps-projects-1f95baa6.vercel.app`
   - `localhost` (for local development)

## Step 5: Create Initial Admin User

After setting up the rules, you need to create your admin account:

1. Go to your deployed site: https://ll-4tkv.vercel.app/signup

2. Sign up with email: `livinleaseuser@gmail.com`

3. After signup, go to Firebase Console: https://console.firebase.google.com/project/livinlease/firestore/data

4. Find the `users` collection and locate your user document

5. Edit the document and set `isAdmin: true`

## Step 6: Test Login

1. Go to: https://ll-4tkv.vercel.app/login

2. Login with your admin credentials

3. You should now have full access to the admin dashboard

## What These Rules Do

### Firestore Rules:
- Allow anyone to read public data (vehicles, user profiles, reviews)
- Require authentication for creating/updating data
- Restrict admin operations to users with `isAdmin: true`
- Restrict seller operations to users with `isSeller: true`
- Users can only modify their own data

### Storage Rules:
- Allow public read access to vehicle and profile images
- Require authentication for uploads
- Limit file size to 5MB
- Validate image file types
- Users can only delete their own files

## Troubleshooting

If you still see permission errors:

1. Make sure you published the rules in Firebase Console
2. Wait 1-2 minutes for rules to propagate
3. Clear browser cache and try again
4. Check browser console for specific error messages
5. Verify your user document has the correct `isAdmin` or `isSeller` field

## Security Notes

- These rules are production-ready and secure
- Admin access is controlled by the `isAdmin` field in user documents
- Only admins can modify admin status
- All sensitive operations require authentication
- File uploads are validated for type and size
