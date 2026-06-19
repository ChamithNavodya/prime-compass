'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SectionTitle from '@/components/shared/SectionTitle';
import { BRAND_CONFIG } from '@/constants';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const contactInfo = [
  { Icon: EmailIcon, label: 'Email', value: BRAND_CONFIG.contact.email, href: `mailto:${BRAND_CONFIG.contact.email}` },
  { Icon: PhoneIcon, label: 'Phone', value: BRAND_CONFIG.contact.phone, href: `tel:${BRAND_CONFIG.contact.phone}` },
  { Icon: LocationOnIcon, label: 'Office', value: BRAND_CONFIG.contact.address, href: '#' },
  { Icon: AccessTimeIcon, label: 'Hours', value: 'Mon – Fri: 9am – 6pm', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '', interest: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Get in Touch"
          title="Contact"
          highlight="Us"
          subtitle="Have a question or ready to book? Our travel experts are here to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {contactInfo.map(({ Icon, label, value, href }) => (
              <motion.a
                key={label}
                variants={fadeInUp}
                href={href}
                className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-shadow block"
              >
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon sx={{ color: 'var(--primary)', fontSize: 22 }} />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{value}</p>
                </div>
              </motion.a>
            ))}

            {/* Map placeholder */}
            <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <LocationOnIcon sx={{ color: 'var(--primary)', fontSize: 36 }} />
                <p className="text-sm text-[var(--text-secondary)] mt-1">Map View</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 md:p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-[var(--text-primary)] mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 234 567 890"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                    Interested In
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-primary transition-colors bg-white cursor-pointer"
                  >
                    <option value="">Select package type</option>
                    <option value="adventure">Adventure Tours</option>
                    <option value="luxury">Luxury Packages</option>
                    <option value="family">Family Trips</option>
                    <option value="honeymoon">Honeymoon Special</option>
                    <option value="cultural">Cultural Tours</option>
                    <option value="beach">Beach Getaways</option>
                    <option value="custom">Custom Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your dream trip — destination, dates, group size, and any special requirements..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-secondary text-white rounded-xl font-semibold cursor-pointer hover:bg-secondary-dark transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={() => setSubmitted(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSubmitted(false)} sx={{ borderRadius: 2 }}>
          Message sent! We&apos;ll get back to you within 24 hours.
        </Alert>
      </Snackbar>
    </div>
  );
}
