import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Rewards {
  id: string;
  user_id: string;
  token_balance: number;
  lifetime_tokens: number;
  achievements: {
    [key: string]: {
      name: string;
      description: string;
      date_earned: string;
      icon?: string;
    };
  };
  unlocked_features: {
    [key: string]: boolean;
  };
}

export default function RewardsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<Rewards | null>(null);

  useEffect(() => {
    if (user) {
      fetchRewards();
    }
  }, [user]);

  async function fetchRewards() {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setRewards(data);
    } catch (error) {
      toast.error('Error loading rewards');
    } finally {
      setLoading(false);
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
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="vintage-text text-4xl mb-2">Your Time Keeper Rewards</h1>
        <p className="text-sepia-700">Preserving memories, earning treasures</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Token Balance Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="vintage-text text-2xl mb-4">Time Tokens</h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-sepia-600">Current Balance</p>
              <p className="text-3xl font-bold text-sepia-800">
                {rewards?.token_balance || 0}
              </p>
            </div>
            <div>
              <p className="text-sm text-sepia-600">Lifetime Earned</p>
              <p className="text-3xl font-bold text-sepia-800">
                {rewards?.lifetime_tokens || 0}
              </p>
            </div>
          </div>
          <div className="bg-sepia-50 rounded-lg p-4">
            <p className="text-sm text-sepia-700">
              Earn more tokens by creating and sharing time capsules
            </p>
          </div>
        </motion.div>

        {/* Features Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h2 className="vintage-text text-2xl mb-4">Unlocked Features</h2>
          <ul className="space-y-3">
            {rewards?.unlocked_features && Object.entries(rewards.unlocked_features).map(([feature, isUnlocked]) => (
              <li
                key={feature}
                className={`flex items-center p-2 rounded-lg ${
                  isUnlocked ? 'bg-sepia-50' : 'bg-gray-50'
                }`}
              >
                <span className={`mr-2 text-xl ${
                  isUnlocked ? 'text-sepia-700' : 'text-gray-400'
                }`}>
                  {isUnlocked ? '✓' : '○'}
                </span>
                <span className={isUnlocked ? 'text-sepia-900' : 'text-gray-500'}>
                  {feature.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <h2 className="vintage-text text-2xl mb-6">Achievements</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {rewards?.achievements && Object.entries(rewards.achievements).map(([id, achievement]) => (
            <div
              key={id}
              className="card bg-sepia-50 border-sepia-200"
            >
              <div className="flex items-center mb-3">
                {achievement.icon ? (
                  <img
                    src={achievement.icon}
                    alt=""
                    className="w-8 h-8 mr-3"
                  />
                ) : (
                  <span className="text-2xl mr-3">🏆</span>
                )}
                <h3 className="vintage-text text-lg">{achievement.name}</h3>
              </div>
              <p className="text-sm text-sepia-700 mb-2">
                {achievement.description}
              </p>
              <p className="text-xs text-sepia-600">
                Earned on {new Date(achievement.date_earned).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Progress Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 card bg-sepia-50"
      >
        <h2 className="vintage-text text-xl mb-3">Tips for Earning More</h2>
        <ul className="space-y-2 text-sm text-sepia-700">
          <li>• Create meaningful time capsules to earn tokens</li>
          <li>• Share capsules with loved ones for bonus rewards</li>
          <li>• Complete your profile to unlock special achievements</li>
          <li>• Maintain a streak of regular capsule creation</li>
        </ul>
      </motion.div>
    </div>
  );
}