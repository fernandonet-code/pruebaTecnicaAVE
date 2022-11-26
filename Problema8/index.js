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

function eliminarImagenes() {
    let tarjeta = document.getElementById("resultado");
    console.log(tarjeta)
    if (tarjeta !== null) {
        for (var i = 0; i < tarjeta.children.length; i++) {
            var imagen = tarjeta.children[i];
            tarjeta.removeChild(imagen);
        }
    }
}

function crearTarjetas(numero) {
    for (let i = 1; i < numero + 1; i++) {
        let div = document.createElement("div");
        div.id = `tarjeta${i}`;

        div.innerHTML = `<p>Hola Mundo</p>`

        campoResultado.appendChild(div);
    }
}

function main() {
    let numero = Number(campoNumero.value);
    eliminarImagenes();
    crearTarjetas(numero);
}

botonBuscar.addEventListener("click", main);