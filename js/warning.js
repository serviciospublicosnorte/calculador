function syncHeights() {
    const resultadoElements = document.querySelectorAll('.dato-resultado');
    const warningElements = document.querySelectorAll('.dato-resultado-warning');
    /*
    if (resultadoElements.length > 0) {
        // Obtiene la altura del elemento "resultado" (máx altura de ser necesario)
        const resultadoHeight = resultadoElements[0].offsetHeight + 'px';

        // Cambia la altura a "dato-resultado-warning"
        warningElements.forEach(el => {
            el.style.height = resultadoHeight;
        });
    }*/
}

// Arranca en la carga inicial
document.addEventListener('DOMContentLoaded', syncHeights);

// Chequea si hubo cambios en el DOM
const observer = new MutationObserver(syncHeights);
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true, // En caso de que haya cambios
    attributeFilter: ['class'] // Verifica cambio de clases
});

// También sincroniza cuando cambia el tamaño de la ventana
window.addEventListener('resize', syncHeights);