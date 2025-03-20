import { Link } from 'react-router-dom';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-sepia-100 border-t border-sepia-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/timeseal-icon.svg" alt="TimeSeal" className="w-8 h-8" />
              <span className="text-xl font-serif text-gray-900">TimeSeal</span>
            </div>
            <p className="text-gray-600 text-sm">
              Preserving your precious memories for future generations through digital time capsules.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900 text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-600 hover:text-gray-900 text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <EnvelopeIcon className="w-5 h-5" />
                support@timeseal.com
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <PhoneIcon className="w-5 h-5" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPinIcon className="w-5 h-5" />
                123 Memory Lane, Digital City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sepia-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} TimeSeal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}