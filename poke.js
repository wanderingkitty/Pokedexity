import { getPokemon } from "./data.js";
import { firstScreen } from "./team.js";
export const secondScreen = document.querySelector('#second-screen')
const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const displayLimit = 20; 
export const searchPokemonInput = document.querySelector('#site-search')

//Function to hide second view screen
export function hideSecondScreen() {
	console.log('Hiding second screen');
	firstScreen.classList.remove('hide');
	firstScreen.classList.add('show');
	
	secondScreen.classList.remove('show');
	secondScreen.classList.add('hide');
}
hideSecondScreen();

//Function to shufflr and get random pokemons, each time the page reloads
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const mix = Math.floor(Math.random() * (i + 1));
		[array[i], array[mix]] = [array[mix], array[i]];
	}
}
//Function to visualise pokemon list from fetched data
export async function getPokemonDetails () {
	try {
		const pokemonData = await getPokemon(pokemonListUrl)
		const pokemonList = pokemonData.results.slice(0, displayLimit); 
		
		shuffleArray(pokemonList);
		
		const pokemonContainer = document.querySelector('.pokemon-container')
		
		for (const pokemon of pokemonList) {
			const pokemonData = await fetch(pokemon.url);
			const detailedPokemon = await pokemonData.json();
			
			const pokemonCard = document.createElement('div');
			pokemonCard.className = 'pokemon-list-container';
			
			const img = document.createElement('img');
			img.src = detailedPokemon.sprites.other.dream_world.front_default;
			
			const pokemonName = document.createElement('div');
			pokemonName.textContent = detailedPokemon.name.toUpperCase();

			const buttonContainer = document.createElement('div');
			buttonContainer.className = 'button-container';
			pokemonName.classList.add('pokemonName'); 

			const addButton = document.createElement('button');
			addButton.className = 'add-btn';
			const addImage = document.createElement('img');
			addImage.src = '/img/Group 2 copy.png'; 
			addButton.appendChild(addImage);

			const reserveButton = document.createElement('button')
			reserveButton.className = 'reserve-btn'
			const resderveImage = document.createElement('img');
			resderveImage.src = '/img/Group 14 (1).png'
			reserveButton.appendChild(resderveImage)
			
			pokemonCard.appendChild(addButton); 
			pokemonCard.appendChild(reserveButton); 
			pokemonCard.appendChild(img);
			pokemonCard.appendChild(pokemonName);
			pokemonContainer.appendChild(pokemonCard);
			buttonContainer.appendChild(addButton);
    		buttonContainer.appendChild(reserveButton);
    		pokemonCard.appendChild(buttonContainer);
		}
		
	} catch (error) {
		console.log('Error', error.message);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	getPokemonDetails();
  });

// window.addEventListener('load', getPokemonDetails)
