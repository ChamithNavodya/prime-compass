import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import PackageDetail from '@/components/packages/PackageDetail';
import { DbPackage } from '@/types/db';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({ where: { id } });
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

  const [rawPkg, rawRelated] = await Promise.all([
    prisma.package.findUnique({
      where: { id },
      include: { categories: true },
    }),
    prisma.package.findMany({
      where: { id: { not: id } },
      take: 2,
      include: { categories: true },
      orderBy: { isBestSeller: 'desc' },
    }),
  ]);

  if (!rawPkg) notFound();

  function mapPkg(pkg: typeof rawPkg): DbPackage {
    return {
      ...pkg!,
      pricingType: pkg!.pricingType as 'FIXED' | 'RANGE' | 'HIDDEN',
      itinerary: Array.isArray(pkg!.itinerary)
        ? (pkg!.itinerary as { day: number; title: string; description: string }[])
        : [],
      route: Array.isArray(pkg!.route)
        ? (pkg!.route as { id: string; label: string; lat: number; lng: number; destinationId?: string }[])
        : [],
    };
  }

  const pkg = mapPkg(rawPkg);
  const related = rawRelated.map(mapPkg);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-20 pb-16">
      <PackageDetail pkg={pkg} related={related} />
    </div>
  );
}
