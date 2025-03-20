import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

export default function CreateCapsulePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Handle file uploads
      console.log(acceptedFiles);
    },
    accept: {
      'image/*': [],
      'audio/*': [],
      'video/*': [],
      'application/pdf': []
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('capsules').insert({
        creator_id: user.id,
        title,
        description,
        release_date: releaseDate,
        encryption_key_hash: 'temporary_hash', // In production, implement proper encryption
        status: 'draft'
      });

      if (error) throw error;
      toast.success('Time capsule created successfully!');
      navigate('/my-capsules');
    } catch (error) {
      toast.error('Failed to create time capsule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="vintage-text text-3xl mb-6">Create New Time Capsule</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-sepia-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              className="input-field mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-sepia-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="input-field mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="releaseDate" className="block text-sm font-medium text-sepia-700">
              Release Date
            </label>
            <input
              id="releaseDate"
              type="datetime-local"
              required
              className="input-field mt-1"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sepia-700 mb-2">
              Add Contents
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-sepia-300 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-sepia-500 bg-sepia-50' : ''
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-sepia-700">
                {isDragActive
                  ? 'Drop your files here'
                  : 'Drag and drop files here, or click to select files'}
              </p>
              <p className="text-sm text-sepia-600 mt-2">
                Supports images, audio, video, and PDF files
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/my-capsules')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Capsule'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}