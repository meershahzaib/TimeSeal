/*
  # TimeSeal Initial Schema

  1. New Tables
    - `profiles`
      - Extended user profile information
      - Linked to auth.users
      - Stores display name and preferences
    
    - `capsules`
      - Main time capsule container
      - Stores metadata, release date, and encryption details
      - Links to creator and recipients
    
    - `capsule_contents`
      - Individual items within capsules
      - Supports multiple content types (text, images, audio, etc.)
      - Stores encrypted content and metadata
    
    - `capsule_recipients`
      - Manages access control for capsules
      - Supports multiple recipients per capsule
      - Handles inheritance and contingency access
    
    - `rewards`
      - Tracks user rewards and achievements
      - Stores token balances and unlocked features
    
  2. Security
    - RLS enabled on all tables
    - Policies for creator and recipient access
    - Temporal access controls based on release dates
*/

-- Profiles table for extended user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Time capsules table
CREATE TABLE IF NOT EXISTS capsules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  seal_date timestamptz DEFAULT now(),
  release_date timestamptz NOT NULL,
  encryption_key_hash text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sealed', 'released')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Capsule contents table
CREATE TABLE IF NOT EXISTS capsule_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  capsule_id uuid REFERENCES capsules(id) ON DELETE CASCADE NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('text', 'image', 'audio', 'video', 'document')),
  title text NOT NULL,
  description text,
  encrypted_content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Capsule recipients table
CREATE TABLE IF NOT EXISTS capsule_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  capsule_id uuid REFERENCES capsules(id) ON DELETE CASCADE NOT NULL,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email text,
  access_type text DEFAULT 'primary' CHECK (access_type IN ('primary', 'inheritance', 'contingency')),
  notification_preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT recipient_identifier CHECK (
    (recipient_id IS NOT NULL AND recipient_email IS NULL) OR
    (recipient_id IS NULL AND recipient_email IS NOT NULL)
  )
);

-- Rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token_balance integer DEFAULT 0,
  lifetime_tokens integer DEFAULT 0,
  achievements jsonb DEFAULT '{}'::jsonb,
  unlocked_features jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE capsules ENABLE ROW LEVEL SECURITY;
ALTER TABLE capsule_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE capsule_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Capsules policies
CREATE POLICY "Users can read capsules they created"
  ON capsules FOR SELECT
  TO authenticated
  USING (creator_id = auth.uid());

CREATE POLICY "Users can read capsules shared with them after release date"
  ON capsules FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM capsule_recipients
      WHERE capsule_id = capsules.id
      AND recipient_id = auth.uid()
      AND release_date <= now()
    )
  );

CREATE POLICY "Users can create capsules"
  ON capsules FOR INSERT
  TO authenticated
  WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Users can update their own draft capsules"
  ON capsules FOR UPDATE
  TO authenticated
  USING (creator_id = auth.uid() AND status = 'draft');

-- Capsule contents policies
CREATE POLICY "Users can read contents of accessible capsules"
  ON capsule_contents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM capsules
      WHERE id = capsule_contents.capsule_id
      AND (
        creator_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM capsule_recipients
          WHERE capsule_id = capsules.id
          AND recipient_id = auth.uid()
          AND release_date <= now()
        )
      )
    )
  );

CREATE POLICY "Users can manage contents of their draft capsules"
  ON capsule_contents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM capsules
      WHERE id = capsule_contents.capsule_id
      AND creator_id = auth.uid()
      AND status = 'draft'
    )
  );

-- Capsule recipients policies
CREATE POLICY "Users can read recipient lists of their capsules"
  ON capsule_recipients FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM capsules
      WHERE id = capsule_recipients.capsule_id
      AND creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage recipients of their draft capsules"
  ON capsule_recipients FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM capsules
      WHERE id = capsule_recipients.capsule_id
      AND creator_id = auth.uid()
      AND status = 'draft'
    )
  );

-- Rewards policies
CREATE POLICY "Users can read their own rewards"
  ON rewards FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_capsules_creator_id ON capsules(creator_id);
CREATE INDEX IF NOT EXISTS idx_capsules_release_date ON capsules(release_date);
CREATE INDEX IF NOT EXISTS idx_capsule_contents_capsule_id ON capsule_contents(capsule_id);
CREATE INDEX IF NOT EXISTS idx_capsule_recipients_capsule_id ON capsule_recipients(capsule_id);
CREATE INDEX IF NOT EXISTS idx_capsule_recipients_recipient_id ON capsule_recipients(recipient_id);
CREATE INDEX IF NOT EXISTS idx_rewards_user_id ON rewards(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capsules_updated_at
  BEFORE UPDATE ON capsules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capsule_contents_updated_at
  BEFORE UPDATE ON capsule_contents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_capsule_recipients_updated_at
  BEFORE UPDATE ON capsule_recipients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON rewards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();