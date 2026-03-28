const CAFE_MD_URL = 'https://cafe-md.t445481611.workers.dev';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'open-with-cafe-md',
    title: 'Open with Cafe MD',
    contexts: ['selection'],
  });
  
  chrome.contextMenus.create({
    id: 'open-file-with-cafe-md',
    title: 'Open .md file with Cafe MD',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'open-with-cafe-md' && info.selectionText) {
    const encodedContent = encodeURIComponent(info.selectionText);
    chrome.tabs.create({
      url: `${CAFE_MD_URL}/zh-CN?content=${encodedContent}`,
    });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: `${CAFE_MD_URL}/zh-CN`,
  });
});

chrome.fileBrowserHandler?.onExecute.addListener(async (id, details) => {
  if (id === 'cafe-md-open') {
    const entries = details.entries;
    if (entries && entries.length > 0) {
      for (const entry of entries) {
        const fileEntry = entry;
        const file = await new Promise((resolve) => {
          fileEntry.file(resolve);
        });
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const encodedContent = encodeURIComponent(content);
          chrome.tabs.create({
            url: `${CAFE_MD_URL}/zh-CN?content=${encodedContent}`,
          });
        };
        reader.readAsText(file);
      }
    }
  }
});
