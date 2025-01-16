const toggleFeature = document.getElementById("toggle-feature");

// Get the current feature state from storage and set the checkbox accordingly
chrome.storage.sync.get("enabled", ({ enabled }) => {
  console.log("Popup opened. Current feature state:", enabled);
  toggleFeature.checked = enabled;
});

// Listen for changes to the checkbox and save the new state
toggleFeature.addEventListener("change", () => {
  console.log("Toggle changed. New feature state:", toggleFeature.checked);
  chrome.storage.sync.set({ enabled: toggleFeature.checked });
});
