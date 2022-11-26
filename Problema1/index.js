/*
------------------------------------------ PROBLEMA 1 -----------------------------------------
Se debe crear una solución que dado 2 números X y Y cualesquiera, se obtenga la
multiplicación de los mismos SIN usar el operador de multiplicación *. 
*/
// --------------------------------------------------------------------------------------------

/**
 * La función multiplicación toma dos números como argumentos y devuelve el producto de los dos
 * números.
 * @param numX - El número que quieres multiplicar.
 * @param numY - El número por el que quieres multiplicar.
 * @returns El resultado de la división de numX por el inverso de numY.
 */
function multiplicacion(numX, numY) {
    return numX/(1/numY);
}
// --------------------------------------------------------------------------------------------

let campoIntX = document.getElementById("numX");
let campoIntY = document.getElementById("numY");
let campoResultado = document.getElementById("resultado");
let multiplicar = document.getElementById("multiplicar");

campoIntX.focus();

// --------------------------------------------------------------------------------------------
/**
 * La función principal obtiene los valores de los campos de entrada, llama a la función de
 * multiplicación y muestra el resultado en el campo de resultados.
 */
function main() {

    let intX = Number(campoIntX.value);
    let intY = Number(campoIntY.value);

    let resultado = multiplicacion(intX, intY);

    campoResultado.textContent = `${intX} x ${intY} = ${resultado}`;

    campoIntX.value = "";
    campoIntY.value = "";
    campoIntX.focus();

}

multiplicar.addEventListener("click", main);