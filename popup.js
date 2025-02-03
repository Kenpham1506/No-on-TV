const toggleFeature = document.getElementById("toggle-feature");

// Get the current feature state from storage and set the checkbox accordingly
chrome.storage.sync.get("enabled", ({ enabled }) => {
  console.log("Popup opened. Current feature state:", enabled);
  toggleFeature.checked = enabled;
});

document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("send-button");

  sendButton.addEventListener("click", function () {
    const webhookUrl = "https://discord.com/api/webhooks/1336075064562417725/a4ElwNVVWA7ZCZcojPyXIaPqGZ2R17KoNOeggFJHiUSTRSj4tKjczyvzPcQrvuaLeoRo";

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
      const currentTab = tabs.length ? tabs[0].url : "No active tab found";
      const content = currentTab;

      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      })
      .then(response => {
        if (response.ok) {
          alert("Sent successfully!");
        } else {
          alert("Failed to send.");
        }
      })
      .catch(error => {
        alert("Error sending: " + error);
      });
    });
  });
});
