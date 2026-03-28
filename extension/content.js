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
  
  document.documentElement.appendChild(overlay);
}

function removeOverlay() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

function isMarkdownFile(file) {
  const validExtensions = ['.md', '.markdown', '.txt'];
  const name = file.name.toLowerCase();
  return validExtensions.some(ext => name.endsWith(ext));
}

function compress(str) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let result = '';
  let i = 0;
  
  const utf8 = unescape(encodeURIComponent(str));
  
  while (i < utf8.length) {
    const c1 = utf8.charCodeAt(i++);
    const c2 = i < utf8.length ? utf8.charCodeAt(i++) : 0;
    const c3 = i < utf8.length ? utf8.charCodeAt(i++) : 0;
    
    const e1 = c1 >> 2;
    const e2 = ((c1 & 3) << 4) | (c2 >> 4);
    const e3 = ((c2 & 15) << 2) | (c3 >> 6);
    const e4 = c3 & 63;
    
    result += chars.charAt(e1) + chars.charAt(e2) + chars.charAt(e3) + chars.charAt(e4);
  }
  
  return result;
}

function openInCafeMD(content, filename) {
  try {
    if (content.length < 1500) {
      const encoded = encodeURIComponent(content);
      window.open(`${CAFE_MD_URL}/zh-CN?content=${encoded}`, '_blank');
    } else {
      const compressed = btoa(unescape(encodeURIComponent(content)));
      const chunkSize = 1800;
      
      if (compressed.length <= chunkSize) {
        window.open(`${CAFE_MD_URL}/zh-CN?data=${compressed}`, '_blank');
      } else {
        const chunks = [];
        for (let i = 0; i < compressed.length; i += chunkSize) {
          chunks.push(compressed.slice(i, i + chunkSize));
        }
        
        const key = 'cafe-md-' + Date.now();
        const chunkData = {};
        chunks.forEach((chunk, i) => {
          chunkData[`${key}-${i}`] = chunk;
        });
        chunkData[`${key}-total`] = chunks.length;
        chunkData[`${key}-filename`] = filename || 'document.md';
        
        chrome.storage.local.set(chunkData, () => {
          window.open(`${CAFE_MD_URL}/zh-CN?chunk=${key}`, '_blank');
        });
      }
    }
  } catch (e) {
    console.error('Cafe MD: Failed to open', e);
    window.open(CAFE_MD_URL, '_blank');
  }
}

function handleDragEnter(e) {
  if (e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
    e.preventDefault();
    e.stopPropagation();
    createOverlay();
  }
}

function handleDragOver(e) {
  if (overlay) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }
}

function handleDragLeave(e) {
  if (overlay) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === overlay || !overlay.contains(e.relatedTarget)) {
      removeOverlay();
    }
  }
}

function handleDrop(e) {
  if (!overlay) return;
  
  e.preventDefault();
  e.stopPropagation();
  removeOverlay();
  
  const files = e.dataTransfer.files;
  
  if (files && files.length > 0) {
    for (const file of files) {
      if (isMarkdownFile(file)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          openInCafeMD(event.target.result, file.name);
        };
        reader.onerror = () => {
          console.error('Cafe MD: Failed to read file');
        };
        reader.readAsText(file);
      }
    }
  }
}

document.addEventListener('dragenter', handleDragEnter, true);
document.addEventListener('dragover', handleDragOver, true);
document.addEventListener('dragleave', handleDragLeave, true);
document.addEventListener('drop', handleDrop, true);

console.log('Cafe MD Extension loaded - drag & drop enabled');
