import { sample } from './ajax.js';
import { colors } from './colors.js';

const listOfPokemons = document.querySelector('#poke-list');
//Function to get general Pokemon data from a url

async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    console.log('Data from API:', data);
    return data.results;
}
//Function is used to fetch detailed information about a specific Pokemon

async function getDetailedPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const data = await response.json()
    console.log('Detailed data from API:', data)
    return data
}
//Function to make Pokemons to appear in a list and to have their own color according to their type

async function displayPokemonList() {
    try {
        const pokemonList = await getPokemon();

        listOfPokemons.innerHTML = ''; 
        for (const pokemon of pokemonList) {
            const div = document.createElement('div')
            div.className = 'pokemon-name'
            const detailedPokemon = await getDetailedPokemon(pokemon.name)
            const types = detailedPokemon.types.map(type => type.type.name)
            const mainType = types[0]
            const color = colors[mainType] || 'gray'
            div.textContent = pokemon.name.toUpperCase()
            div.style.backgroundColor = color
            listOfPokemons.appendChild(div)
        }

        addToHistory(pokemonList)
    } catch (error) {
        console.log('An error occurred! ' + error.message)
    }
}

window.addEventListener('load', displayPokemonList)
