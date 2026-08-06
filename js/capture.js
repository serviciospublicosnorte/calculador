async function capturarResultado() {

    // *** Datos para portapapeles *** //
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const alturaCm =
        (parseFloat(document.getElementById("fluidHeight").value) * 100)
            .toFixed(0);

    const input = document.getElementById("fluidHeight");
    input.style.textAlign = "botto";
    input.style.fontSize = "1.25rem";
    input.style.fontWeight = "bold";
    input.style.lineHeight = "normal";
    input.style.padding = ".2rem 0";
    input.style.height = "auto";
    input.style.paddingBottom = "-1rem";
    input.style.boxSizing = "border-box";

    // *** cantidad de litros *** //
    let litros = "0";
    const resultados = document.querySelectorAll(".dato-resultado");
    resultados.forEach(resultado => {
        const texto = resultado.innerText;
        if (texto.includes("Cantidad actual")) {
            litros =
                resultado.querySelector(".cantidad-span")
                    .innerText;
        }
    });

    const textoClipboard =
        `Hoy *${dia}/${mes}/${anio}*, arrancamos con *${alturaCm} cm* que son *${litros}* aproximadamente`;

    // *** Copia al portapapeles *** //
    try {
        await navigator.clipboard.writeText(textoClipboard);
    } catch (error) {
        console.error("No se pudo copiar al portapapeles:", error);
    }

    // *** Captura de imagen *** /
    const elemento = document.querySelector(".results-section");
    const canvas = await html2canvas(elemento, {
        scale: 2,
        backgroundColor: "#ffffff"
    });
    canvas.toBlob(async function (blob) {
        const file = new File(
            [blob],
            "tanque.png",
            { type: "image/png" }
        );
        // *** Android / iPhone *** //
        if (navigator.canShare &&
            navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: "Resultado del tanque"
            });
            return;
        }
        //  *** Descarga automáticamente la captura *** /
        const nombreArchivo =
            `resultado_tanque_de_combustible_${dia}-${mes}-${anio}.png`;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = nombreArchivo;
        a.click();
        URL.revokeObjectURL(a.href);
        window.location.reload();
    });
}


document.getElementById("btnCaptura")
    .addEventListener("click", capturarResultado);
