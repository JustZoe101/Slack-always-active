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

setInterval(() => {
    chrome.idle.queryState(15, (state) => {
        if (state === chrome.idle.IdleState.IDLE) {
            keepActive();
        } else if (state === chrome.idle.IdleState.ACTIVE) {
            stopKeepingActive();
        }
    });
}, 1000);
