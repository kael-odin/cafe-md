'use client';

import { useTranslations } from 'next-intl';

interface ToolbarProps {
  onExport: (format: 'html' | 'md' | 'text' | 'pdf' | 'docx' | 'wechat') => void;
  onShare: () => void;
  onMindmap: () => void;
  onToggleOutline: () => void;
  onClear: () => void;
  onSaveLocal: () => void;
  showOutline: boolean;
}

export default function Toolbar({ 
  onExport, 
  onShare, 
  onMindmap, 
  onToggleOutline,
  onClear,
  onSaveLocal,
  showOutline,
}: ToolbarProps) {
  const t = useTranslations();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-end px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <button
          onClick={onSaveLocal}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300"
          title={t('editor.saveLocal')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span className="hidden sm:inline">{t('editor.saveLocal')}</span>
        </button>
        
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300"
          title={t('editor.clear')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="hidden sm:inline">{t('editor.clear')}</span>
        </button>
        
        <button
          onClick={onToggleOutline}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded ${
            showOutline 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
              : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline">{t('editor.outline')}</span>
        </button>
        
        <div className="relative group">
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{t('editor.export')}</span>
          </button>
          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => onExport('docx')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📄 {t('toolbar.exportDocx')}
            </button>
            <button
              onClick={() => onExport('pdf')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📄 {t('toolbar.exportPdf')}
            </button>
            <button
              onClick={() => onExport('html')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              🌐 {t('toolbar.exportHtml')}
            </button>
            <button
              onClick={() => onExport('md')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📝 {t('toolbar.exportMd')}
            </button>
            <button
              onClick={() => onExport('text')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📋 {t('toolbar.exportText')}
            </button>
            <button
              onClick={() => onExport('wechat')}
              className="block w-full px-4 py-2 text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              💬 {t('toolbar.exportWechat')}
            </button>
          </div>
        </div>
        
        <button
          onClick={onMindmap}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
          <span className="hidden sm:inline">{t('editor.mindmap')}</span>
        </button>
        
        <button
          onClick={onShare}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{t('editor.share')}</span>
        </button>
        
        <div className="relative group">
          <button
            className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
            title={t('toolbar.help')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <a
              href="https://markdown.com.cn/basic-syntax/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📖 {t('toolbar.mdSyntaxCN')}
            </a>
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📖 {t('toolbar.mdSyntaxEN')}
            </a>
            <a
              href="https://mermaid.js.org/intro/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              📊 Mermaid {t('toolbar.diagram')}
            </a>
            <a
              href="https://katex.org/docs/supported.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              🔢 KaTeX {t('toolbar.math')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
