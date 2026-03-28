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

function openInCafeMD(content, filename) {
  try {
    sessionStorage.setItem('cafe-md-content', content);
    if (filename) {
      sessionStorage.setItem('cafe-md-filename', filename);
    }
    const win = window.open(`${CAFE_MD_URL}/zh-CN?from=extension`, '_blank');
    if (!win) {
      alert('Please allow popups for this extension to work');
    }
  } catch (e) {
    console.error('Cafe MD: Failed to open', e);
    if (content.length < 2000) {
      window.open(`${CAFE_MD_URL}/zh-CN?content=${encodeURIComponent(content)}`, '_blank');
    } else {
      alert('Content too large. Please try a smaller file.');
    }
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
