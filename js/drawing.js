function drawTank(diameter, length, fluidHeight) {
    const canvas = document.getElementById('tankCanvas');
    const ctx = canvas.getContext('2d');
    const scale = 50; // Medidor de píxeles

    // Resetea el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Establece el tamaño del tanque
    const tankWidth = diameter * scale;
    const tankHeight = diameter * scale;
    const displayLength = Math.min(length * scale * 0.2, 100); // Reduce la longitud

    // CENTRA EL CANVAS
    const centerX = canvas.width / 2; // Obtiene el centro en horizontal
    const centerY = canvas.height / 2; // Obtiene el centro en vertical

    // Dibuja el tanque
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';

    // Cilindro
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, tankWidth / 2, tankHeight / 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Fluido
    if (fluidHeight > 0) {
        const fluidPixels = fluidHeight * scale;
        const fillHeight = tankHeight / 2 - fluidPixels;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, tankWidth / 2, tankHeight / 2, 0, Math.PI, Math.PI * 2);
        ctx.rect(centerX - tankWidth / 2, centerY - tankHeight / 2, tankWidth, Math.max(0, fillHeight));
        ctx.fill();
    }

    // Corchetes en los costados
    ctx.beginPath();
    ctx.moveTo(centerX - tankWidth / 2, centerY - tankHeight / 2);
    ctx.lineTo(centerX - tankWidth / 2 - displayLength, centerY - tankHeight / 2);
    ctx.lineTo(centerX - tankWidth / 2 - displayLength, centerY + tankHeight / 2);
    ctx.lineTo(centerX - tankWidth / 2, centerY + tankHeight / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + tankWidth / 2, centerY - tankHeight / 2);
    ctx.lineTo(centerX + tankWidth / 2 + displayLength, centerY - tankHeight / 2);
    ctx.lineTo(centerX + tankWidth / 2 + displayLength, centerY + tankHeight / 2);
    ctx.lineTo(centerX + tankWidth / 2, centerY + tankHeight / 2);
    ctx.stroke();
}