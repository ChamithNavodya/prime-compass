import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const pkg = await prisma.package.findUnique({
    where: { id: params.id },
    include: { categories: true, destinationRel: true },
  });
  if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(pkg);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { categoryIds, destinationId, ...data } = body;

  const pkg = await prisma.package.update({
    where: { id: params.id },
    data: {
      ...data,
      categories: { set: categoryIds?.map((id: string) => ({ id })) ?? [] },
      destinationRel: destinationId ? { connect: { id: destinationId } } : { disconnect: true },
    },
    include: { categories: true },
  });
  return NextResponse.json(pkg);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.package.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
