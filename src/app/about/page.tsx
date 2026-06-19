import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import SectionTitle from '@/components/shared/SectionTitle';
import { STATS } from '@/constants';

export const metadata: Metadata = {
  title: 'About Us | Voyaage',
  description: 'Learn about Voyaage — the team behind your unforgettable travel experiences.',
};

const team = [
  { name: 'Alexandra Reed', role: 'Founder & CEO', img: 'https://i.pravatar.cc/300?img=23' },
  { name: 'Marcus Chen', role: 'Head of Operations', img: 'https://i.pravatar.cc/300?img=53' },
  { name: 'Sofia Patel', role: 'Travel Experience Director', img: 'https://i.pravatar.cc/300?img=25' },
  { name: 'James Okafor', role: 'Lead Tour Designer', img: 'https://i.pravatar.cc/300?img=57' },
];

const values = [
  { Icon: CheckCircleIcon, title: 'Quality First', desc: 'Every package is curated with meticulous attention to detail and excellence.' },
  { Icon: PublicIcon, title: 'Global Reach', desc: 'Partnerships with local experts in 120+ countries give you authentic experiences.' },
  { Icon: GroupsIcon, title: 'People-Centric', desc: 'Your journey is personal. We tailor every experience to your unique story.' },
  { Icon: EmojiEventsIcon, title: 'Award-Winning', desc: 'Recognized globally for service excellence and transformative travel experiences.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-16">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
          alt="About Voyaage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
              About Voyaage
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              We&apos;re passionate explorers who believe travel transforms lives.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <section className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              Our Mission
            </span>
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
              Creating Memories That Last a Lifetime
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Founded in 2010, Voyaage was born from a simple belief: every person deserves to experience the world&apos;s beauty. We&apos;ve grown from a small team of 3 passionate travelers to a global travel company serving over 50,000 adventurers annually.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              We don&apos;t just plan trips — we craft journeys that connect you with cultures, landscapes, and people that change the way you see the world.
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl font-semibold cursor-pointer hover:bg-secondary-dark transition-colors"
            >
              Explore Packages
            </Link>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
              alt="Travel adventure"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-8 md:px-12 bg-gradient-to-r from-primary to-primary-light rounded-3xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <div key={i}>
                <p className="font-heading text-4xl font-bold text-white mb-1">
                  {s.value.toLocaleString()}{s.suffix}
                </p>
                <p className="text-white/70 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <SectionTitle
            badge="What We Stand For"
            title="Our"
            highlight="Core Values"
            subtitle="Principles that guide every journey we design"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <v.Icon sx={{ color: 'var(--primary)', fontSize: 24 }} />
                </div>
                <h3 className="font-heading font-semibold text-[var(--text-primary)] mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <SectionTitle
            badge="The Team"
            title="Meet the"
            highlight="Explorers"
            subtitle="The passionate minds crafting your next adventure"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-heading font-semibold text-[var(--text-primary)] text-sm">{member.name}</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
