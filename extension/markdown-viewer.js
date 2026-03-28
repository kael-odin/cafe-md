(function() {
  'use strict';
  
  const CAFE_MD_URL = 'https://cafe-md.t445481611.workers.dev';
  
  const pathname = window.location.pathname.toLowerCase();
  const isMarkdownFile = pathname.endsWith('.md') || pathname.endsWith('.markdown');
  const isTxtFile = pathname.endsWith('.txt');
  
  if (!isMarkdownFile && !isTxtFile) return;
  
  const rawContent = document.body.innerText || document.body.textContent || '';
  if (rawContent.length < 5) return;
  
  const filename = decodeURIComponent(window.location.pathname.split('/').pop()) || 'document.md';
  
  document.documentElement.innerHTML = `
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${filename} - Cafe MD</title>
      <link rel="stylesheet" href="https://unpkg.com/vditor@3.10.4/dist/index.css" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }
        .toolbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 52px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          z-index: 1000;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo { font-size: 24px; }
        .filename {
          font-weight: 600;
          color: #1e293b;
          font-size: 15px;
        }
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        .btn-primary:hover { background: #2563eb; }
        .btn-secondary {
          background: #f1f5f9;
          color: #475569;
        }
        .btn-secondary:hover { background: #e2e8f0; }
        .main {
          margin-top: 52px;
          padding: 32px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .preview {
          background: #fff;
          border-radius: 12px;
          padding: 32px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          min-height: calc(100vh - 116px);
        }
        .loading {
          text-align: center;
          padding: 48px;
          color: #94a3b8;
        }
        .vditor-reset { background: transparent !important; }
      </style>
    </head>
    <body>
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
      <div class="main">
        <div id="preview" class="preview vditor-reset">
          <div class="loading">正在渲染...</div>
        </div>
      </div>
      <script src="https://unpkg.com/vditor@3.10.4/dist/index.min.js"></script>
      <script>
        const content = ${JSON.stringify(rawContent)};
        
        Vditor.preview(document.getElementById('preview'), content, {
          cdn: 'https://unpkg.com/vditor@3.10.4',
          mode: 'light',
          markdown: { toc: true, mark: true, footnotes: true, autoSpace: true },
          math: { inlineDigit: true, engine: 'KaTeX' },
          hljs: { enable: true, lineNumber: true },
        });
        
        document.getElementById('editBtn').addEventListener('click', function() {
          const c = content;
          if (c.length < 1500) {
            window.open('${CAFE_MD_URL}/zh-CN?content=' + encodeURIComponent(c), '_blank');
          } else {
            const compressed = btoa(unescape(encodeURIComponent(c)));
            window.open('${CAFE_MD_URL}/zh-CN?data=' + compressed, '_blank');
          }
        });
        
        document.getElementById('shareBtn').addEventListener('click', function() {
          const c = content;
          if (c.length < 1500) {
            navigator.clipboard.writeText('${CAFE_MD_URL}/zh-CN?content=' + encodeURIComponent(c));
            alert('分享链接已复制到剪贴板！');
          } else {
            alert('内容较长，请点击"在编辑器中打开"后使用分享功能');
          }
        });
      </script>
    </body>
  `;
  
})();
