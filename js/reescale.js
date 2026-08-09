const scaleCalculator = () => {
    
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (screen.height < 854 && !isMobile) {
        const baseHeight = 853;
        const scale = Math.round(((100 / baseHeight) * screen.height)) / 100;
        const widthScale = Math.round(100 / scale);

        document.querySelector('.calculator-container').style.zoom = scale;
        document.querySelector('.calculator-container').style.width = `${widthScale}vw`
        document.querySelector('.calculator-container').style.maxWidth = `500vw`;
        
        console.log("Escala: ", scale);
        console.log("Escala del ancho: ", widthScale);
    } else {
        //window.location.reload();
        document.querySelector('.calculator-container').style.width = `100vw`
        document.querySelector('.calculator-container').style.zoom = 1;
        //console.log("Escala del ancho: ", document.querySelector('.calculator-container').style.width);
    }
};

/*
function reloadAfterResize() {

    if (screen.height > 853) {
        window.location.reload();
    }

}
*/

scaleCalculator();

window.addEventListener('resize', scaleCalculator);
window.addEventListener('load', scaleCalculator);
window.addEventListener('DOMContentLoaded', scaleCalculator);

const observer = new MutationObserver(() => {
    scaleCalculator();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
});

///window.addEventListener('resize', reloadAfterResize);

