import { sample } from './ajax.js';
import { colors } from './colors.js';

const pokemonListContainer = document.querySelector('.pokemon-container');

async function fetchPokemonData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching Pokemon data:', error.message);
		throw error;
	}
}

function shufflePokemons(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

const addPokemonToTeamBtn = document.querySelector('.add-btn')
addPokemonToTeamBtn.style.display = 'none'

async function createListOfPokemons() {
	const listOfPokemons = sample.results;
	shufflePokemons(listOfPokemons);
	
	const ul = document.createElement('ul');
	
	const pokemonDataPromises = listOfPokemons.map(async (pokemon) => {
		const data = await fetchPokemonData(pokemon.url);
		return { name: pokemon.name, types: data.types.map(type => type.type.name) };
	});
	
	// Wait for all promises to resolve
	const pokemonDataArray = await Promise.all(pokemonDataPromises);
	
	// Create list items with type information
	pokemonDataArray.forEach((pokemonData) => {
		const li = document.createElement('li');
		li.textContent = `${pokemonData.name.toUpperCase()} - Types: ${pokemonData.types.join(', ')}`;
		li.className = 'pokemon-list-container';

		const addButton = document.createElement('button');
		addButton.className = 'add-btn';
		addButton.innerHTML = addPokemonToTeamBtn.innerHTML; 

		ul.appendChild(li);
		li.appendChild(addButton)
	});
	
	ul.style.listStyleType = 'none';
	pokemonListContainer.appendChild(ul);
}

createListOfPokemons();
