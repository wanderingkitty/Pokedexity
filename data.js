import { sample } from './ajax.js';
import { colors } from './colors.js';

const listOfPokemons = document.querySelector('#poke-list');

// Function to get general Pokemon data from a URL
async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    console.log('Data from API:', data);
    return data.results;
}

// Function used to fetch detailed information about a specific Pokemon
async function getDetailedPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    console.log('Detailed data from API:', data);
    return data;
}
// Function to make Pokemons appear in a list and have their own color according to their type
async function displayPokemonList() {
    try {
        const pokemonList = await getPokemon();
        listOfPokemons.innerHTML = '';

        for (const pokemon of pokemonList) {
            const div = document.createElement('div');
            div.className = 'pokemon-container';

            const detailedPokemon = await getDetailedPokemon(pokemon.name);
            const types = detailedPokemon.types.map(type => type.type.name);
            const mainType = types[0];
            const color = colors[mainType] || 'gray';
            
            const imgContainer = document.createElement('div');
            imgContainer.className = 'img-container';
            
            const img = document.createElement('img');
            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailedPokemon.id}.png`;
            img.alt = '';

            imgContainer.appendChild(img);
            div.appendChild(imgContainer);

            const nameDiv = document.createElement('div');
            nameDiv.className = 'pokemon-name';
            nameDiv.textContent = pokemon.name.toUpperCase();
            div.appendChild(nameDiv);

            const nameTypeDiv = document.createElement('div');
            nameTypeDiv.className = 'pokemon-name-type';
            nameTypeDiv.style.backgroundColor = color;

			const typeText = document.createTextNode(types.join(', '));

            nameTypeDiv.appendChild(typeText);
			
            div.appendChild(typeText);
			div.appendChild(nameTypeDiv)
            listOfPokemons.appendChild(div);
        }

        // addToHistory(pokemonList);
    } catch (error) {
        console.log('An error occurred! ' + error.message);
    }
}

window.addEventListener('load', displayPokemonList);
