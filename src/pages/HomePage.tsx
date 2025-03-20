import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Journey from '../components/Journey';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-figtree-500 text-gray-900 mb-6">
              Preserve Your Memories in Time
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create digital time capsules to safeguard your precious moments for future generations.
              Share your legacy with loved ones when the time is right.
            </p>
            {user ? (
              <Link to="/create-capsule" className="btn-primary text-lg px-8 py-3">
                Create Your Time Capsule
              </Link>
            ) : (
              <Link to="/register" className=" btn-primary text-lg px-8 py-3">
                Start Your Journey
              </Link>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            <div className="card">
              <h3 className=" text-xl mb-4 font-figtree-500">Secure Preservation</h3>
              <p className="text-gray-600">
                Your memories are encrypted and safely stored until their designated release date.
              </p>
            </div>

            <div className="card">
              <h3 className="font-figtree-500 text-xl mb-4">Earn Rewards</h3>
              <p className="text-gray-600">
                Gain tokens and unlock special features as you preserve your legacy.
              </p>
            </div>

            <div className="card">
              <h3 className="font-figtree-500 text-xl mb-4">Share with Love</h3>
              <p className="text-gray-600">
                Pass down your stories to future generations with thoughtful inheritance controls.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <Journey />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}