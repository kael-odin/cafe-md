(function() {
  'use strict';
  
  const CAFE_MD_URL = 'https://cafe-md.t445481611.workers.dev';
  
  const markdownContent = document.body.innerText || document.body.textContent;
  
  if (!markdownContent || markdownContent.length < 10) return;
  
  const filename = window.location.pathname.split('/').pop() || 'document.md';
  
  document.head.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename} - Cafe MD Viewer</title>
    <link rel="stylesheet" href="https://unpkg.com/vditor@3.10.4/dist/index.css" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #f8f9fa;
        min-height: 100vh;
      }
      .toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 48px;
        background: #fff;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        z-index: 100;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .toolbar-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .logo {
        font-size: 20px;
      }
      .filename {
        font-weight: 600;
        color: #1f2937;
      }
      .toolbar-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
      }
      .btn-primary {
        background: #3b82f6;
        color: white;
      }
      .btn-primary:hover {
        background: #2563eb;
      }
      .btn-secondary {
        background: #f3f4f6;
        color: #374151;
      }
      .btn-secondary:hover {
        background: #e5e7eb;
      }
      .content {
        margin-top: 48px;
        padding: 32px;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      }
      .vditor-reset {
        background: white;
        border-radius: 12px;
        padding: 32px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        min-height: calc(100vh - 112px);
      }
      .loading {
        text-align: center;
        padding: 48px;
        color: #6b7280;
      }
    </style>
  `;
  
  document.body.innerHTML = `
    <div class="toolbar">
      <div class="toolbar-left">
        <span class="logo">☕</span>
        <span class="filename">${filename}</span>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-secondary" id="editBtn">✏️ 在编辑器中打开</button>
        <button class="btn btn-primary" id="shareBtn">🔗 分享</button>
      </div>
    </div>
    <div class="content">
      <div id="preview" class="vditor-reset">
        <div class="loading">正在渲染...</div>
      </div>
    </div>
  `;
  
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/vditor@3.10.4/dist/index.min.js';
  script.onload = function() {
    Vditor.preview(document.getElementById('preview'), markdownContent, {
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
  };
  document.body.appendChild(script);
  
  document.getElementById('editBtn').addEventListener('click', function() {
    if (markdownContent.length < 1500) {
      window.open(`${CAFE_MD_URL}/zh-CN?content=${encodeURIComponent(markdownContent)}`, '_blank');
    } else {
      const compressed = btoa(unescape(encodeURIComponent(markdownContent)));
      window.open(`${CAFE_MD_URL}/zh-CN?data=${compressed}`, '_blank');
    }
  });
  
  document.getElementById('shareBtn').addEventListener('click', function() {
    if (markdownContent.length < 1500) {
      navigator.clipboard.writeText(`${CAFE_MD_URL}/zh-CN?content=${encodeURIComponent(markdownContent)}`);
      alert('链接已复制到剪贴板！');
    } else {
      alert('内容较长，请点击"在编辑器中打开"后使用分享功能');
    }
  });
  
})();
