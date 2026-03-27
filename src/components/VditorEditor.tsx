'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useTranslations } from 'next-intl';
import Toolbar from './Toolbar';
import MindmapModal from './MindmapModal';
import ShareDialog from './ShareDialog';

const STORAGE_KEY = 'cafe-md-content';

export default function VditorEditor() {
  const t = useTranslations();
  const vditorRef = useRef<HTMLDivElement>(null);
  const vditorInstance = useRef<Vditor | null>(null);
  const [content, setContent] = useState('');
  const [showMindmap, setShowMindmap] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDropzone, setShowDropzone] = useState(false);
  const [showOutline, setShowOutline] = useState(false);

  const saveToLocalStorage = useCallback((value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, []);

  const loadFromLocalStorage = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
      return '';
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !vditorRef.current) return;

    const savedContent = loadFromLocalStorage();

    vditorInstance.current = new Vditor(vditorRef.current, {
      height: '100%',
      mode: 'ir',
      placeholder: t('editor.placeholder'),
      value: savedContent,
      theme: 'classic',
      cache: {
        enable: false,
      },
      input: (value) => {
        setContent(value);
        saveToLocalStorage(value);
      },
      upload: {
        url: '/api/upload',
        fieldName: 'file[]',
        accept: 'image/*,.md,.txt',
        handler: (files) => {
          const file = files[0];
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target?.result as string;
              if (vditorInstance.current) {
                vditorInstance.current.insertValue(`![${file.name}](${base64})`);
              }
            };
            reader.readAsDataURL(file);
          } else if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const text = e.target?.result as string;
              if (vditorInstance.current) {
                vditorInstance.current.setValue(text);
                setContent(text);
                saveToLocalStorage(text);
              }
            };
            reader.readAsText(file);
          }
          return null;
        },
        format: (files, responseText) => {
          try {
            const response = JSON.parse(responseText);
            return JSON.stringify({
              msg: '',
              code: 0,
              data: {
                errFiles: [],
                succMap: response.data,
              },
            });
          } catch (e) {
            return JSON.stringify({
              msg: 'Upload failed',
              code: 1,
              data: { errFiles: [], succMap: {} },
            });
          }
        },
        success: (editor, msg) => {
          console.log('Upload success:', msg);
        },
        error: (msg) => {
          console.error('Upload error:', msg);
        },
      },
      toolbar: false,
      outline: {
        enable: showOutline,
        position: 'left',
      },
      preview: {
        markdown: {
          toc: true,
          mark: true,
          footnotes: true,
          autoSpace: true,
          gfmAutoLink: true,
        },
        math: {
          inlineDigit: true,
          engine: 'KaTeX',
        },
        hljs: {
          enable: true,
          lineNumber: true,
          style: 'github',
        },
      },
      hint: {
        emoji: {
          '+1': '👍',
          '-1': '👎',
          'confused': '😕',
          'eyes': '👀',
          'heart': '❤️',
          'rocket': '🚀',
          'smile': '😄',
          'tada': '🎉',
        },
      },
      after: () => {
        if (savedContent) {
          setContent(savedContent);
        }
      },
    });

    return () => {
      if (vditorInstance.current) {
        try {
          vditorInstance.current.destroy();
        } catch (e) {
          console.error('Failed to destroy Vditor:', e);
        }
        vditorInstance.current = null;
      }
    };
  }, [mounted, showOutline, t, loadFromLocalStorage, saveToLocalStorage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setShowDropzone(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setShowDropzone(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setShowDropzone(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (vditorInstance.current) {
          vditorInstance.current.insertValue(`![${file.name}](${base64})`);
        }
      };
      reader.readAsDataURL(file);
    } else if (file.name.endsWith('.md') || file.name.endsWith('.markdown') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (vditorInstance.current) {
          vditorInstance.current.setValue(text);
          setContent(text);
          saveToLocalStorage(text);
        }
      };
      reader.readAsText(file);
    }
  }, [saveToLocalStorage]);

  const handleExport = useCallback((format: 'html' | 'md' | 'text' | 'pdf') => {
    if (!vditorInstance.current) return;

    if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Export PDF</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              pre { background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }
              code { background: #f5f5f5; padding: 2px 4px; border-radius: 2px; }
              blockquote { border-left: 4px solid #ddd; padding-left: 16px; margin-left: 0; color: #666; }
            </style>
          </head>
          <body>
            ${vditorInstance.current.getHTML()}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
      return;
    }

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'html':
        content = vditorInstance.current.getHTML();
        filename = 'document.html';
        mimeType = 'text/html';
        break;
      case 'md':
        content = vditorInstance.current.getValue();
        filename = 'document.md';
        mimeType = 'text/markdown';
        break;
      case 'text':
        content = vditorInstance.current.getValue();
        filename = 'document.txt';
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
  }, []);

  const toggleOutline = useCallback(() => {
    setShowOutline(prev => !prev);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="h-full w-full relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {showDropzone && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-500/10 border-2 border-dashed border-blue-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📄</div>
            <div className="text-lg font-medium text-blue-600">
              {t('editor.dropzone')}
            </div>
          </div>
        </div>
      )}
      
      <Toolbar
        onExport={handleExport}
        onShare={() => setShowShare(true)}
        onMindmap={() => setShowMindmap(true)}
        onToggleOutline={toggleOutline}
        showOutline={showOutline}
        vditor={vditorInstance.current}
      />
      <div ref={vditorRef} className="h-[calc(100%-48px)]" />
      
      {showMindmap && (
        <MindmapModal
          content={content}
          onClose={() => setShowMindmap(false)}
        />
      )}
      
      {showShare && (
        <ShareDialog
          content={content}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}
