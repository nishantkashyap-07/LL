# Admin Credentials

## Admin Account

**Email:** livinleaseuser@gmail.com  
**Password:** hereiam1234

## Admin Access

When you log in with the above credentials, you will automatically have admin privileges and access to:

- `/admin` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/vehicles` - Vehicle Management
- `/admin/sellers` - Seller Verification
- `/admin/bookings` - Booking Management
- `/admin/payments` - Payment Verification
- `/admin/reports` - Reports & Complaints
- `/admin/analytics` - Platform Analytics
- `/admin/settings` - Admin Settings

## How It Works

The admin role is automatically assigned based on the email address:
- When signing up with `livinleaseuser@gmail.com`, the account is automatically set as admin
- When logging in with this email, admin privileges are automatically granted
- If the account already exists, it will be updated to admin status on login

## Testing Admin Features

1. Go to `http://localhost:3001/auth`
2. Sign up or log in with the admin credentials
3. You'll see "Admin Panel" option in the user menu
4. Click to access the full admin dashboard

## Security Note

⚠️ **Important:** This file contains sensitive credentials. Make sure to:
- Add `ADMIN_CREDENTIALS.md` to `.gitignore`
- Never commit this file to version control
- Change the password in production
- Use environment variables for admin email in production

## Production Deployment

For production, consider:
1. Using Firebase Admin SDK for role management
2. Storing admin emails in environment variables
3. Implementing proper admin invitation system
4. Adding two-factor authentication for admin accounts
