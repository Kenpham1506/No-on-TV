chrome.storage.sync.get("enabled", ({ enabled }) => {
  console.log("Content script is running. Feature enabled:", enabled);
  if (!enabled) {
    console.log("Feature is disabled. Exiting content script.");
    return;
  }

  // Observer to detect dynamic elements (e.g., video player controls)
  const observer = new MutationObserver(() => {
    const elements = document.querySelectorAll(".ytp-remote-button, .mgp_chromecast, .player-icon-f.pif-chromecast, #chromecast, [id^='chromecast'], [class*='chromecast']");
    if (elements.length > 0) {
      console.log(`Found ${elements.length} elements to replace.`);
      observer.disconnect(); // Stop observing after finding elements

      elements.forEach((element) => {
        console.log("Replacing element with custom button:", element);

        // Create the custom button
        const customButton = document.createElement("button");
        customButton.title = "You are protected by No on TV";
        customButton.style.cursor = "pointer";
        customButton.style.position = "relative";
        customButton.style.top = "-12px";
        customButton.style.background = "none";
        customButton.style.border = "none";
        customButton.style.padding = "5px 10 px 5px 5px";

        // Create image element for the placeholder
        const img = document.createElement("img");
        img.src = "https://i.imgur.com/fjz56CT.png"; // External image URL
        img.alt = "Protected Button";
        img.style.width = "100%";

        customButton.appendChild(img);

        // Add hover tooltip
        customButton.addEventListener("mouseover", () => {
          const tooltip = document.createElement("div");
          tooltip.textContent = "You are protected by No on TV";
          tooltip.style.position = "absolute";
          tooltip.style.background = "#333";
          tooltip.style.color = "#fff";
          tooltip.style.padding = "5px";
          tooltip.style.borderRadius = "5px";
          tooltip.style.top = `${customButton.offsetTop - 30}px`;
          tooltip.style.left = `${customButton.offsetLeft}px`;
          tooltip.classList.add("custom-tooltip");
          document.body.appendChild(tooltip);
          console.log("Tooltip added.");
        });

        customButton.addEventListener("mouseout", () => {
          const tooltip = document.querySelector(".custom-tooltip");
          if (tooltip) {
            tooltip.remove();
            console.log("Tooltip removed.");
          }
        });

        // Add click event to open popup
        customButton.addEventListener("click", () => {
          console.log("Custom button clicked. Feature is enabled.");
        });

        // Replace the original element with the new custom button
        element.replaceWith(customButton);
      });
    } else {
      console.log("No target elements found to replace.");
    }
  });

  // Start observing the document body for changes (e.g., dynamic content loading)
  observer.observe(document.body, { childList: true, subtree: true });
  console.log("Observer started to watch for changes in the DOM.");
});
