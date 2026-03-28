const CAFE_MD_URL = 'https://cafe-md.t445481611.workers.dev';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'open-with-cafe-md',
    title: 'Open with Cafe MD',
    contexts: ['selection'],
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
