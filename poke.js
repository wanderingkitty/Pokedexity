import { getPokemon, colors} from "./data.js";
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
let allPokemonData = [];
const myTeam = []
const reservedPokemon = []
const maxTeamMembers = 3

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

function saveToLocalStorage() {
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
					if (!myTeam.includes(detailedPokemon)){
						myTeam.push(detailedPokemon);
						console.log(`Added ${detailedPokemon.name} to the team`);
						updateTeamList();
						showPopUpMessage("Pokemon added to the team!", addButton);
					} else {
						console.log(`${detailedPokemon.name} is already in the team`);
						showPopUpMessage("Pokemon is already in the team.", addButton); 
					}
				} else {
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
	});export function updateTeamList() {
		const teamList = document.querySelector('.team-list');
		teamList.innerHTML = '';  
		
		//Function to show elements, copy of the created elemets inside displayPokemon function
		
		myTeam.forEach((pokemonData, index) => {
			
			const teamPokemonCard = document.createElement('div');	
			teamPokemonCard.className = 'pokemon-list-container';
			
			const teamPokemonName = document.createElement('div');
			teamPokemonName.textContent = pokemonData.name.toUpperCase();
			teamPokemonName.className = 'pokemon-name';
			
			const img = document.createElement('img');
			img.src = pokemonData.sprites.other.dream_world.front_default ||
			pokemonData.sprites.other['official-artwork'].front_default ||
			pokemonData.sprites.front_default ||
			'img/poketext.png';
			img.className = 'pokemon-image'; 
			
			const pokemonTypes = document.createElement('div');
			pokemonTypes.className = 'pokemon-types';
			
			pokemonData.types.forEach((typeSlot) => {
				const type = document.createElement('span');
				type.textContent = typeSlot.type.name;
				type.style.backgroundColor = colors[typeSlot.type.name] || '#CCCCCC';
				type.className = 'pokemon-type';
				pokemonTypes.appendChild(type);
			});
	
			const teamListName = document.createElement('div');
			teamListName.textContent = pokemonData.customName || pokemonData.name.toUpperCase();
			teamListName.className = 'pokemon-name';
			/* =============================================== */
			//Buttons realisation with event listener
			const editNameButton = document.createElement('button')
			editNameButton.className = 'edit-btn'
			const editImage = document.createElement('img')
			editImage.src = 'img/edit.png'
			editNameButton.appendChild(editImage)
			
			editNameButton.addEventListener('click',() =>{
				const nickName = prompt('Change name for ' + pokemonData.name)
				if(nickName) {
					pokemonData.customName = nickName
					updateTeamList()
				}
			})
	
			const pokemonAbilities = document.createElement('div');
			pokemonAbilities.className = 'pokemon-abilities';
	
			pokemonData.abilities.forEach((ability) => {
				const abilityName = document.createElement('span');
				abilityName.textContent = ability.ability.name; // Display full ability name
				abilityName.className = 'pokemon-ability';
				pokemonAbilities.appendChild(abilityName);
			});
	
			
			const moveToLeftBtn = document.createElement('button')
			moveToLeftBtn.className = 'move-left-btn'
			const moveLeftImage = document.createElement('img')
			moveLeftImage.src = 'img/left.png'
			moveToLeftBtn.appendChild(moveLeftImage)
			
			const moveToRightbtn = document.createElement('button')
			moveToRightbtn.className = 'move-right-btn'
			const moveRightImage = document.createElement('img')
			moveRightImage.src = 'img/right.png'
			moveToRightbtn.appendChild(moveRightImage)
			
			console.log("Current team size:", myTeam.length);
			
			const buttonContainer = document.createElement('div');
			buttonContainer.className = 'button-container';
			
			const reserveButton = document.createElement('button');
			reserveButton.className = 'reserve-btn';
			const reserveImage = document.createElement('img');
			reserveImage.src = 'img/Group 14 (1).png'; 
			reserveButton.appendChild(reserveImage);
			buttonContainer.appendChild(reserveButton);
			
			const leftRightContainer = document.createElement('div')
			leftRightContainer.className = 'left-right-btn-container'
			
			leftRightContainer.appendChild(moveToLeftBtn); leftRightContainer
			leftRightContainer.appendChild(moveToRightbtn); leftRightContainer
			
			teamPokemonCard.appendChild(buttonContainer); 
			teamPokemonCard.appendChild(buttonContainer);
			teamPokemonCard.appendChild(leftRightContainer);
			
			const removeButton = document.createElement('button');
			removeButton.className = 'remove-btn';
			const removeImage = document.createElement('img')
			removeImage.src = 'img/Group 2 (1).png'
			removeButton.appendChild(removeImage)
			
			removeButton.addEventListener('click', () => {
				delete pokemonData.customName;
				myTeam.splice(index, 1); 
				updateTeamList();
			});
			
			reserveButton.addEventListener('click', () => {
				if (!reservedPokemon.includes(pokemonData)){
					reservedPokemon.push(pokemonData);
					delete pokemonData.customName; 
					myTeam.splice(index, 1);
					console.log(`Moved ${pokemonData.name} to reserved list`);
					updateTeamList(); 
					updateReservedList(); 
				} else {
					console.log(`${pokemonData.name} is already in the reserved list`);
				}
			});
			
			/* =============================================== */
			
			buttonContainer.appendChild(removeButton); 
			buttonContainer.appendChild(editNameButton)
			teamPokemonCard.appendChild(img);
			teamPokemonCard.appendChild(teamListName);
			teamPokemonCard.appendChild(pokemonAbilities);
			teamPokemonCard.appendChild(pokemonTypes);
			teamList.appendChild(teamPokemonCard);
	
			saveToLocalStorage();
			
		});
		const emptySlotsNeeded = maxTeamMembers - myTeam.length;
		//For loop to create empty slot cards
		for (let i = 0; i < emptySlotsNeeded; i++) {
			const emptySlotCard = document.createElement('div');
			emptySlotCard.className = 'pokemon-list-container empty-slot-card';
			teamList.appendChild(emptySlotCard);
		}
		
		
		saveToLocalStorage();
	}
	
	/* =============================================== */
	
	//Function to list and show reserved pokemons members in a separeted list
	export function updateReservedList() {
		const reservedList = document.querySelector('.reserved-list'); 
		reservedList.innerHTML = '';  
		
		reservedPokemon.forEach((pokemonData, index) => {
			const teamPokemonCard = document.createElement('div');	
			teamPokemonCard.className = 'pokemon-list-container';
			
			const teamPokemonName = document.createElement('div');
			teamPokemonName.textContent = pokemonData.name.toUpperCase();
			teamPokemonName.className = 'pokemon-name';
			
			const img = document.createElement('img');
			img.src = pokemonData.sprites.other.dream_world.front_default ||
			pokemonData.sprites.other['official-artwork'].front_default ||
			pokemonData.sprites.front_default ||
			'img/poketext.png';
			img.className = 'pokemon-image'; 
			
			const pokemonTypes = document.createElement('div');
			pokemonTypes.className = 'pokemon-types';
			
			//Creating types and their colors
			pokemonData.types.forEach((typeSlot) => {
				const type = document.createElement('span');
				type.textContent = typeSlot.type.name;
				type.style.backgroundColor = colors[typeSlot.type.name] || '#CCCCCC';
				type.className = 'pokemon-type';
				pokemonTypes.appendChild(type);
			});
	
			const pokemonAbilities = document.createElement('div');
			pokemonAbilities.className = 'pokemon-abilities';
	
			pokemonData.abilities.forEach((ability) => {
				const abilityName = document.createElement('span');
				abilityName.textContent = ability.ability.name; // Display full ability name
				abilityName.className = 'pokemon-ability';
				pokemonAbilities.appendChild(abilityName);
			});
	
			const buttonContainer = document.createElement('div');
			buttonContainer.className = 'button-container';
			
			const addButton = document.createElement('button');
			addButton.className = 'add-btn';
			const addImage = document.createElement('img');
			addImage.src = 'img/Group 2 copy.png'; 
			addButton.appendChild(addImage);
			
			addButton.addEventListener('click', () => {
				if (myTeam.length < maxTeamMembers) {
					if (!myTeam.includes(pokemonData)) {
						myTeam.push(pokemonData);
						console.log(`Added ${pokemonData.name} to the team`);
						
						// Remove from reserved if added to team
						reservedPokemon.splice(index, 1);
						updateTeamList();
						updateReservedList();
						showPopUpMessage("Pokemon added to the team!", addButton);
					} else {
						console.log(`${pokemonData.name} is already in the team`);
						showPopUpMessage("Pokemon is already in the team.", addButton);
					}
				} else {
					console.log('Cannot add more members. Team is full.');
					showPopUpMessage("Cannot add more members. Team is full.", addButton);
				}
			});
			
			const removeButton = document.createElement('button');
			removeButton.className = 'remove-btn';
			const removeImage = document.createElement('img')
			removeImage.src = 'img/Group 2 (1).png'
			removeButton.appendChild(removeImage)
			
			removeButton.addEventListener('click', () => {
				reservedPokemon.splice(index, 1); 
				updateReservedList();
			});
			
			updateTeamList();
			
			teamPokemonCard.appendChild(buttonContainer);
			buttonContainer.appendChild(removeButton); 
			buttonContainer.appendChild(addButton);
			teamPokemonCard.appendChild(img);
			teamPokemonCard.appendChild(teamPokemonName);
			teamPokemonCard.appendChild(pokemonAbilities);
			teamPokemonCard.appendChild(pokemonTypes);
			reservedList.appendChild(teamPokemonCard);
			saveToLocalStorage();
			
		});
	}
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
	
	//Function to get added pokemons on a separate list after adding them
	
	//Loading local storage data
	document.addEventListener('DOMContentLoaded', () => {
		loadFromLocalStorage();
		updateTeamList();   
		updateReservedList()
		getPokemonDetails(); 
	});
	/* =============================================== */
	
	//Pop up alert for full team messege
	function showPopUpMessage(message, nextToElement) {
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