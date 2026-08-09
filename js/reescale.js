function scaleCalculator() {
    console.log("AGENTE -->", navigator.userAgent);

    const imageHeader = document.querySelector("#image-header");
    const calculator = document.querySelector(".calculator-container");

    if (!imageHeader || !calculator) {
        console.warn("No se encontraron los elementos necesarios.");
        return;
    }

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    console.log("Viewport:", viewportWidth, "x", viewportHeight);

    if (viewportHeight < 854 && viewportWidth > viewportHeight) {
        const baseHeight = 853;

        const scale =
            Math.round((viewportHeight / baseHeight) * 100) / 100;

        const widthScale = Math.round(100 / scale);

        imageHeader.style.setProperty("height", "11vh", "important");
        imageHeader.style.setProperty("width", "auto", "important");

        calculator.style.setProperty("zoom", scale, "important");
        calculator.style.setProperty("width", `${widthScale}vw`, "important");
        calculator.style.setProperty("max-width", "500vw", "important");

        console.log("Escala:", scale);
        console.log("Escala del ancho:", widthScale);
    } else {
        imageHeader.style.removeProperty("height");
        imageHeader.style.removeProperty("width");

        calculator.style.setProperty("width", "100vw");
        calculator.style.setProperty("zoom", "1");
        calculator.style.removeProperty("max-width");
    }
}

document.addEventListener("DOMContentLoaded", scaleCalculator);
window.addEventListener("resize", scaleCalculator);