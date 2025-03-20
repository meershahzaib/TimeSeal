import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface Capsule {
  id: string;
  title: string;
  description: string | null;
  seal_date: string | null;
  release_date: string;
  status: 'draft' | 'sealed' | 'released';
  created_at: string;
}

export default function MyCapsulesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'sealed' | 'released'>('all');

  useEffect(() => {
    if (user) {
      fetchCapsules();
    }
  }, [user]);

  async function fetchCapsules() {
    try {
      const { data, error } = await supabase
        .from('capsules')
        .select('*')
        .eq('creator_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCapsules(data || []);
    } catch (error) {
      toast.error('Error loading capsules');
    } finally {
      setLoading(false);
    }
  }

  const filteredCapsules = filter === 'all' 
    ? capsules 
    : capsules.filter(capsule => capsule.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-sepia-100 text-sepia-700';
      case 'sealed':
        return 'bg-sepia-200 text-sepia-800';
      case 'released':
        return 'bg-sepia-300 text-sepia-900';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

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
        <h1 className="vintage-text text-4xl mb-2">My Time Capsules</h1>
        <p className="text-sepia-700">Your preserved memories across time</p>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mb-8 space-x-4"
      >
        {(['all', 'draft', 'sealed', 'released'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              filter === status
                ? 'bg-sepia-700 text-white'
                : 'bg-sepia-100 text-sepia-700 hover:bg-sepia-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Capsules Grid */}
      <div className="grid gap-6">
        {filteredCapsules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-sepia-600 text-lg">
              No {filter === 'all' ? '' : filter} capsules found
            </p>
          </motion.div>
        ) : (
          filteredCapsules.map((capsule, index) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="vintage-text text-2xl mb-2">{capsule.title}</h2>
                  {capsule.description && (
                    <p className="text-sepia-700 mb-3">{capsule.description}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(capsule.status)}`}>
                  {capsule.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-sepia-600">
                <div>
                  <p className="font-medium">Created</p>
                  <p>{format(new Date(capsule.created_at), 'PPP')}</p>
                </div>
                <div>
                  <p className="font-medium">Release Date</p>
                  <p>{format(new Date(capsule.release_date), 'PPP')}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {capsule.status === 'draft' && (
                  <>
                    <button className="btn-secondary">Edit</button>
                    <button className="btn-primary">Seal Capsule</button>
                  </>
                )}
                {capsule.status === 'sealed' && (
                  <button className="btn-secondary" disabled>
                    Sealed until {format(new Date(capsule.release_date), 'PP')}
                  </button>
                )}
                {capsule.status === 'released' && (
                  <button className="btn-primary">View Contents</button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create New Capsule Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <button
          onClick={() => window.location.href = '/create-capsule'}
          className="btn-primary"
        >
          Create New Capsule
        </button>
      </motion.div>
    </div>
  );
}