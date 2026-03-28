'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { supabase } from '@/lib/supabase';

interface ShareData {
  content: string;
  expires_at: string | null;
  is_public: boolean;
  created_at: string;
}

function ShareContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = (format: 'md' | 'html' | 'txt') => {
    if (!shareData) return;
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
      case 'md':
        content = shareData.content;
        filename = 'shared-document.md';
        mimeType = 'text/markdown';
        break;
      case 'html':
        if (previewRef.current) {
          content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shared Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
    blockquote { border-left: 4px solid #ddd; padding-left: 16px; margin-left: 0; color: #666; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
    img { max-width: 100%; }
  </style>
</head>
<body>
${previewRef.current.innerHTML}
</body>
</html>`;
        }
        filename = 'shared-document.html';
        mimeType = 'text/html';
        break;
      case 'txt':
        content = shareData.content;
        filename = 'shared-document.txt';
        mimeType = 'text/plain';
        break;
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchShare = async () => {
      if (!slug) {
        setError('No share ID provided');
        setLoading(false);
        return;
      }

      if (!supabase) {
        setError('Supabase not configured');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('shares')
          .select('content, expires_at, is_public, created_at')
          .eq('slug', slug)
          .single();

        if (fetchError || !data) {
          setError('Document not found');
          return;
        }

        if (data.expires_at && new Date(data.expires_at) < new Date()) {
          setError('This share link has expired');
          return;
        }

        setShareData(data);
      } catch (err) {
        setError('Failed to load document');
      } finally {
        setLoading(false);
      }
    };

    fetchShare();
  }, [slug]);

  useEffect(() => {
    if (!shareData || !previewRef.current) return;

    Vditor.preview(previewRef.current, shareData.content, {
      cdn: 'https://unpkg.com/vditor@3.10.4',
      mode: 'light',
      markdown: {
        toc: true,
        mark: true,
        footnotes: true,
        autoSpace: true,
      },
      math: {
        inlineDigit: true,
        engine: 'KaTeX',
      },
      hljs: {
        enable: true,
        lineNumber: true,
      },
    });
  }, [shareData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {error}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            This document may have been deleted or expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Shared Document
              </h1>
              {shareData?.created_at && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Created: {new Date(shareData.created_at).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload('md')}
                className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded transition-colors"
              >
                .md
              </button>
              <button
                onClick={() => handleDownload('html')}
                className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded transition-colors"
              >
                .html
              </button>
              <button
                onClick={() => handleDownload('txt')}
                className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded transition-colors"
              >
                .txt
              </button>
            </div>
          </div>
          <div ref={previewRef} className="vditor-reset p-8" />
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-500">Loading...</div>
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}
