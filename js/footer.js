document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    const bodyHeight = document.body.offsetHeight;
    const viewportHeight = window.innerHeight;

    if (bodyHeight < viewportHeight) {
        footer.style.position = "absolute";
        footer.style.bottom = "1rem";
        footer.style.width = "100%";
    }
});