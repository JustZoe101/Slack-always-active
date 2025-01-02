let windowInterval = null;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ extensionEnabled: false }, () => {
        console.log("Extension installed and disabled by default.");
    });
});

function keepActive() {
    chrome.tabs.query({ url: "*://app.slack.com/*" }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    localStorage.setItem("extensionKeepActive", "true");
                },
            });

            focusWindow(tabs[0]);

            windowInterval = setInterval(() => {
                focusWindow(tabs[0]);
            }, 1000 * 60); // 1 minute
        }
    });
}

function stopKeepingActive() {
    clearInterval(windowInterval);
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

function focusWindow(tab) {
    console.log("Focussing on Slack window.");
    chrome.windows.update(tab.windowId, { focused: true });
    chrome.tabs.update(tab.id, { active: true });
}

chrome.idle.onStateChanged.addListener((state) => {
    chrome.storage.local.get("extensionEnabled", (data) => {
        console.log("Idle state:", state);

        if (!data.extensionEnabled) {
            return;
        }

        if (state === chrome.idle.IdleState.IDLE) {
            keepActive();
        } else if (state === chrome.idle.IdleState.ACTIVE) {
            stopKeepingActive();
        }
    });
});
