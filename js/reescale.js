const scaleCalculator = () => {
   
    //const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    console.log("AGENTE --> ", navigator.userAgent);
    //"(max-height: 853px) and (pointer: fine) and (hover: hover)"
    //const isShortDesktop = window.matchMedia("(pointer: fine) and (hover: hover)").matches; 
    const agent = navigator.userAgent;
    const isMobile = (agent.includes("Android") || agent.includes("iPhone") || agent.includes("Mobile"));

    const imageHeader = document.querySelector('#image-header');
    const calculator = document.querySelector('.calculator-container');

    if (screen.height < 854 && window.innerWidth > window.innerHeight) {
        const baseHeight = 853;

        const scale = Math.round((screen.height / baseHeight) * 100) / 100;
        const widthScale = Math.round(100 / scale);

        imageHeader.style.setProperty('height', '11vh', 'important');
        imageHeader.style.setProperty('width', 'auto', 'important');

        calculator.style.setProperty('zoom', scale, 'important');
        calculator.style.setProperty('width', `${widthScale}vw`, 'important');
        calculator.style.setProperty('max-width', '500vw', 'important');

        console.log('Escala:', scale);
        console.log('Escala del ancho:', widthScale);
    } else {
        calculator.style.width = '100vw';
        calculator.style.zoom = '1';
    }
  
};

/*
function reloadAfterResize() {

    if (screen.height > 853) {
        window.location.reload();
    }

}
*/

/*
scaleCalculator();

window.addEventListener('resize', scaleCalculator);
window.addEventListener('load', scaleCalculator);
const observer = new MutationObserver(() => {
    scaleCalculator();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
});
*/

//scaleCalculator();

document.addEventListener('DOMContentLoaded', () => {
    scaleCalculator();

    window.addEventListener('resize', scaleCalculator);

    const observer = new MutationObserver(() => {
        scaleCalculator();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});


window.addEventListener('DOMContentLoaded', scaleCalculator);

window.addEventListener('resize', scaleCalculator);