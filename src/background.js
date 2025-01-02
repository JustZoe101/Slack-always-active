function keepActive() {
    chrome.tabs.query({ url: "*://app.slack.com/*" }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    localStorage.setItem("extensionKeepActive", "true");
                },
            });
            chrome.windows.update(tabs[0].windowId, { focused: true });
            chrome.tabs.update(tabs[0].id, { active: true });
        }
    });
}

function stopKeepingActive() {
    chrome.tabs.query({ url: "*://app.slack.com/*" }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    localStorage.setItem("extensionKeepActive", "false");
                },
            });
        }
    });
}

chrome.idle.onStateChanged.addListener((state) => {
    console.log("Idle state:", state);

    if (state === "idle") {
        keepActive();
    } else if (state === "active") {
        stopKeepingActive();
    }
});
