import { sample } from './ajax.js';

const listOfPokemons = document.querySelector('#poke-list')
const getListOfPokemonsBtn = document.querySelector('.logo-btn')

async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    console.log('Data from API:', data);
    return data.results;
}

getListOfPokemonsBtn.addEventListener('click', async () => {
    try {
        const pokemonList = await getPokemon();

        listOfPokemons.innerHTML = ''; 
        pokemonList.forEach(pokemon => {
            const div = document.createElement('div');
            div.className = 'pokemon-name';
            div.textContent = pokemon.name;
            listOfPokemons.appendChild(div);
        });
		
        addToHistory(pokemonList);
    } catch (error) {
        console.log('An error occurred! ' + error.message);
    }
});
