import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/analyze', icon: Search, label: 'Analyze' },
  { path: '/history', icon: Clock, label: 'Past Vibes' },
];

export default function FloatingNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 bg-ink/90 backdrop-blur-xl rounded-full px-2 py-2 shadow-2xl shadow-ink/20">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-sky_blue to-mint text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {isActive && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  className="text-sm font-medium overflow-hidden whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
