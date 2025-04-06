function setupCalculator() {
    const zonaCalculo = document.getElementById('zona-calculo');
    const inputs = ['radius', 'length', 'fluidHeight'];

    // Add event listeners
    zonaCalculo.addEventListener('click', calculateVolume);
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateVolume);
    });

    // Initial calculation
    calculateVolume();
}

function calculateVolume() {
    let radius = parseFloat(document.getElementById('radius').value);
    let length = parseFloat(document.getElementById('length').value);
    let fluidHeight = parseFloat(document.getElementById('fluidHeight').value);

    // Check if the values are NaN and set them to 0 if they are
    if (isNaN(radius)) {
        radius = 0;
    }
    if (isNaN(length)) {
        length = 0;
    }
    if (isNaN(fluidHeight)) {
        fluidHeight = 0;
    }

    // Calculate volumes
    const fullVolumeM3 = Math.PI * Math.pow(radius, 2) * length;
    const currentVolumeM3 = calculateLiquidVolume(radius, length, fluidHeight);

    // Convert to liters
    const fullVolumeLiters = fullVolumeM3.toFixed(2) * 1000;
    const currentVolumeLiters = currentVolumeM3.toFixed(2) * 1000;

    // Display results
    const resultElement = document.getElementById('result');

    if (fluidHeight > radius * 2) {
        metros = (radius * 2);
            
        metros ? `${metros.toFixed(0)}%` // No decimals for whole numbers
            : `${metrostoFixed(2)}%`; // Two decimals for non-whole numbers 
                 
        resultElement.innerHTML = `
    <div class="dato-resultado"><img src="images/attention.png" alt="Signo de alerta"> <span class="cantidad-span" style="color: red">¡La altura ingresada excede la capacidad del tanque!</span></div>
    <div class="dato-resultado">Máxima altura<span class="QuaintitySpan" style="color: green">${metros} metros</span></div>
    <div class="dato-resultado">Capacidad del tanque<span class="QuaintitySpan" style="color: blue">${fullVolumeLiters.toFixed(0).toLocaleString().trim()} litros</span></div>
    `;
    } else {
        const percentageOccupied = (currentVolumeM3 / fullVolumeM3) * 100;
        let formattedPercentage;

        // Check if percentageOccupied is NaN
        if (isNaN(percentageOccupied)) {
            formattedPercentage = '0%'; // Set to 0% if NaN
        } else {
            formattedPercentage = Number.isInteger(percentageOccupied)
                ? `${percentageOccupied.toFixed(0)}%` // No decimals for whole numbers
                : `${percentageOccupied.toFixed(2)}%`; // Two decimals for non-whole numbers
        }

        resultElement.innerHTML = `
    <div class="dato-resultado"><span class="cantidad-span">Cantidad actual</span><span class="cantidad-span" style="color: blue">${currentVolumeLiters.toFixed(0).toLocaleString().trim()} litros</span></div>
    <div class="dato-resultado"><span class="cantidad-span">Capacidad total</span><span class="cantidad-span" style="color: green">${fullVolumeLiters.toFixed(0).toLocaleString().trim()} litros</span></div>
    <div class="dato-resultado"><span class="cantidad-span">Porcentaje ocupado</span><span class="cantidad-span" style="color: orange">${formattedPercentage}</span></div>
    `;
    }
    // Update visualization
    drawTank(radius * 2, length, fluidHeight);
}

function calculateLiquidVolume(radius, length, fluidHeight) {
    if (fluidHeight <= 0) return 0;
    if (fluidHeight >= radius * 2) return Math.PI * Math.pow(radius, 2) * length;

    const segmentArea = Math.pow(radius, 2) * Math.acos((radius - fluidHeight) / radius)
        - (radius - fluidHeight) * Math.sqrt(2 * radius * fluidHeight - Math.pow(fluidHeight, 2));

    return segmentArea * length;
}