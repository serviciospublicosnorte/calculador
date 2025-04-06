function setupCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const inputs = ['radius', 'length', 'fluidHeight'];

    // Add event listeners
    calculateBtn.addEventListener('click', calculateVolume);
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateVolume);
    });

    // Initial calculation
    calculateVolume();
}

function calculateVolume() {
    const radius = parseFloat(document.getElementById('radius').value);
    const length = parseFloat(document.getElementById('length').value);
    const fluidHeight = parseFloat(document.getElementById('fluidHeight').value);

    // Calculate volumes
    const fullVolumeM3 = Math.PI * Math.pow(radius, 2) * length;
    const currentVolumeM3 = calculateLiquidVolume(radius, length, fluidHeight);

    // Convert to liters
    const fullVolumeLiters = fullVolumeM3.toFixed(2) * 1000;
    const currentVolumeLiters = currentVolumeM3.toFixed(2) * 1000;

    // Display results
    const resultElement = document.getElementById('result');

    if (fluidHeight > radius * 2) {
        resultElement.innerHTML = `
        <br><span class="QuaintitySpan" style="color: red">ATENCIÓN: la cantidad de ingresada excede la capacidad del tanque</span><br>
        Máxima altura: <span class="QuaintitySpan" style="color: green">${(radius * 2).toFixed(2)} metros</span><br>
        Capacidad del tanque: <span class="QuaintitySpan" style="color: blue">${fullVolumeLiters.toFixed(2).toLocaleString()} litros</span>
    `;
    } else {
        resultElement.innerHTML = `
        Cantidad actual: <span class="QuaintitySpan" style="color: blue">${currentVolumeLiters.toFixed(0).toLocaleString()} litros</span><br>
        Capacidad total: <span class="QuaintitySpan" style="color: green">${fullVolumeLiters.toFixed(0).toLocaleString()} litros</span><br>
        Porcentaje ocupado: <span class="QuaintitySpan" style="color: orange">${((currentVolumeM3 / fullVolumeM3) * 100).toFixed(2)}%</span>
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