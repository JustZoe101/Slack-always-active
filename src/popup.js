function start() {
    chrome.storage.local.set({ extensionEnabled: true });
    document.getElementById("btn").innerText = "Stop";
    console.log("Extension started.");
}

function stop() {
    chrome.storage.local.set({ extensionEnabled: false });
    document.getElementById("btn").innerText = "Start";
    console.log("Extension stopped.");
}

function toggle() {
    chrome.storage.local.get("extensionEnabled", (data) => {
        if (data.extensionEnabled) {
            stop();
        } else {
            start();
        }
    });
}

chrome.storage.local.get(
    "extensionEnabled",
    (data) => (document.getElementById("btn").innerText = data.extensionEnabled ? "Stop" : "Start")
);
document.getElementById("btn").addEventListener("click", toggle);
