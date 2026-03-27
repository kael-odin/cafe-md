import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const shares = new Map<string, {
  content: string;
  expiresAt: Date | null;
  isPublic: boolean;
  createdAt: Date;
}>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, expiresIn, isPublic } = body;

    const slug = nanoid(8);
    const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000) : null;

    shares.set(slug, {
      content,
      expiresAt,
      isPublic,
      createdAt: new Date(),
    });

    return NextResponse.json({ slug });
  } catch (error) {
    console.error('Share error:', error);
    return NextResponse.json({ error: 'Failed to create share' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const share = shares.get(slug);

  if (!share) {
    return NextResponse.json({ error: 'Share not found' }, { status: 404 });
  }

  if (share.expiresAt && share.expiresAt < new Date()) {
    shares.delete(slug);
    return NextResponse.json({ error: 'Share expired' }, { status: 410 });
  }

  return NextResponse.json(share);
}
