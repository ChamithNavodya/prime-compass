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
  title: 'About Us | Pear Trails',
  description: 'Learn about Pear Trails — your local Sri Lanka travel partner dedicated to authentic, personalized island journeys.',
};

const team = [
  { name: 'Travel Specialist', role: 'Tour Planning & Design', img: 'https://i.pravatar.cc/300?img=53' },
  { name: 'Guest Relations', role: 'Customer Experience', img: 'https://i.pravatar.cc/300?img=25' },
  { name: 'Senior Driver Guide', role: 'Island-Wide Chauffeur', img: 'https://i.pravatar.cc/300?img=57' },
  { name: 'Local Expert', role: 'Destination Specialist', img: 'https://i.pravatar.cc/300?img=23' },
];

const values = [
  { Icon: CheckCircleIcon, title: 'Tailor-Made Experiences', desc: 'Every traveler is unique. We customize each itinerary according to your interests, travel style, and schedule.' },
  { Icon: PublicIcon, title: 'Local Expertise', desc: 'We know Sri Lanka beyond the tourist trails and can introduce you to places many visitors never discover.' },
  { Icon: GroupsIcon, title: 'Comfort at Every Mile', desc: 'Modern, air-conditioned vehicles maintained to high standards for a smooth and relaxing travel experience.' },
  { Icon: EmojiEventsIcon, title: 'Authentic Experiences', desc: 'We believe the true beauty of Sri Lanka is discovered in hidden roads, local hosts, and stories waiting around every corner.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-16">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
          alt="About Pear Trails"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
              About Pear Trails
            </h1>
            <p className="text-white/80 text-lg max-w-xl">
              Your local travel partner for authentic, personalized Sri Lanka journeys.
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
              Your Local Partner for Authentic Sri Lanka Journeys
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              At Pear Trails, we believe the true beauty of Sri Lanka cannot be found in guidebooks alone. It is discovered in the hidden village roads, the smile of a local host, the scent of freshly brewed Ceylon tea, the thrill of a safari at sunrise, and the stories waiting around every corner.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              We are not simply a transportation provider or a tour operator — we are your dedicated local travel partner, creating seamless, personalized, and meaningful journeys that allow you to experience the very best of Sri Lanka, comfortably, safely, and authentically.
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
