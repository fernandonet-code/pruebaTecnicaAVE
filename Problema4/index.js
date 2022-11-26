/*
------------------------------------------ PROBLEMA 4 -----------------------------------------
Dado un arreglo de números (cualquiera) sacar la siguiente información:
● Cantidad de elementos del arreglo.
● Porcentaje de números pares e impares.
● Porcentaje de números mayores a 1000.
● Cuál es el mayor y menor valor.
● Asuma los siguientes indicadores: Tome en cuenta que el mayor número representa el 100%, 
  indique cual es el porcentaje del número mínimo y el porcentaje del promedio de todos los 
  números
*/
// --------------------------------------------------------------------------------------------

/**
 * Toma una arreglo como argumento y devuelve la longitud de ese arreglo.
 * @returns La longitud del arreglo.
 */
function largoArray([...arg]) {
    return arg.length;
}
// --------------------------------------------------------------------------------------------

/**
 * Toma un arreglo de números como argumento y devuelve un objeto con el porcentaje de números pares e
 * impares en el arreglo.
 * @returns Un objeto con dos propiedades, pares e impares.
 */
function procentajeParesImpares([...arg]) {
    let pares = [];
    let impares = [];

    for (let i = 0; i < largoArray(arg); i++) {
        if (arg[i] % 2 === 0) {
            pares.push(arg[i]);
        } else {
            impares.push(arg[i]);
        }
    }

    let porcentajePares = Number(((pares.length / largoArray(arg)) * 100).toFixed(2));
    let procentajeImpares = Number(((impares.length / largoArray(arg)) * 100).toFixed(2));

    return {
        pares: porcentajePares,
        impares: procentajeImpares
    };
}
// --------------------------------------------------------------------------------------------

/**
 * Toma un arreglo de números como argumento y devuelve el porcentaje de números en el arreglo que son
 * mayores que 1000.
 * @returns El porcentaje de números mayores que 1000.
 */
function porcentajeMayores1000([...arg]) {
    let mayores = [];

    for (let i = 0; i < largoArray(arg); i++) {
        if (arg[i] > 1000) {
            mayores.push(arg[i]);
        }
    }

    let porcentajeMayores = Number(((mayores.length / largoArray(arg)) * 100).toFixed(2));

    return porcentajeMayores;
}
// --------------------------------------------------------------------------------------------

/**
 * Toma un arreglo de números como argumento, la ordena y devuelve un objeto con el número más alto
 * y el nmero más bajo del arreglo.
 * @returns Un objeto con dos propiedades, menor y mayor.
 */
function mayorYMenor([...arg]) {
    let arrayOrdenado = arg.sort(function (a, b) {
        return a - b;
    })

    let menor = arrayOrdenado[0];
    let mayor = arrayOrdenado[largoArray(arg) - 1];

    return { menor, mayor };
}
// --------------------------------------------------------------------------------------------

/**
 * Toma un arreglo de números, encuentra los números más grandes y más pequeños, luego calcula el
 * porcentaje del número más pequeño en comparación con el número más grande y el porcentaje del
 * promedio de todos los números en comparación con el número más grande.
 * @returns Un objeto con dos propiedades: mínimo y promedio.
 */
function porcentajes([...arg]) {
    let numeros = mayorYMenor(arg);
    let porcentajeMinimo = Number(((numeros.menor / numeros.mayor) * 100).toFixed(2));
    
    let sumatoria = arg.reduce(function (valorPrevio, valorActual) {
        return Number(valorActual) + Number(valorPrevio);
    })

    let promedio = sumatoria / largoArray(arg);

    let porcentajePromedio = Number(((promedio / numeros.mayor) * 100).toFixed(2));

    return {
        minimo: porcentajeMinimo,
        promedio: porcentajePromedio
    }

}
// --------------------------------------------------------------------------------------------

let campoArray = document.getElementById("array");
let botonCalcular = document.getElementById("calcular");
let campoResultado = document.getElementById("resultado");

campoArray.focus();

function main() {
    let array = campoArray.value.split(",");

    campoResultado.innerHTML = `<div class="card m-auto w-50" style="width: 18rem;">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Cantidad de elementos del arreglo: <strong>${largoArray(array)}</strong></li>
                                        <li class="list-group-item">Porcentaje de números pares: <strong>${procentajeParesImpares(array).pares} %</strong></li>
                                        <li class="list-group-item">Porcentaje de números impares: <strong>${procentajeParesImpares(array).impares} %</strong></li>
                                        <li class="list-group-item">Porcentaje de números mayores a 1000: <strong>${porcentajeMayores1000(array)} %</strong></li>
                                        <li class="list-group-item">El número menor del arreglo es: <strong>${mayorYMenor(array).menor}</strong></li>
                                        <li class="list-group-item">El número mayor del arreglo es: <strong>${mayorYMenor(array).mayor}</strong></li>
                                        <li class="list-group-item">Porcentaje del número minimo: <strong>${porcentajes(array).minimo} %</strong></li>
                                        <li class="list-group-item">Porcentaje del promedio de todos los números: <strong>${porcentajes(array).promedio} %</strong></li>
                                    </ul>
                                </div>`
}

botonCalcular.addEventListener("click", main);