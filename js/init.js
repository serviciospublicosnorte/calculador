document.addEventListener("DOMContentLoaded", () => {
    setupCalculator();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("js/sw.js")
            .catch(error => {
                console.error("Error registrando Service Worker:", error);
            });
    }
});