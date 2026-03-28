const CAFE_MD_URL = 'https://cafe-md.t445481611.workers.dev';

let overlay = null;

function createOverlay() {
  if (overlay) return;
  
  overlay = document.createElement('div');
  overlay.id = 'cafe-md-drop-overlay';
  overlay.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(59, 130, 246, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="
        font-size: 64px;
        margin-bottom: 20px;
      ">📄</div>
      <div style="
        font-size: 24px;
        color: white;
        font-weight: 600;
        margin-bottom: 10px;
      ">Drop to open with Cafe MD</div>
      <div style="
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
      ">Markdown files (.md, .markdown, .txt)</div>
    </div>
  `;
  document.body.appendChild(overlay);
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

function openInCafeMD(content) {
  const encodedContent = encodeURIComponent(content);
  window.open(`${CAFE_MD_URL}/zh-CN?content=${encodedContent}`, '_blank');
}

document.addEventListener('dragenter', (e) => {
  if (e.dataTransfer.types.includes('Files')) {
    e.preventDefault();
    createOverlay();
  }
});

document.addEventListener('dragover', (e) => {
  if (overlay) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }
});

document.addEventListener('dragleave', (e) => {
  if (overlay && !e.relatedTarget) {
    removeOverlay();
  }
});

document.addEventListener('drop', (e) => {
  if (!overlay) return;
  
  e.preventDefault();
  removeOverlay();
  
  const files = e.dataTransfer.files;
  
  for (const file of files) {
    if (isMarkdownFile(file)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        openInCafeMD(event.target.result);
      };
      reader.readAsText(file);
    }
  }
});

if (document.readyState === 'complete') {
  if (document.body && document.body.textContent.trim()) {
    const content = document.body.textContent;
    if (content.length > 50 && content.length < 100000) {
      console.log('Cafe MD: Page content detected, you can open it with the extension');
    }
  }
}
