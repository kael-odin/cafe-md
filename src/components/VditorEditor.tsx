'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useTranslations, useLocale } from 'next-intl';
import { supabase } from '@/lib/supabase';
import Toolbar from './Toolbar';
import MindmapModal from './MindmapModal';
import ShareDialog from './ShareDialog';
import GuideModal from './GuideModal';
import imageCompression from 'browser-image-compression';

const STORAGE_KEY = 'cafe-md-content';
const GUIDE_SHOWN_KEY = 'cafe-md-guide-shown';

export default function VditorEditor() {
  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const vditorRef = useRef<HTMLDivElement>(null);
  const vditorInstance = useRef<Vditor | null>(null);
  const [content, setContent] = useState('');
  const [showMindmap, setShowMindmap] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showDropzone, setShowDropzone] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editMode, setEditMode] = useState<'ir' | 'sv' | 'wysiwyg'>('ir');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const guideShown = localStorage.getItem(GUIDE_SHOWN_KEY);
    if (!guideShown) {
      setShowGuide(true);
    }
  }, []);

  const handleCloseGuide = useCallback(() => {
    setShowGuide(false);
    localStorage.setItem(GUIDE_SHOWN_KEY, 'true');
  }, []);

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

  const compressAndUploadImage = useCallback(async (file: File): Promise<string> => {
    try {
      setUploading(true);
      setUploadProgress(10);
      
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (progress: number) => {
          setUploadProgress(10 + progress * 0.3);
        },
      };
      
      const compressedFile = await imageCompression(file, options);
      setUploadProgress(40);
      
      if (!supabase) {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(compressedFile);
        });
      }

      const fileName = `images/${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      setUploadProgress(90);
      
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(data.path);
      
      setUploadProgress(100);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  }, []);

  const getWeChatStyleHTML = useCallback((html: string) => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>微信样式文档</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.75;
      color: #333;
      background-color: #f7f7f7;
      padding: 20px;
    }
    .wechat-container {
      max-width: 677px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .wechat-content {
      padding: 20px;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #333;
      margin: 24px 0 16px 0;
      font-weight: 600;
    }
    h1 {
      font-size: 24px;
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #eee;
    }
    h2 {
      font-size: 20px;
      border-left: 4px solid #07C160;
      padding-left: 12px;
    }
    h3 {
      font-size: 18px;
    }
    p {
      margin-bottom: 16px;
      text-align: justify;
    }
    img {
      max-width: 100%;
      height: auto;
      margin: 16px 0;
      border-radius: 8px;
    }
    code {
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.9em;
    }
    pre {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 16px 0;
    }
    pre code {
      background: none;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #07C160;
      padding-left: 16px;
      margin: 16px 0;
      color: #666;
      background-color: #f9f9f9;
      padding: 12px 16px;
      border-radius: 0 8px 8px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background-color: #f9f9f9;
      font-weight: 600;
    }
    ul, ol {
      margin: 16px 0;
      padding-left: 24px;
    }
    li {
      margin-bottom: 8px;
    }
    a {
      color: #07C160;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wechat-container">
    <div class="wechat-content">
      ${html}
    </div>
  </div>
</body>
</html>`;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !vditorRef.current) return;

    const urlContent = searchParams.get('content');
    const dataContent = searchParams.get('data');
    
    let decodedContent = null;
    
    if (urlContent) {
      decodedContent = decodeURIComponent(urlContent);
    } else if (dataContent) {
      try {
        decodedContent = decodeURIComponent(escape(atob(dataContent)));
      } catch (e) {
        console.error('Failed to decode data:', e);
      }
    }
    
    if (!decodedContent && typeof window !== 'undefined') {
      const extensionContent = localStorage.getItem('cafe-md-content');
      if (extensionContent) {
        decodedContent = extensionContent;
        localStorage.removeItem('cafe-md-content');
        localStorage.removeItem('cafe-md-filename');
      }
    }
    
    const savedContent = loadFromLocalStorage();
    const initialContent = decodedContent || savedContent;

    vditorInstance.current = new Vditor(vditorRef.current, {
      height: '100%',
      mode: editMode,
      placeholder: t('editor.placeholder'),
      value: initialContent,
      theme: 'classic',
      lang: locale === 'en-US' ? 'en_US' : 'zh_CN',
      cache: {
        enable: false,
      },
      customWysiwygToolbar: () => [],
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        '|',
        'upload',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        'fullscreen',
        {
          name: 'more',
          toolbar: [
            'both',
            'preview',
            'outline',
            'export',
            'devtools',
            'info',
            'help',
          ],
        },
      ],
      input: (value) => {
        setContent(value);
        saveToLocalStorage(value);
      },
      upload: {
        url: '/api/upload',
        fieldName: 'file[]',
        accept: 'image/*,.md,.txt',
        handler: async (files) => {
          const file = files[0];
          if (file.type.startsWith('image/')) {
            const url = await compressAndUploadImage(file);
            if (vditorInstance.current) {
              vditorInstance.current.insertValue(`![${file.name}](${url})`);
            }
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
          paragraphBeginningSpace: false,
          fixTermTypo: false,
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
      toolbarConfig: {
        hide: false,
        pin: false,
      },
      counter: {
        enable: false,
      },
      resize: {
        enable: false,
      },
      after: () => {
        if (savedContent) {
          setContent(savedContent);
        }
        
        const editorElement = vditorRef.current?.querySelector('.vditor-ir') || 
                              vditorRef.current?.querySelector('.vditor-sv') ||
                              vditorRef.current?.querySelector('.vditor-wysiwyg');
        
        if (editorElement) {
          editorElement.addEventListener('paste', (e: Event) => {
            const clipboardEvent = e as ClipboardEvent;
            const text = clipboardEvent.clipboardData?.getData('text/plain');
            
            if (text && vditorInstance.current) {
              e.preventDefault();
              e.stopPropagation();
              
              const cleanedText = text.replace(/^```\n/, '').replace(/\n```$/, '');
              
              vditorInstance.current.insertValue(cleanedText);
              setContent(vditorInstance.current.getValue());
              saveToLocalStorage(vditorInstance.current.getValue());
            }
          }, true);
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
  }, [mounted, showOutline, editMode, locale, t, loadFromLocalStorage, saveToLocalStorage, compressAndUploadImage, searchParams]);

  const switchEditMode = useCallback((mode: 'ir' | 'sv' | 'wysiwyg') => {
    setEditMode(mode);
    if (vditorInstance.current) {
      vditorInstance.current.destroy();
      vditorInstance.current = null;
    }
  }, []);



  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setShowDropzone(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setShowDropzone(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setShowDropzone(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const url = await compressAndUploadImage(file);
      if (vditorInstance.current) {
        vditorInstance.current.insertValue(`![${file.name}](${url})`);
      }
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
  }, [saveToLocalStorage, compressAndUploadImage]);

  const handleExport = useCallback(async (format: 'html' | 'md' | 'text' | 'pdf' | 'docx' | 'wechat') => {
    if (!vditorInstance.current) return;

    if (format === 'docx') {
      try {
        const html = vditorInstance.current.getHTML();
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import('docx');
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
        const body = doc.body.firstChild as HTMLElement;
        
        const children: InstanceType<typeof Paragraph>[] = [];
        
        const processNode = (node: Node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
            if (text.trim()) {
              return [new TextRun({ text })];
            }
            return [];
          }
          
          if (node.nodeType !== Node.ELEMENT_NODE) return [];
          
          const element = node as HTMLElement;
          const tagName = element.tagName.toLowerCase();
          
          const childRuns: InstanceType<typeof TextRun>[] = [];
          element.childNodes.forEach(child => {
            childRuns.push(...processNode(child) as InstanceType<typeof TextRun>[]);
          });
          
          switch (tagName) {
            case 'h1':
              children.push(new Paragraph({
                children: [new TextRun({ text: element.textContent || '', bold: true, size: 48 })],
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 240, after: 120 },
              }));
              return [];
            case 'h2':
              children.push(new Paragraph({
                children: [new TextRun({ text: element.textContent || '', bold: true, size: 36 })],
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 100 },
              }));
              return [];
            case 'h3':
              children.push(new Paragraph({
                children: [new TextRun({ text: element.textContent || '', bold: true, size: 28 })],
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 160, after: 80 },
              }));
              return [];
            case 'p':
              children.push(new Paragraph({
                children: childRuns.length > 0 ? childRuns : [new TextRun({ text: '' })],
                spacing: { after: 120 },
              }));
              return [];
            case 'strong':
            case 'b':
              return [new TextRun({ text: element.textContent || '', bold: true })];
            case 'em':
            case 'i':
              return [new TextRun({ text: element.textContent || '', italics: true })];
            case 'code':
              return [new TextRun({ text: element.textContent || '', font: 'Courier New', shading: { fill: 'E5E5E5' } })];
            case 'pre':
              const codeText = element.textContent || '';
              codeText.split('\n').forEach(line => {
                children.push(new Paragraph({
                  children: [new TextRun({ text: line, font: 'Courier New', size: 20 })],
                  shading: { fill: 'F5F5F5' },
                }));
              });
              return [];
            case 'blockquote':
              children.push(new Paragraph({
                children: [new TextRun({ text: element.textContent || '', italics: true })],
                indent: { left: 720 },
                shading: { fill: 'F5F5F5' },
              }));
              return [];
            case 'ul':
            case 'ol':
              element.querySelectorAll('li').forEach(li => {
                children.push(new Paragraph({
                  children: [new TextRun({ text: `• ${li.textContent}` })],
                  indent: { left: 360 },
                }));
              });
              return [];
            case 'br':
              children.push(new Paragraph({ children: [] }));
              return [];
            case 'a':
              return [new TextRun({ text: element.textContent || '', color: '0066CC', underline: {} })];
            default:
              return childRuns;
          }
        };
        
        body.childNodes.forEach(node => processNode(node));
        
        const docxDocument = new Document({
          sections: [{
            properties: {},
            children: children.length > 0 ? children : [new Paragraph({ children: [new TextRun({ text: '' })] })],
          }],
        });

        const blob = await Packer.toBlob(docxDocument);
        const url = URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = 'document.docx';
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('DOCX export error:', error);
        alert('Failed to export DOCX. Please try HTML format instead.');
      }
      return;
    }

    if (format === 'wechat') {
      const html = vditorInstance.current.getHTML();
      const wechatHtml = getWeChatStyleHTML(html);
      const blob = new Blob([wechatHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wechat-style.html';
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Export PDF</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              pre { background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }
              code { background: #f5f5f5; padding: 2px 4px; border-radius: 2px; }
              blockquote { border-left: 4px solid #ddd; padding-left: 16px; margin-left: 0; color: #666; }
              table { border-collapse: collapse; width: 100%; margin: 1em 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background: #f5f5f5; }
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

  const handleClear = useCallback(() => {
    if (!vditorInstance.current) return;
    
    if (confirm(t('editor.clearConfirm'))) {
      vditorInstance.current.setValue('');
      setContent('');
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [t]);

  const handleSaveToLocal = useCallback(() => {
    if (!vditorInstance.current) return;
    
    const content = vditorInstance.current.getValue();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.download = `document-${timestamp}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const toggleOutline = useCallback(() => {
    setShowOutline(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            handleSaveToLocal();
            break;
          case 'e':
            e.preventDefault();
            if (vditorInstance.current) {
              handleExport('docx');
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveToLocal, handleExport]);

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
      {uploading && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-blue-500 text-white py-2 px-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>{t('editor.uploading')} {Math.round(uploadProgress)}%</span>
          </div>
          <div className="mt-1 h-1 bg-blue-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
      
      {showDropzone && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-2 border-dashed border-blue-500 transition-all duration-300">
          <div className="text-center p-10 bg-white/95 dark:bg-zinc-800/95 rounded-2xl shadow-2xl border-2 border-blue-500 transform transition-all duration-300 hover:scale-105">
            <div className="flex justify-center gap-4 mb-6">
              <div className="text-6xl animate-bounce">📄</div>
              <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🖼️</div>
              <div className="text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>📝</div>
            </div>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3">
              {t('editor.dropzone')}
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
              {t('editor.dropzoneHint')}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">.md</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">.txt</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">.png</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">.jpg</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">.gif</span>
            </div>
          </div>
        </div>
      )}
      
      <Toolbar
        onExport={handleExport}
        onShare={() => setShowShare(true)}
        onMindmap={() => setShowMindmap(true)}
        onToggleOutline={toggleOutline}
        onClear={handleClear}
        onSaveLocal={handleSaveToLocal}
        showOutline={showOutline}
        vditor={vditorInstance.current}
        editMode={editMode}
        onSwitchMode={switchEditMode}
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

      {showGuide && (
        <GuideModal onClose={handleCloseGuide} />
      )}
    </div>
  );
}
