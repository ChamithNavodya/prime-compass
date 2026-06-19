'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { NAV_LINKS, BRAND_CONFIG } from '@/constants';

export default function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <ExploreIcon sx={{ color: 'white', fontSize: 18 }} />
            </div>
            <span className="font-heading text-lg font-bold text-primary">
              {BRAND_CONFIG.name}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-6 space-y-1">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`block px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'text-[var(--text-secondary)] hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t">
          <Link
            href="/packages"
            onClick={onClose}
            className="block w-full text-center px-5 py-3 rounded-xl bg-secondary text-white font-semibold cursor-pointer hover:bg-secondary-dark transition-colors mb-6"
          >
            Book Now
          </Link>
          <div className="flex justify-center gap-4">
            {[
              { href: BRAND_CONFIG.social.instagram, Icon: InstagramIcon },
              { href: BRAND_CONFIG.social.facebook, Icon: FacebookIcon },
              { href: BRAND_CONFIG.social.youtube, Icon: YouTubeIcon },
              { href: BRAND_CONFIG.social.twitter, Icon: TwitterIcon },
            ].map(({ href, Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-primary hover:bg-primary/10 cursor-pointer transition-all"
              >
                <Icon fontSize="small" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
