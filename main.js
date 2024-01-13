import { getPokemon, colors} from "./data.js";
import { updateTeamList, updateReservedList } from "./cards.js";
//Variables 
export const secondScreen = document.querySelector('#second-screen');
const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
const displayLimit = 30; 
export const searchPokemonInput = document.querySelector('#site-search');
const goToMainScreenBtn = document.querySelector('.go-back-btn');
const teamScreenBtn = document.querySelector('.team-btn');
const reservedPokemonsButton = document.querySelector('.reserved-btn')
export const firstScreen = document.querySelector('#first-screen')
const reservedView = document.querySelector('#reserved-list')
export let allPokemonData = [];
export  const myTeam = []
export const reservedPokemon = []
export const maxTeamMembers = 3
export let pokemonUniqueId = 0
/* =============================================== */

// Function to hide second view screen
export function hideSecondScreen() {
	console.log('Hiding second screen');
	firstScreen.classList.remove('hide');
	firstScreen.classList.add('show');
	secondScreen.classList.remove('show');
	secondScreen.classList.add('hide');
}
hideSecondScreen();
/* =============================================== */

//Function to save data to local storage
export function saveToLocalStorage() {
	localStorage.setItem('myTeam', JSON.stringify(myTeam))
	localStorage.setItem('reservedPokemon', JSON.stringify(reservedPokemon))
}
/* =============================================== */

//Function to load data from storage
function loadFromLocalStorage() {
	const savedMyTeam = localStorage.getItem('myTeam');
	const savedReservedPokemon = localStorage.getItem('reservedPokemon');
	
	if (savedMyTeam) {
		myTeam.length = 0; // Clear the array
		JSON.parse(savedMyTeam).forEach(item => myTeam.push(item)); // Push each item
	}
	
	if (savedReservedPokemon) {
		reservedPokemon.length = 0; // Clear the array
		JSON.parse(savedReservedPokemon).forEach(item => reservedPokemon.push(item)); // Push each item
	}
}

/* =============================================== */

// Function to shuffle and get random pokemons, each time the page reloads
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const mix = Math.floor(Math.random() * (i + 1));
		[array[i], array[mix]] = [array[mix], array[i]];
	}
}
/* =============================================== */

// Search function
function searchPokemon() {
	const filter = searchPokemonInput.value.toUpperCase();
	
	if (!filter) {
		displayPokemon(allPokemonData.slice(0, displayLimit)); 
		return;
	}
	const filteredPokemon = allPokemonData.filter(pokemon => 
		pokemon.name.toUpperCase().indexOf(filter) > -1
		);
		displayPokemon(filteredPokemon.slice(0, displayLimit)); 
	}
	searchPokemonInput.addEventListener('input', searchPokemon);
	
	/* =============================================== */
	
	// Function to display Pokemon
	export function displayPokemon(pokemonList) {
		const pokemonContainer = document.querySelector('.pokemon-container');
		pokemonContainer.innerHTML = '';
	
		//Foreach function to visualise data
		pokemonList.forEach(async (pokemon) => {
			const pokemonData = await fetch(pokemon.url);
			const detailedPokemon = await pokemonData.json();
			
			detailedPokemon.id = ++pokemonUniqueId;

			const pokemonCard = document.createElement('div');
			pokemonCard.className = 'pokemon-list-container';
			
			if (pokemonList.length === 1) {
				pokemonCard.classList.add('centered-pokemon'); 
			}
			
			const img = document.createElement('img');
			img.src = detailedPokemon.sprites.other.dream_world.front_default ||
			detailedPokemon.sprites.other['official-artwork'].front_default ||
			detailedPokemon.sprites.front_default ||
			'img/poketext.png'
			
			const pokemonInfo = document.createElement('div'); 
			pokemonInfo.className = 'pokemon-info';
			
			const pokemonName = document.createElement('div');
			pokemonName.textContent = detailedPokemon.name.toUpperCase();
			pokemonName.className = 'pokemon-name'
			
			//Pokemon abilities
			const pokemonAbilities = document.createElement('div');
			pokemonAbilities.className = 'pokemon-abilities';
			//Pokemon abilities
			if (detailedPokemon.abilities && detailedPokemon.abilities.length > 0) {
				const mainAbility = detailedPokemon.abilities[0].ability;
				const mainAbilityFirstWord = mainAbility.name.split(' ')[0];
				
				const abilityName = document.createElement('span');
				abilityName.textContent = mainAbilityFirstWord;
				abilityName.className = 'pokemon-ability'; 
				pokemonAbilities.appendChild(abilityName);
			}
			
			pokemonInfo.appendChild(pokemonAbilities);
			
			const buttonContainer = document.createElement('div');
			buttonContainer.className = 'button-container';
			
			const addButton = document.createElement('button');
			addButton.className = 'add-btn';
			const addImage = document.createElement('img');
			addImage.src = 'img/Group 2 copy.png'; 
			addButton.appendChild(addImage);
			
			const reserveButton = document.createElement('button');
			reserveButton.className = 'reserve-btn';
			const reserveImage = document.createElement('img');
			reserveImage.src = 'img/Group 14 (1).png';
			
			/* =============================================== */
			
			reserveButton.appendChild(reserveImage);
			buttonContainer.appendChild(addButton);
			buttonContainer.appendChild(reserveButton);
			pokemonCard.appendChild(img);
			pokemonCard.appendChild(pokemonName);
			pokemonCard.appendChild(buttonContainer);
			pokemonContainer.appendChild(pokemonCard);
			
			const pokemonTypes = document.createElement('div');
			pokemonTypes.className = 'pokemon-types';
			
			/* =============================================== */
			
			//Visualising pokemon types function
			detailedPokemon.types.forEach((typeSlot) => {
				const type = document.createElement('span');
				const typeName = typeSlot.type.name;
				
				type.style.backgroundColor = colors[typeName] || '#CCCCCC';
				
				type.className = 'pokemon-type';
				type.textContent = typeName;
				pokemonTypes.appendChild(type);
			});
			/* =============================================== */			
			
			pokemonInfo.appendChild(pokemonTypes);
			pokemonCard.appendChild(pokemonInfo);
			/* =============================================== */
			
			//Click event to reserve pokemon
			reserveButton.addEventListener('click', () => {
				if (!reservedPokemon.includes(detailedPokemon)) {
					reservedPokemon.push(detailedPokemon);
					console.log(`Added ${detailedPokemon.name} to reserved list`);
					updateReservedList();
					showPopUpMessage("Pokemon added to to reserve!", reserveButton);
					
				} else {
					console.log(`${detailedPokemon.name} is already in the reserved list`);
					showPopUpMessage("Pokemon is already in reserve.", reserveButton); 
					
				}
			});
			
			//Click event to add pokemon to the team
			addButton.addEventListener('click', () => {
				if (myTeam.length < maxTeamMembers) { 
					const newPokemon = { ...detailedPokemon, id: ++pokemonUniqueId };
					myTeam.push(newPokemon);
						console.log(`Added ${detailedPokemon.name} to the team`);
						updateTeamList();
						showPopUpMessage("Pokemon added to the team!", addButton);
					}
				 else {
					console.log('Cannot add more members. Team is full.');
					showPopUpMessage("Cannot add more members. Team is full.", addButton); 
				}
			});
		});
	}
	/* =============================================== */
	
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
	/* =============================================== */
	
	teamScreenBtn.addEventListener('click', () => {
		firstScreen.classList.add('hide');
		secondScreen.classList.remove('hide');
		searchPokemonInput.classList.add('hide')
	});

	/* =============================================== */
	//Reserved team view screen btn
	reservedPokemonsButton.addEventListener('click', () => {
		console.log('Reserved button works');
		firstScreen.classList.add('hide');
		secondScreen.classList.remove('hide'); 
		searchPokemonInput.classList.add('hide')
		const reservedList = document.getElementById('reserved-list');
		if (reservedList) {
			reservedList.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
	/* =============================================== */

	//Main screen btn view
	goToMainScreenBtn.addEventListener('click', () => {
		secondScreen.classList.add('hide');
		firstScreen.classList.remove('hide');
		searchPokemonInput.classList.remove('hide')
		searchPokemonInput.classList.add('show')
	});
	/* =============================================== */
	
	//Loading local storage data
	document.addEventListener('DOMContentLoaded', () => {
		loadFromLocalStorage();
		updateTeamList();   
		updateReservedList()
		getPokemonDetails(); 
	});
	/* =============================================== */
	
	//Pop up alert for full team messege
	export function showPopUpMessage(message, nextToElement) {
		console.log("showPopUpMessage called with message:", message);
		let popUp = document.querySelector('.pop-up-message');
		if (!popUp) {
			popUp = document.createElement('div');
			popUp.className = 'pop-up-message';
			document.body.appendChild(popUp);
		}
		popUp.textContent = message;
		popUp.style.display = 'block';
		
		const rect = nextToElement.getBoundingClientRect();
		const offset = 20;
		popUp.style.top = `${rect.top + window.scrollY - offset}px`; 
		popUp.style.left = `${rect.left + window.scrollX}px`;
		
		setTimeout(() => {
			popUp.style.display = 'none';
		}, 3000);
	}