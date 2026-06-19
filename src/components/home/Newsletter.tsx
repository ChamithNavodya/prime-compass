'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import { fadeInUp, staggerContainer } from '@/utils/animations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setOpen(true);
    setEmail('');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent" />

      {/* Animated floating circles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/10"
          style={{
            width: `${80 + i * 60}px`,
            height: `${80 + i * 60}px`,
            left: `${-20 + i * 22}%`,
            top: `${20 - i * 5}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`r-${i}`}
          className="absolute rounded-full bg-white/5"
          style={{
            width: `${40 + i * 30}px`,
            height: `${40 + i * 30}px`,
            right: `${5 + i * 10}%`,
            bottom: `${10 + i * 8}%`,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={fadeInUp}
            className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          >
            <EmailIcon sx={{ color: 'white', fontSize: 32 }} />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Get Exclusive Travel Deals
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-white/80 text-lg mb-8"
          >
            Subscribe to our newsletter and receive the best deals, travel
            inspiration, and early-bird offers straight to your inbox.
          </motion.p>

          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 rounded-xl bg-white text-[var(--text-primary)] placeholder-gray-400 outline-none text-sm focus:ring-2 focus:ring-secondary/50"
              />
              {error && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-300">{error}</p>
              )}
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-4 bg-secondary text-white rounded-xl font-semibold text-sm cursor-pointer hover:bg-secondary-dark transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <SendIcon fontSize="small" />
              Subscribe
            </motion.button>
          </motion.form>

          <motion.p variants={fadeInUp} className="text-white/50 text-xs mt-4">
            No spam, ever. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          You&apos;re subscribed! Welcome to the Voyaage family.
        </Alert>
      </Snackbar>
    </section>
  );
}
