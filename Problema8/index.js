/*
------------------------------------------ PROBLEMA 8 -----------------------------------------
Colocar un campo que reciba un número, luego dado ese número mostrarás esa
cantidad en imágenes debajo del campo organizadas de forma acorde al tamaño de la
pantalla. 
Ten en cuenta las siguientes consideraciones:
1. Las imágenes que se mostrarán pueden ser las que quiera y pueden estar en
local o usando algún servicio.
2. El máximo número de imágenes es 15.
3. El tamaño y proporción de las imágenes queda a tu consideración.
*/
// --------------------------------------------------------------------------------------------

let campoNumero = document.getElementById("numero");
let botonBuscar = document.getElementById("buscar");
let campoResultado = document.getElementById("resultado");
// --------------------------------------------------------------------------------------------

/**
 * Si el id es menor que 10 devuelve `00id`; si el id es menor de 100 devuelve
 * `0id`; de lo contrario, devuelve el id.
 * @param id - El id a ser formateado.
 * @returns El id formateado.
 */
function formatearId(id) {
    if (id < 10) {
        return `00${id}`
    } else if (id < 100) {
        return `0${id}`
    } else {
        return id;
    }
}
// --------------------------------------------------------------------------------------------

/**
 * Toma un número del campo de entrada, y si está entre 1 y 15, crea una tarjeta para cada número entre
 * 1 y el número ingresado, y muestra la imagen de pokemon correspondiente.
 */
function main() {
    let numero = Number(campoNumero.value);
    let lista = "";

    if(numero < 1 | numero > 15) {
        lista += `El número debe estar en el rango entre 0 y 15`;
    } else {
        for (let i = 1; i < numero + 1; i++) {
            lista += `<div class="card shadow d-inline-block m-1" style="width: 18rem;">
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatearId(i)}.png" class="card-img-top" alt="imgPokemon">
                    </div>`
        }
    }

    campoResultado.innerHTML = `${lista}`
}

botonBuscar.addEventListener("click", main);