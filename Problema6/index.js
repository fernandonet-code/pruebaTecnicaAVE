/*
------------------------------------------ PROBLEMA 6 -----------------------------------------
Crear una página en donde se muestre un campo de texto que permita buscar en el
siguiente API: https://pokeapi.co/, por el número o nombre del pokémon y muestre en
pantalla los siguientes datos: Nombre, número, tipo, peso, altura y una imágen.
*/
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
 * Toma el nombre o id de un pokémon y devuelve un objeto con el id, el nombre, el tipo, el peso, la
 * altura y la imagen del pokémon.
 * @param nombreId - El nombre o ID del pokemon que quieres buscar.
 * @returns Un objeto con las siguientes propiedades: id, nombre, tipo, peso, altura, imagen.
 */
async function buscarPokemon(nombreId) {
    let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreId}/`, {
        method: "GET"
    })
    
    let data = await respuesta.json();
    
    let nombre = data.name
    let peso = data.weight;
    let id = data.id;
    let altura = data.height;
    let imagen = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatearId(id)}.png`;

    let tipo = data.types.map(function (objeto) {
        return objeto.type.name;
    })
    
    return { id, nombre, tipo, peso, altura, imagen }
}
// --------------------------------------------------------------------------------------------

let campoResultado = document.getElementById("resultado");
let botonBuscar = document.getElementById("buscar");
let campoNombreId = document.getElementById("nombreId");

campoNombreId.focus();

async function main() {
    let infoPokemon = await buscarPokemon(campoNombreId.value);

    campoResultado.innerHTML = `<div class="card m-auto" style="width: 18rem;">
                                    <img src="${infoPokemon.imagen}" class="card-img-top" alt="imgPokemon">
                                    <div class="card-body">
                                        <p class="my-1"><strong>Nombre:</strong> ${infoPokemon.nombre}</p>
                                        <p class="my-1"><strong>Id:</strong> ${infoPokemon.id}</p>
                                        <p class="my-1"><strong>Tipo:</strong> ${infoPokemon.tipo}</p>
                                        <p class="my-1"><strong>Peso:</strong> ${infoPokemon.peso}</p>
                                        <p class="my-1"><strong>Altura:</strong> ${infoPokemon.peso}</p>
                                    </div>
                                </div>`
    
    campoNombreId.value = "";
}

botonBuscar.addEventListener("click", main);