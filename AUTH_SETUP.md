# Authentication Setup

This app now uses Supabase for authentication. Here's what has been set up:

## Features Implemented

1. **User Registration**: Users can create accounts with email and password
2. **User Login**: Users can sign in with their credentials
3. **Session Management**: Automatic session handling with persistent storage
4. **Sign Out**: Users can securely sign out from the app
5. **Protected Routes**: Authenticated and unauthenticated route groups

## Files Modified

- `utils/supabaseClient.ts` - Configured Supabase client with AsyncStorage
- `hooks/useAuth.tsx` - Complete authentication context with Supabase integration
- `app/(unauthenticated)/login.tsx` - Real login functionality
- `app/(unauthenticated)/register.tsx` - User registration with email confirmation
- `app/(authenticated)/(tabs)/profile.tsx` - Display user info and sign out
- `.env` - Supabase project credentials

## How to Test

1. **Start the app**: `npm start`
2. **Register**: Create a new account with a valid email
3. **Check email**: Look for a confirmation email from Supabase
4. **Login**: Use your credentials to sign in
5. **Profile**: View your profile information
6. **Sign Out**: Test the sign out functionality

## Database Setup Needed

Since the MCP server is in read-only mode, you'll need to manually set up the user profiles table in your Supabase dashboard:

```sql
-- Create a table for user profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create a function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create a profile when a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## Next Steps

1. Run the SQL above in your Supabase SQL editor
2. Configure email templates in Supabase Auth settings
3. Test the full authentication flow
4. Customize the user profile features as needed

## Supabase Auth Settings

In your Supabase dashboard, make sure to:

- Enable email confirmation if desired
- Set up proper redirect URLs for your app
- Configure email templates
- Set password requirements
