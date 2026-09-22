import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '@/components/ui/ThemeRegistry';
import SessionProvider from '@/components/admin/SessionProvider';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { BRAND_CONFIG } from '@/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: BRAND_CONFIG.seo.title,
  description: BRAND_CONFIG.seo.description,
  openGraph: {
    title: BRAND_CONFIG.seo.title,
    description: BRAND_CONFIG.seo.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <SessionProvider>
          <ThemeRegistry>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
