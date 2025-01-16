chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed. Default feature state is enabled.");
  chrome.storage.sync.set({ enabled: true });
});

chrome.action.onClicked.addListener(() => {
  console.log("Extension icon clicked. Opening options page...");
  chrome.runtime.openOptionsPage();
});
