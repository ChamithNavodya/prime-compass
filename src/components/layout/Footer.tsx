import Link from 'next/link';
import ExploreIcon from '@mui/icons-material/Explore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { BRAND_CONFIG, NAV_LINKS } from '@/constants';

const packageLinks = [
  { label: 'Adventure Tours', href: '/packages?category=adventure' },
  { label: 'Luxury Packages', href: '/packages?category=luxury' },
  { label: 'Family Trips', href: '/packages?category=family' },
  { label: 'Honeymoon Special', href: '/packages?category=honeymoon' },
  { label: 'Beach Getaways', href: '/packages?category=beach' },
  { label: 'Cultural Tours', href: '/packages?category=cultural' },
];

const socialLinks = [
  { href: BRAND_CONFIG.social.instagram, Icon: InstagramIcon, label: 'Instagram' },
  { href: BRAND_CONFIG.social.facebook, Icon: FacebookIcon, label: 'Facebook' },
  { href: BRAND_CONFIG.social.youtube, Icon: YouTubeIcon, label: 'YouTube' },
  { href: BRAND_CONFIG.social.twitter, Icon: TwitterIcon, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-light to-secondary flex items-center justify-center">
                <ExploreIcon sx={{ color: 'white', fontSize: 20 }} />
              </div>
              <span className="font-heading text-xl font-bold">{BRAND_CONFIG.name}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              {BRAND_CONFIG.description}. Creating unforgettable memories since 2010.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer hover:bg-secondary hover:-translate-y-1 transition-all duration-200"
                >
                  <Icon sx={{ fontSize: 18 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Packages
            </h4>
            <ul className="space-y-2">
              {packageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="flex items-start gap-2 text-white/70 text-sm hover:text-white cursor-pointer transition-colors"
                >
                  <EmailIcon sx={{ fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                  {BRAND_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_CONFIG.contact.phone}`}
                  className="flex items-start gap-2 text-white/70 text-sm hover:text-white cursor-pointer transition-colors"
                >
                  <PhoneIcon sx={{ fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                  {BRAND_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <LocationOnIcon sx={{ fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                <span>{BRAND_CONFIG.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/40 text-sm hover:text-white cursor-pointer transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
