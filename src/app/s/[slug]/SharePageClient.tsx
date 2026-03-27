'use client';

import { useEffect, useState, useRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

interface SharePageClientProps {
  slug: string;
}

interface ShareData {
  content: string;
  expiresAt: string | null;
  isPublic: boolean;
  createdAt: string;
}

export default function SharePageClient({ slug }: SharePageClientProps) {
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const response = await fetch(`/api/share?slug=${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Document not found');
          } else if (response.status === 410) {
            setError('This share link has expired');
          } else {
            setError('Failed to load document');
          }
          return;
        }

        const data = await response.json();
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
          <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-800">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Shared Document
            </h1>
            {shareData?.createdAt && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Created: {new Date(shareData.createdAt).toLocaleString()}
              </p>
            )}
          </div>
          <div ref={previewRef} className="vditor-reset p-8" />
        </div>
      </div>
    </div>
  );
}
