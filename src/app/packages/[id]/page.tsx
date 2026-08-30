import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { packages } from '@/data/packages';
import PackageDetail from '@/components/packages/PackageDetail';

export async function generateStaticParams() {
  return packages.map((pkg) => ({ id: pkg.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) return {};
  return {
    title: `${pkg.title} | Pear Trails`,
    description: pkg.description.slice(0, 160),
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-16">
      <PackageDetail pkg={pkg} />
    </div>
  );
}
