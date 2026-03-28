'use client';

import { useTranslations } from 'next-intl';
import type Vditor from 'vditor';

interface ToolbarProps {
  onExport: (format: 'html' | 'md' | 'text' | 'pdf' | 'docx' | 'wechat') => void;
  onShare: () => void;
  onMindmap: () => void;
  onToggleOutline: () => void;
  onClear: () => void;
  onSaveLocal: () => void;
  showOutline: boolean;
  vditor: Vditor | null;
  editMode: 'ir' | 'sv' | 'wysiwyg';
  onSwitchMode: (mode: 'ir' | 'sv' | 'wysiwyg') => void;
}

export default function Toolbar({ 
  onExport, 
  onShare, 
  onMindmap, 
  onToggleOutline,
  onClear,
  onSaveLocal,
  showOutline,
  vditor,
  editMode,
  onSwitchMode
}: ToolbarProps) {
  const t = useTranslations();

  const handleToolbarAction = (action: string) => {
    if (!vditor) return;

    try {
      vditor.focus();
      
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
    <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-1">
        <div className="relative group">
          <button
            className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
            title={t('toolbar.mode')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="hidden sm:inline">{t('toolbar.mode')}</span>
          </button>
          <div className="absolute left-0 mt-1 w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => onSwitchMode('ir')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                editMode === 'ir' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              ✨ {t('toolbar.modeIR')}
            </button>
            <button
              onClick={() => onSwitchMode('sv')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                editMode === 'sv' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              ⚖️ {t('toolbar.modeSV')}
            </button>
            <button
              onClick={() => onSwitchMode('wysiwyg')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                editMode === 'wysiwyg' 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
              }`}
            >
              📝 {t('toolbar.modeWYSIWYG')}
            </button>
          </div>
        </div>
        
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />
        
        <button
          onClick={() => handleToolbarAction('heading')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.heading')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.heading')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('bold')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.bold')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.bold')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('italic')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.italic')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 4h4m-2 0l-4 16m0 0h4" transform="skewX(-10)" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.italic')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('strike')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.strike')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 10H19a2 2 0 012 2v0a2 2 0 01-2 2h-1.5M6.5 14H5a2 2 0 01-2-2v0a2 2 0 012-2h1.5M4 12h16" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.strike')}</span>
        </button>
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1" />
        <button
          onClick={() => handleToolbarAction('quote')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.quote')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.quote')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('list')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.list')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.list')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('code')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.code')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.code')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('link')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.link')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.link')}</span>
        </button>
        <button
          onClick={() => handleToolbarAction('table')}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-sm text-zinc-700 dark:text-zinc-300"
          title={t('toolbar.table')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">{t('toolbar.table')}</span>
        </button>
      </div>

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
      </div>
    </div>
  );
}
