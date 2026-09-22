import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const packages = await prisma.package.findMany({
    include: { categories: true, destinationRel: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(packages);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { categoryIds, destinationId, ...data } = body;

  const pkg = await prisma.package.create({
    data: {
      ...data,
      categories: categoryIds?.length ? { connect: categoryIds.map((id: string) => ({ id })) } : undefined,
      destinationRel: destinationId ? { connect: { id: destinationId } } : undefined,
    },
    include: { categories: true },
  });
  return NextResponse.json(pkg, { status: 201 });
}
