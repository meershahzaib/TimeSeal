import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PlusCircleIcon,
  ArchiveBoxIcon,
  GiftIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const NavLinks = () => (
    <>
      {user ? (
        <>
          <Link to="/create-capsule" className="nav-link">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Create Capsule</span>
          </Link>
          <Link to="/my-capsules" className="nav-link">
            <ArchiveBoxIcon className="w-5 h-5" />
            <span>My Capsules</span>
          </Link>
          <Link to="/rewards" className="nav-link">
            <GiftIcon className="w-5 h-5" />
            <span>Rewards</span>
          </Link>
          <Link to="/profile" className="nav-link">
            <UserCircleIcon className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <button onClick={handleSignOut} className="nav-link">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Login</span>
          </Link>
          <Link to="/register" className="nav-link">
            <UserCircleIcon className="w-5 h-5" />
            <span>Register</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-sepia-100 border-b border-sepia-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2 text-2xl font-serif text-gray-900">
              <img src="/timeseal-icon.svg" alt="TimeSeal" className="w-8 h-8" />
              TimeSeal
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-6"
          >
            <NavLinks />
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-sepia-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden border-t border-sepia-200"
      >
        <div className="py-2">
          <Link to="/" className="mobile-nav-link">
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Link>
          {user ? (
            <>
              <Link to="/create-capsule" className="mobile-nav-link">
                <PlusCircleIcon className="w-5 h-5" />
                <span>Create Capsule</span>
              </Link>
              <Link to="/my-capsules" className="mobile-nav-link">
                <ArchiveBoxIcon className="w-5 h-5" />
                <span>My Capsules</span>
              </Link>
              <Link to="/rewards" className="mobile-nav-link">
                <GiftIcon className="w-5 h-5" />
                <span>Rewards</span>
              </Link>
              <Link to="/profile" className="mobile-nav-link">
                <UserCircleIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button onClick={handleSignOut} className="w-full mobile-nav-link">
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link">
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="mobile-nav-link">
                <UserCircleIcon className="w-5 h-5" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
}