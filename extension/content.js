const CAFE_MD_URL = 'https://cafe-md.t445481611.workers.dev';

let overlay = null;

function createOverlay() {
  if (overlay) return;
  
  overlay = document.createElement('div');
  overlay.id = 'cafe-md-drop-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(59, 130, 246, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  overlay.innerHTML = `
    <div style="font-size: 80px; margin-bottom: 24px;">📄</div>
    <div style="font-size: 28px; color: white; font-weight: 600; margin-bottom: 12px;">
      Drop to open with Cafe MD
    </div>
    <div style="font-size: 16px; color: rgba(255, 255, 255, 0.85);">
      Markdown files (.md, .markdown, .txt)
    </div>
  `;
  
  document.body.appendChild(overlay);
}

function removeOverlay() {
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
    overlay = null;
  }
}

function isMarkdownFile(file) {
  const validExtensions = ['.md', '.markdown', '.txt'];
  const name = file.name.toLowerCase();
  return validExtensions.some(ext => name.endsWith(ext));
}

function showPreview(content, filename) {
  const previewHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename} - Cafe MD Preview</title>
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
    .toolbar-left { display: flex; align-items: center; gap: 12px; }
    .logo { font-size: 24px; }
    .filename { font-weight: 600; color: #1e293b; font-size: 15px; }
    .toolbar-right { display: flex; align-items: center; gap: 10px; }
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
    .btn-primary { background: #3b82f6; color: white; }
    .btn-primary:hover { background: #2563eb; }
    .btn-secondary { background: #f1f5f9; color: #475569; }
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
    .loading { text-align: center; padding: 48px; color: #94a3b8; }
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
      <button class="btn btn-secondary" id="copyBtn">📋 复制内容</button>
      <button class="btn btn-secondary" id="downloadBtn">⬇️ 下载</button>
      <button class="btn btn-primary" id="openOnlineBtn">🌐 在线编辑</button>
    </div>
  </div>
  <div class="main">
    <div id="preview" class="preview vditor-reset">
      <div class="loading">正在渲染...</div>
    </div>
  </div>
  <script src="https://unpkg.com/vditor@3.10.4/dist/index.min.js"></script>
  <script>
    (function() {
      var content = ${JSON.stringify(content)};
      
      Vditor.preview(document.getElementById('preview'), content, {
        cdn: 'https://unpkg.com/vditor@3.10.4',
        mode: 'light',
        markdown: { toc: true, mark: true, footnotes: true, autoSpace: true },
        math: { inlineDigit: true, engine: 'KaTeX' },
        hljs: { enable: true, lineNumber: true },
      });
      
      document.getElementById('copyBtn').onclick = function() {
        navigator.clipboard.writeText(content).then(function() {
          alert('内容已复制到剪贴板！');
        });
      };
      
      document.getElementById('downloadBtn').onclick = function() {
        var blob = new Blob([content], { type: 'text/markdown' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = '${filename}';
        a.click();
        URL.revokeObjectURL(url);
      };
      
      document.getElementById('openOnlineBtn').onclick = function() {
        var win = window.open('${CAFE_MD_URL}/zh-CN', '_blank');
        if (win) {
          win.onload = function() {
            try {
              win.localStorage.setItem('cafe-md-content', content);
              win.localStorage.setItem('cafe-md-filename', '${filename}');
            } catch(e) {}
          };
        }
      };
    })();
  </script>
</body>
</html>`;
  
  const newDoc = document.open('text/html', '_blank');
  newDoc.write(previewHtml);
  newDoc.close();
}

function openInCafeMD(content, filename) {
  if (content.length < 800) {
    const encoded = encodeURIComponent(content);
    window.open(CAFE_MD_URL + '/zh-CN?content=' + encoded, '_blank');
  } else {
    showPreview(content, filename || 'document.md');
  }
}

function handleDragEnter(e) {
  if (e.dataTransfer && e.dataTransfer.types) {
    const types = Array.from(e.dataTransfer.types);
    if (types.includes('Files')) {
      e.preventDefault();
      e.stopPropagation();
      createOverlay();
    }
  }
}

function handleDragOver(e) {
  if (overlay) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }
}

function handleDragLeave(e) {
  if (overlay) {
    e.preventDefault();
    e.stopPropagation();
    if (!e.relatedTarget || !overlay.contains(e.relatedTarget)) {
      removeOverlay();
    }
  }
}

function handleDrop(e) {
  if (!overlay) return;
  
  e.preventDefault();
  e.stopPropagation();
  removeOverlay();
  
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const files = e.dataTransfer.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (isMarkdownFile(file)) {
        const reader = new FileReader();
        reader.onload = function(event) {
          openInCafeMD(event.target.result, file.name);
        };
        reader.onerror = function() {
          console.error('Cafe MD: Failed to read file');
        };
        reader.readAsText(file);
        break;
      }
    }
  }
}

document.addEventListener('dragenter', handleDragEnter, true);
document.addEventListener('dragover', handleDragOver, true);
document.addEventListener('dragleave', handleDragLeave, true);
document.addEventListener('drop', handleDrop, true);

console.log('Cafe MD Extension loaded - drag & drop enabled');
