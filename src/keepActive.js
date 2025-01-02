console.log("Keep Active is running!");

let interval = setInterval(clicker, Math.random() * (1000 - 333) + 333);

function clicker() {
    if (localStorage.getItem("extensionKeepActive") === "true") {
        document
            .getElementsByClassName("p-ia__nav__user__button")[0]
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));

        clearInterval(interval);

        interval = setInterval(clicker, Math.random() * (1000 - 333) + 333);
    }
}

setInterval(() => {
    if (localStorage.getItem("extensionKeepActive") === "true") {
        location.reload();
    }
}, 1000 * 60 * 20); // 20 minutes
