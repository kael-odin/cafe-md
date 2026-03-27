'use client';

import { useTranslations } from 'next-intl';
import type Vditor from 'vditor';

interface ToolbarProps {
  onExport: (format: 'html' | 'md' | 'text') => void;
  onShare: () => void;
  onMindmap: () => void;
  vditor: Vditor | null;
}

export default function Toolbar({ onExport, onShare, onMindmap, vditor }: ToolbarProps) {
  const t = useTranslations();

  const handleToolbarAction = (action: string) => {
    if (!vditor) return;

    try {
      switch (action) {
        case 'bold':
          vditor.insertValue('****');
          break;
        case 'italic':
          vditor.insertValue('**');
          break;
        case 'strike':
          vditor.insertValue('~~~~');
          break;
        case 'heading':
          vditor.insertValue('## ');
          break;
        case 'quote':
          vditor.insertValue('> ');
          break;
        case 'list':
          vditor.insertValue('- ');
          break;
        case 'code':
          vditor.insertValue('```\n\n```');
          break;
        case 'link':
          vditor.insertValue('[](url)');
          break;
        case 'table':
          vditor.insertValue('| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |');
          break;
      }
    } catch (e) {
      console.error('Toolbar action failed:', e);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleToolbarAction('heading')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.heading')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('bold')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.bold')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('italic')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.italic')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m-2 0l-4 16m0 0h4" transform="skewX(-10)" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('strike')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.strike')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 10H19a2 2 0 012 2v0a2 2 0 01-2 2h-1.5M6.5 14H5a2 2 0 01-2-2v0a2 2 0 012-2h1.5M4 12h16" />
          </svg>
        </button>
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />
        <button
          onClick={() => handleToolbarAction('quote')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.quote')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('list')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.list')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('code')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.code')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('link')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.link')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        <button
          onClick={() => handleToolbarAction('table')}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.table')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative group">
          <button
            className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300"
          >
            {t('editor.export')}
          </button>
          <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => onExport('html')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              HTML
            </button>
            <button
              onClick={() => onExport('md')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              Markdown
            </button>
            <button
              onClick={() => onExport('text')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              Text
            </button>
          </div>
        </div>
        <button
          onClick={onMindmap}
          className="px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300"
        >
          {t('editor.mindmap')}
        </button>
        <button
          onClick={onShare}
          className="px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          {t('editor.share')}
        </button>
      </div>
    </div>
  );
}
