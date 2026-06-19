'use client';

import { motion } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { BRAND_CONFIG } from '@/constants';

export default function WhatsAppButton() {
  const phone = BRAND_CONFIG.contact.phone.replace(/\D/g, '');
  const message = encodeURIComponent(
    "Hi Voyaage! I'm interested in booking a tour package."
  );

  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl cursor-pointer flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      >
        <WhatsAppIcon sx={{ fontSize: 28 }} />
      </motion.div>
    </motion.a>
  );
}
