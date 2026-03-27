'use client';

import { useEffect, useRef, useState } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';
import { useTranslations } from 'next-intl';

interface MindmapModalProps {
  content: string;
  onClose: () => void;
}

export default function MindmapModal({ content, onClose }: MindmapModalProps) {
  const t = useTranslations('mindmap');
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<Markmap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!svgRef.current || !content.trim()) {
      setError(t('noContent'));
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      try {
        setIsLoading(true);
        setError(null);

        const transformer = new Transformer();
        const { root } = transformer.transform(content);

        if (!root || !root.children || root.children.length === 0) {
          setError(t('noHeadings'));
          setIsLoading(false);
          return;
        }

        if (markmapRef.current) {
          markmapRef.current.setData(root);
          markmapRef.current.fit();
        } else {
          const mm = Markmap.create(svgRef.current!, {
            autoFit: true,
            color: (node) => {
              const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
              return colors[node.state?.depth % colors.length] || colors[0];
            },
            duration: 500,
            maxWidth: 300,
          }, root);
          
          markmapRef.current = mm;
          
          setTimeout(() => {
            mm.fit();
          }, 100);
        }

        setIsLoading(false);
      } catch (e) {
        console.error('Mindmap generation error:', e);
        setError('Failed to generate mindmap');
        setIsLoading(false);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [content, t]);

  const handleExportSVG = () => {
    if (!svgRef.current) return;

    try {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mindmap.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {t('title')}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSVG}
              disabled={!!error || isLoading}
              className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white rounded"
            >
              {t('export')}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded"
            >
              {t('close')}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-900 z-10">
              <div className="text-zinc-500">Loading...</div>
            </div>
          )}
          {error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-red-500 mb-2">⚠️</div>
                <p className="text-zinc-600 dark:text-zinc-400">{error}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                  Tip: Add headings (# ## ###) to your document to generate a mindmap
                </p>
              </div>
            </div>
          ) : (
            <svg 
              ref={svgRef} 
              className="w-full h-full"
              style={{ minWidth: '100%', minHeight: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
