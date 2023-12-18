import { getPokemon, colors } from "./data.js";
import { firstScreen } from "./team.js";

export const secondScreen = document.querySelector('#second-screen');
const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
const displayLimit = 30; 
export const searchPokemonInput = document.querySelector('#site-search');
let allPokemonData = [];

// Function to hide second view screen
export function hideSecondScreen() {
	console.log('Hiding second screen');
	firstScreen.classList.remove('hide');
	firstScreen.classList.add('show');
	
	secondScreen.classList.remove('show');
	secondScreen.classList.add('hide');
}
hideSecondScreen();

// Function to shuffle and get random pokemons, each time the page reloads
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const mix = Math.floor(Math.random() * (i + 1));
		[array[i], array[mix]] = [array[mix], array[i]];
	}
}

// Function to filter and display Pokemon based on search input
function searchPokemon() {
	const filter = searchPokemonInput.value.toUpperCase();
	const filteredPokemon = allPokemonData.filter(pokemon => 
		pokemon.name.toUpperCase().indexOf(filter) > -1
		);
		displayPokemon(filteredPokemon);
	}
	
	// Function to display Pokemon
	function displayPokemon(pokemonList) {
		const pokemonContainer = document.querySelector('.pokemon-container');
		pokemonContainer.innerHTML = '';
		
		pokemonList.forEach(async (pokemon) => {
			const pokemonData = await fetch(pokemon.url);
			const detailedPokemon = await pokemonData.json();
			
			const pokemonCard = document.createElement('div');
			pokemonCard.className = 'pokemon-list-container';
			
			const img = document.createElement('img');
			// Check multiple image sources
			img.src = detailedPokemon.sprites.other.dream_world.front_default ||
			detailedPokemon.sprites.other['official-artwork'].front_default ||
			detailedPokemon.sprites.front_default ||
			'/img/poketext.png'
			
			
			const pokemonInfo = document.createElement('div'); // Create the pokemonInfo div
			pokemonInfo.className = 'pokemon-info';
			
			const pokemonName = document.createElement('div');
			pokemonName.textContent = detailedPokemon.name.toUpperCase();
			pokemonName.className = 'pokemon-name'
			
			const buttonContainer = document.createElement('div');
			buttonContainer.className = 'button-container';
			
			const addButton = document.createElement('button');
			addButton.className = 'add-btn';
			const addImage = document.createElement('img');
			addImage.src = '/img/Group 2 copy.png'; 
			addButton.appendChild(addImage);
			
			const reserveButton = document.createElement('button');
			reserveButton.className = 'reserve-btn';
			const reserveImage = document.createElement('img');
			reserveImage.src = '/img/Group 14 (1).png';
			reserveButton.appendChild(reserveImage);
			
			buttonContainer.appendChild(addButton);
			buttonContainer.appendChild(reserveButton);
			
			pokemonCard.appendChild(img);
			pokemonCard.appendChild(pokemonName);
			pokemonCard.appendChild(buttonContainer);
			pokemonContainer.appendChild(pokemonCard);
			
			//Gettingpokemon types
			const pokemonTypes = document.createElement('div');
			pokemonTypes.className = 'pokemon-types';
	
			detailedPokemon.types.forEach((typeSlot) => {
				const type = document.createElement('span');
				const typeName = typeSlot.type.name;
	
				// Use a ternary operator to set the background color
				type.style.backgroundColor = colors[typeName] || '#CCCCCC';
	
				type.className = 'pokemon-type';
				type.textContent = typeName;
				pokemonTypes.appendChild(type);
			});
	
			pokemonInfo.appendChild(pokemonTypes);
			pokemonCard.appendChild(pokemonInfo);
		});
	}
	
	// Function to visualize pokemon list from fetched data
	export async function getPokemonDetails() {
		try {
			const response = await getPokemon(pokemonListUrl);
			allPokemonData = response.results; // Store all Pokemon data
			shuffleArray(allPokemonData);
			displayPokemon(allPokemonData.slice(0, displayLimit));
		} catch (error) {
			console.log('Error', error.message);
		}
	}
	
	function debounce(func, delay) {
		let debounceTimer;
		return function() {
			const context = this;
			const args = arguments;
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func.apply(context, args), delay);
		}
	}
	
	searchPokemonInput.addEventListener('input', debounce(searchPokemon, 300));
	
	
	document.addEventListener('DOMContentLoaded', getPokemonDetails);
