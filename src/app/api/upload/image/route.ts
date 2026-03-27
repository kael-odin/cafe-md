import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (isSupabaseConfigured() && supabase) {
      const ext = file.name.split('.').pop() || 'jpg';
      const filename = `${nanoid()}.${ext}`;
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (error) {
        console.error('Supabase upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filename);
      
      return NextResponse.json({ 
        url: publicUrl,
        type: 'storage'
      });
    } else {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      return NextResponse.json({ 
        url: base64,
        type: 'base64'
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
