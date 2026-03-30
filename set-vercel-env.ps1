# Script to set Vercel environment variables without newlines

# Remove old variables
Write-Host "Removing old environment variables..."
vercel env rm REACT_APP_FIREBASE_API_KEY production --yes 2>$null
vercel env rm REACT_APP_FIREBASE_AUTH_DOMAIN production --yes 2>$null
vercel env rm REACT_APP_FIREBASE_PROJECT_ID production --yes 2>$null
vercel env rm REACT_APP_FIREBASE_STORAGE_BUCKET production --yes 2>$null
vercel env rm REACT_APP_FIREBASE_MESSAGING_SENDER_ID production --yes 2>$null
vercel env rm REACT_APP_FIREBASE_APP_ID production --yes 2>$null
vercel env rm REACT_APP_FIREBASE_MEASUREMENT_ID production --yes 2>$null
vercel env rm REACT_APP_WHATSAPP_NUMBER production --yes 2>$null

Write-Host "`nAdding environment variables..."

# Firebase
Write-Output "AIzaSyAvjoMzgjEImLDtKA-LMR8iYRklC3MhuvA" | vercel env add REACT_APP_FIREBASE_API_KEY production
Write-Output "livinlease.firebaseapp.com" | vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN production
Write-Output "livinlease" | vercel env add REACT_APP_FIREBASE_PROJECT_ID production
Write-Output "livinlease.firebasestorage.app" | vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET production
Write-Output "610905276136" | vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID production
Write-Output "1:610905276136:web:9d3279c4a553071f6ed35d" | vercel env add REACT_APP_FIREBASE_APP_ID production
Write-Output "G-850XYBXTRY" | vercel env add REACT_APP_FIREBASE_MEASUREMENT_ID production

# WhatsApp
Write-Output "+919863201727" | vercel env add REACT_APP_WHATSAPP_NUMBER production

Write-Host "`nAll environment variables set successfully!"
Write-Host "Now run: vercel --prod"
