import { getPokemon, colors } from "./data.js";

export const secondScreen = document.querySelector('#second-screen');
const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
const displayLimit = 30; 
export const searchPokemonInput = document.querySelector('#site-search');
const goToMainScreenBtn = document.querySelector('.go-back-btn');
const teamScreenBtn = document.querySelector('.team-btn');
export const firstScreen = document.querySelector('#first-screen')
let allPokemonData = [];
const myTeam = []
const maxTeamMembers = 3


// Function to hide second view screen
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
	export function displayPokemon(pokemonList) {
		const pokemonContainer = document.querySelector('.pokemon-container');
		pokemonContainer.innerHTML = '';
		
		pokemonList.forEach(async (pokemon) => {
			const pokemonData = await fetch(pokemon.url);
			const detailedPokemon = await pokemonData.json();
			
			const pokemonCard = document.createElement('div');
			pokemonCard.className = 'pokemon-list-container';
			
			if (pokemonList.length === 1) {
				pokemonCard.classList.add('centered-pokemon'); 
			}
			
			const img = document.createElement('img');
			img.src = detailedPokemon.sprites.other.dream_world.front_default ||
			detailedPokemon.sprites.other['official-artwork'].front_default ||
			detailedPokemon.sprites.front_default ||
			'/img/poketext.png'
			
			const pokemonInfo = document.createElement('div'); 
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
				
				type.style.backgroundColor = colors[typeName] || '#CCCCCC';
				
				type.className = 'pokemon-type';
				type.textContent = typeName;
				pokemonTypes.appendChild(type);
			});
			
			const teamList = document.querySelector('.team-list');
			//Function to get added pokemons on a separate list
			function updateTeamList() {
				const teamList = document.querySelector('.team-list');
				teamList.innerHTML = '';  
				
				myTeam.forEach((pokemonData) => {
			
					const teamPokemonCard = document.createElement('div');	
					teamPokemonCard.className = 'pokemon-list-container';
					
					const teamPokemonName = document.createElement('div');
					teamPokemonName.textContent = pokemonData.name.toUpperCase();
					teamPokemonName.className = 'pokemon-name';
					
					const img = document.createElement('img');
					img.src = pokemonData.sprites.other.dream_world.front_default ||
					pokemonData.sprites.other['official-artwork'].front_default ||
					pokemonData.sprites.front_default ||
					'/img/poketext.png';
					img.className = 'pokemon-image'; 
					
					// Pokemon Types
					const pokemonTypes = document.createElement('div');
					pokemonTypes.className = 'pokemon-types';
					pokemonData.types.forEach((typeSlot) => {
						const type = document.createElement('span');
						type.textContent = typeSlot.type.name;
						type.style.backgroundColor = colors[typeSlot.type.name] || '#CCCCCC';
						type.className = 'pokemon-type';
						pokemonTypes.appendChild(type);
					});
					const buttonContainer = document.createElement('div');
					buttonContainer.className = 'button-container';
			
					// Reserve Button
					const reserveButton = document.createElement('button');
					reserveButton.className = 'reserve-btn';
					const reserveImage = document.createElement('img');
					reserveImage.src = '/img/Group 14 (1).png'; 
					reserveButton.appendChild(reserveImage);
			
					buttonContainer.appendChild(reserveButton);
			
					teamPokemonCard.appendChild(buttonContainer);
					
					const removeButton = document.createElement('button');
					removeButton.className = 'remove-btn';
					const removeImage = document.createElement('img')
					removeImage.src = '/img/Group 2 (1).png'
					removeButton.appendChild(removeImage)
					removeButton.addEventListener('click', () => {
						// Code to remove this Pokemon from the team
					});
					buttonContainer.appendChild(removeButton); 
					teamPokemonCard.appendChild(img);
					teamPokemonCard.appendChild(teamPokemonName);
					teamPokemonCard.appendChild(pokemonTypes);
				
					teamList.appendChild(teamPokemonCard);
				});
			}
		
			pokemonInfo.appendChild(pokemonTypes);
			pokemonCard.appendChild(pokemonInfo);
			
			let popUpMessege = document.createElement('div')
			popUpMessege.innerText = 'Team is full'
			
			//Click event to add pokemon to the team
			addButton.addEventListener('click', () => {
				if (myTeam.length < maxTeamMembers) { 
					if (!myTeam.includes(detailedPokemon)) {
						myTeam.push(detailedPokemon);
						console.log(`Added ${detailedPokemon.name} to the team`);
						
						updateTeamList();
					} else {
						console.log(`${detailedPokemon.name} is already in the team`);
					}
				} else {
					console.log('Cannot add more members. Team is full.');
					document.body.appendChild(popUpMessege);
				}
			});
		});
	}
	
	// Function to visualize pokemon list from fetched data
	export async function getPokemonDetails() {
		try {
			const response = await getPokemon(pokemonListUrl);
			allPokemonData = response.results;
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
	
	teamScreenBtn.addEventListener('click', () => {
		firstScreen.classList.add('hide');
		secondScreen.classList.remove('hide');
	});
	
	goToMainScreenBtn.addEventListener('click', () => {
		secondScreen.classList.add('hide');
		firstScreen.classList.remove('hide');
	});
	
	
	