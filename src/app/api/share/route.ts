import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const memoryShares = new Map<string, {
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

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('shares')
        .insert([
          {
            slug,
            content,
            expires_at: expiresAt?.toISOString(),
            is_public: isPublic,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json({ error: 'Failed to create share' }, { status: 500 });
      }

      return NextResponse.json({ slug: data.slug });
    } else {
      memoryShares.set(slug, {
        content,
        expiresAt,
        isPublic,
        createdAt: new Date(),
      });

      return NextResponse.json({ slug });
    }
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

  if (isSupabaseConfigured() && supabase) {
    const { data: share, error } = await supabase
      .from('shares')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !share) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 });
    }

    if (share.expires_at && new Date(share.expires_at) < new Date()) {
      await supabase.from('shares').delete().eq('slug', slug);
      return NextResponse.json({ error: 'Share expired' }, { status: 410 });
    }

    return NextResponse.json({
      content: share.content,
      expiresAt: share.expires_at,
      isPublic: share.is_public,
      createdAt: share.created_at,
    });
  } else {
    const share = memoryShares.get(slug);

    if (!share) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 });
    }

    if (share.expiresAt && share.expiresAt < new Date()) {
      memoryShares.delete(slug);
      return NextResponse.json({ error: 'Share expired' }, { status: 410 });
    }

    return NextResponse.json(share);
  }
}
