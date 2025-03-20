import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      toast.error('Error loading profile');
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const updates = {
        id: user.id,
        display_name: displayName,
        avatar_url: avatarUrl,
        bio: bio,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-sepia-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="vintage-text text-3xl mb-6">Your Profile</h2>
        <form onSubmit={updateProfile} className="space-y-6">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-sepia-700"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              className="input-field mt-1"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="avatarUrl"
              className="block text-sm font-medium text-sepia-700"
            >
              Avatar URL
            </label>
            <input
              id="avatarUrl"
              type="url"
              className="input-field mt-1"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
            {avatarUrl && (
              <div className="mt-2">
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-sepia-200"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://via.placeholder.com/80?text=Avatar';
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-sepia-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              className="input-field mt-1"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center text-sm text-sepia-600"
      >
        <p>Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
}