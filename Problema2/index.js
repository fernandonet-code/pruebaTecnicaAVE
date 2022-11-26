/*
------------------------------------------ PROBLEMA 2 -----------------------------------------
Genere una serie de funciones (Una por cada ítem) que consuma de la página de
https://pokeapi.co/ y retorne lo siguiente:

● Suma total de pokemones por tipo, debe recibir el tipo en string.
● Dado 2 tipos de pokémon retornar todos los pokemones que cumplen con esos 2 tipos.
● Dado el nombre de un pokémon retornar el número del mismo.
● Dado el número de un pokémon retornar un objeto con sus 6 stats base
● Realizar una función que reciba un arreglo de números (Ids de pokémon) y un ordenador y retorne 
  los pokémon en un arreglo con su nombre, tipo y peso ordenados según se indique por la función 
  por uno de estos 3 indicadores.
● Recibir un número y un tipo (de pokémon) y retornar un true o false si el pokémon de ese número 
  posee este tipo.
*/

// --------------------------------------------------------------------------------------------
function totalPokemonTipo(tipo) {
    return new Promise(async function (resolve, reject) {
        try {
            let respuesta = await fetch(`https://pokeapi.co/api/v2/type/${tipo}/`, {
                method: "GET"
            });

            let data = await respuesta.json();
            resolve(data.pokemon.length);

        } catch (error) {
            reject(error);
        }
    })
}
// --------------------------------------------------------------------------------------------

function totalPokemonTipos(tipo1, tipo2) {
    return new Promise(async function (resolve, reject) {
        try {
            let totalPokemones = [];
            let tipos = [tipo1, tipo2];
            let pokemones = [];

            // Se obtienen tanto los pokemones de tipo 1 como los pokemones de tipo 2
            for (let i = 0; i < tipos.length; i++) {
                let respuesta = await fetch(`https://pokeapi.co/api/v2/type/${tipos[i]}/`, {
                    method: "GET"
                });
                let data = await respuesta.json();
                pokemones[i] = data.pokemon.map(function (elemento) {
                    return elemento.pokemon.name;
                })
            }

            // Se evalua si un poquemon de tipo 1 tambien se encuentra presente el el grupo de pokemones de tipo 2
            for (let i = 0; i < pokemones[0].length; i++) {
                if (pokemones[1].includes(pokemones[0][i])) {
                    totalPokemones.push(pokemones[0][i]);
                }
            }
            resolve(totalPokemones);
        } catch (error) {
            reject(error)
        }
    })
}
// --------------------------------------------------------------------------------------------

function obtenerIdPokemon(nombre) {
    return new Promise(async function (resolve, reject) {
        try {
            let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`, {
                method: "GET"
            });

            let data = await respuesta.json();
            resolve(data.id);

        } catch (error) {
            reject(error);
        }
    })
}
// --------------------------------------------------------------------------------------------

function obtenerStatsPokemon(id) {
    return new Promise(async function (resolve, reject) {
        try {
            let stats = {};

            let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
                method: "GET"
            });
            let data = await respuesta.json();

            data.stats.forEach(async function (elemento) {
                let stat = elemento.stat.name;
                let baseStat = elemento.base_stat;
                stats[stat] = baseStat;
            })

            resolve(stats);
        } catch (error) {
            reject(error);
        }
    })
}
// --------------------------------------------------------------------------------------------

function ordenarPokemones([...ids], ordenador) {
    return new Promise(async function (resolve, reject) {
        try {
            let pokemones = [];

            for (let i = 0; i < ids.length; i++) {
                let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids[i]}/`, {
                    method: "GET"
                });
                let data = await respuesta.json();
                let nombre = data.name;
                let tipo = data.types.map(function (elemento) {
                    return elemento.type.name;
                })
                let peso = data.weight;

                pokemones.push({ nombre, tipo, peso });
            }

            pokemones.sort(function (pokemon1, pokemon2) {
                switch (ordenador) {
                    case "nombre":
                        if (pokemon1.nombre > pokemon2.nombre) {
                            return 1;
                        } else if (pokemon1.nombre < pokemon2.nombre) {
                            return -1;
                        } else {
                            return 0;
                        }
                    case "peso":
                        return pokemon1.peso - pokemon2.peso;
                    default:
                        break;
                }
            });

            resolve(pokemones);

        } catch (error) {
            reject(error)
        }
    })
}
// --------------------------------------------------------------------------------------------

function confirmarTipoPokemon(id, tipo) {
    return new Promise(async function (resolve, reject) {
        try {
            let stats = {};

            let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
                method: "GET"
            });
            let data = await respuesta.json();

            let pokemonTipos = data.types.map(function (elemento) {
                return elemento.type.name;
            })
            
            resolve(pokemonTipos.includes(tipo));
        } catch (error) {
            reject(error);
        }
    })
}
// --------------------------------------------------------------------------------------------

let campoTipo = document.getElementById("tipo");
let botonBuscar1 = document.getElementById("buscar1");
let campoResultado1 = document.getElementById("resultado1");

let campoTipo1Tipo2 = document.getElementById("tipo1-tipo2");
let botonBuscar2 = document.getElementById("buscar2");
let campoResultado2 = document.getElementById("resultado2");

let campoNombre = document.getElementById("nombre");
let botonBuscar3 = document.getElementById("buscar3");
let campoResultado3 = document.getElementById("resultado3");

let campoNumero = document.getElementById("numero");
let botonBuscar4 = document.getElementById("buscar4");
let campoResultado4 = document.getElementById("resultado4");

let campoArregloIds = document.getElementById("arregloIds");
let campoOrdenador = document.getElementById("ordenador")
let botonBuscar5 = document.getElementById("buscar5");
let campoResultado5 = document.getElementById("resultado5");

let campoNumeroPokemon = document.getElementById("numeroPokemon");
let campoTipoPokemon = document.getElementById("tipoPokemon")
let botonBuscar6 = document.getElementById("buscar6");
let campoResultado6 = document.getElementById("resultado6");

campoTipo.focus();

async function requerimientoUno() {
    let tipo = campoTipo.value;
    campoResultado1.innerHTML = `<p>La suma total de pokemones del tipo <strong>${tipo}</strong> es: <strong>${await totalPokemonTipo(tipo)}</strong></p>`
}

async function requerimientoDos() {
    let tipos = campoTipo1Tipo2.value.split(",");
    campoResultado2.innerHTML = `<p>Todos los pokemones que cumplen con los tipos <strong>${tipos[0]}</strong> y <strong>${tipos[1]}</strong> son: <strong>${await totalPokemonTipos(tipos[0], tipos[1])}</strong></p>`
}

async function requerimientoTres() {
    let nombre = campoNombre.value;
    campoResultado3.innerHTML = `<p>El número del pokémon <strong>${nombre}</strong> es: <strong>${await obtenerIdPokemon(nombre)}</strong></p>`
}

async function requerimientoCuatro() {
    let numeroPokemon = campoNumero.value;
    let stats = await obtenerStatsPokemon(numeroPokemon);
    let lista = "";

    Object.keys(stats).forEach(function (stat) {
        lista += `<li class="list-group-item m-auto w-25">${stat}: <strong>${stats[stat]}</strong></li>`
    })

    campoResultado4.innerHTML = `<p>El pokémon de número <strong>${numeroPokemon}</strong> tiene las siguientes estadisticas: </p>
                                 <ul class="list-group">
                                    ${lista}
                                </ul>`
}

async function requerimientoCinco() {
    let arregloIds = campoArregloIds.value.split(",");
    let ordenador = campoOrdenador.value;
    let lista = "";

    let pokemones = await ordenarPokemones(arregloIds, ordenador);;

    pokemones.forEach(function (pokemon) {
        lista += `<div class="card d-inline-block m-1" style="width: 18rem;">
                        <div class="card-header">
                            Nombre: <strong>${pokemon.nombre}</strong>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Tipo: ${pokemon.tipo}</li>
                            <li class="list-group-item">Peso: ${pokemon.peso}</li>
                        </ul>
                    </div>`
    })

    campoResultado5.innerHTML = `<p>Los pokemones son: </p> ${lista}`;

}

async function requerimientoSeis() {
    let numeroPokemon = campoNumeroPokemon.value;
    let tipoPokemon = campoTipoPokemon.value;

    let confirmacion = await confirmarTipoPokemon(numeroPokemon, tipoPokemon);;

    if (confirmacion) {
        campoResultado6.innerHTML = `<p>El pokémon de número: <strong>${numeroPokemon}</strong>, si es de tipo <strong>${tipoPokemon}</strong>`;
    } else {
        campoResultado6.innerHTML = `<p>El pokémon de número: <strong>${numeroPokemon}</strong>, no es de tipo <strong>${tipoPokemon}</strong>`;
    }
}

botonBuscar1.addEventListener("click", requerimientoUno);
botonBuscar2.addEventListener("click", requerimientoDos);
botonBuscar3.addEventListener("click", requerimientoTres);
botonBuscar4.addEventListener("click", requerimientoCuatro);
botonBuscar5.addEventListener("click", requerimientoCinco);
botonBuscar6.addEventListener("click", requerimientoSeis);