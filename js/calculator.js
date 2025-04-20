function setupCalculator() {
    const zonaCalculo = document.getElementById('zona-calculo');
    const inputs = ['radius', 'length', 'fluidHeight'];

    // Agrega los eventos
    zonaCalculo.addEventListener('click', calculateVolume);
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateVolume);
    });

    // Realiza el cálculo
    calculateVolume();
}

function calculateVolume() {
    let radius = parseFloat(document.getElementById('radius').value);
    let length = parseFloat(document.getElementById('length').value);
    let fluidHeight = parseFloat(document.getElementById('fluidHeight').value);

    // Verifica si los valore son NaN y de ser así los cambia a 0
    if (isNaN(radius)) {
        radius = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    if (isNaN(fluidHeight)) {
        fluidHeight = 0;
    }

    // Calcula los volúmenes
    const fullVolumeM3 = Math.PI * Math.pow(radius, 2) * length;
    const currentVolumeM3 = calculateLiquidVolume(radius, length, fluidHeight);

    // Convierte a litros
    const fullVolumeLiters = fullVolumeM3.toFixed(2) * 1000;
    const currentVolumeLiters = currentVolumeM3.toFixed(2) * 1000;

    // Imprime los resultados
    const resultElement = document.getElementById('result');

    if (fluidHeight > radius * 2) {
        metros = (radius * 2);

        metros ? `${metros.toFixed(0)}%` // Elimina los decimales para los enteros
            : `${metrostoFixed(2)}%`; // Dos cecimales para números flotantes


        resultElement.innerHTML = `
    <div class="dato-resultado-warning"><img class="warning-sing" src="images/attention.svg" alt="Signo de alerta"><span class="cantidad-span" id="texto-atención" style="color: #c43f35">¡Altura ingresada excede capacidad!</span></div>
    <div class="dato-resultado-metros"><span class="cantidad-texto-span">Máxima altura</span><span class="cantidad-span" style="color: #284173">${metros} metros</span></div>
    <div class="dato-resultado"><span class="cantidad-texto-span">Capacidad del tanque</span><span class="cantidad-span" style="color: #ce813c">${fullVolumeLiters.toFixed(0).toLocaleString().trim()} litros</span></div>
    `;
        // Ver comentario del ELSE para comprender este engéndro
        let warningClass = document.getElementsByClassName("dato-resultado-warning")[0];
        warningClass.style.display = "flex";
      } else {
        const percentageOccupied = (currentVolumeM3 / fullVolumeM3) * 100;
        let formattedPercentage;

        // Verifica si percentageOccupied es NaN
        if (isNaN(percentageOccupied)) {
            formattedPercentage = '0%'; // Establece a 0% si es NaN
        } else {
            formattedPercentage = Number.isInteger(percentageOccupied)
                ? `${percentageOccupied.toFixed(0)}%` // Elimina los decimales para los enteros
                : `${percentageOccupied.toFixed(2)}%`; // Dos cecimales para números flotantes
        }

        resultElement.innerHTML = `
    
    <div class="dato-resultado-warning"><img class="warning-sing" src="images/attention.svg" alt="Signo de alerta"><span class="cantidad-span" id="texto-atención" style="color: #c43f35">¡Altura ingresada excede capacidad!</span></div>
    <div class="dato-resultado"><span class="cantidad-texto-span">Cantidad actual</span><span class="cantidad-span" style="color: #284173">${currentVolumeLiters.toFixed(0).toLocaleString().trim()} litros</span></div>
    <div class="dato-resultado"><span class="cantidad-texto-span">Capacidad total</span><span class="cantidad-span" style="color: #ce813c">${fullVolumeLiters.toFixed(0).toLocaleString().trim()} litros</span></div>
    <div class="dato-resultado"><span class="cantidad-texto-span">Porcentaje ocupado</span><span class="cantidad-span" style="color: #40a4bc">${formattedPercentage}</span></div>
    `;
        /* Cargo dos veces acá en el verdadero y en el falso el "dato-resultado-warning" porque al usar "display" con "none" y "flex", se elimina el retardo que ocurría al cargar la imagen "attention.svg" la primera vez.
        Si bien una vez que se cargaba en la cache ya no volvía a pasar hasta que se vaciara otra vez la cache, era bastante notorio la verdad. Seguro hay varias formas mucho más inteligentes y elegantes de resolver ese
        retardo molesto de la primera carga, pero atarlo así con alambre me funcionó y yo no soy Gladys Rizzo ni Noemí García y esto no es Clementina, que tanto joder. Quizás debería mandar la línea directamente en el ".html" y
        dejar acá solo el  "warningClass.style.display =", pero me pareció un toque menos sucio dejarlo así como está. */
        let warningClass = document.getElementsByClassName("dato-resultado-warning")[0];
        warningClass.style.display = "none";
    }
    // Dibuja el tanque
    drawTank(radius * 2, length, fluidHeight);
}

function calculateLiquidVolume(radius, length, fluidHeight) {
    if (fluidHeight <= 0) return 0;
    if (fluidHeight >= radius * 2) return Math.PI * Math.pow(radius, 2) * length;

    const segmentArea = Math.pow(radius, 2) * Math.acos((radius - fluidHeight) / radius)
        - (radius - fluidHeight) * Math.sqrt(2 * radius * fluidHeight - Math.pow(fluidHeight, 2));

    return segmentArea * length;
}