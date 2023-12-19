import { getPokemon, colors } from "./data.js";

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
			
			//Function to get added pokemons on a separate list
			function updateTeamList() {
				const teamList = document.querySelector('.team-list');
				teamList.innerHTML = '';  
				
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
					'/img/poketext.png';
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
					
					const editNameButton = document.createElement('button')
					editNameButton.className = 'edit-btn'
					const editImage = document.createElement('img')
					editImage.src = '/img/edit.png'
					editNameButton.appendChild(editImage)
					
					editNameButton.addEventListener('click',() =>{
						const nickName = prompt('Change name for ' + pokemonData.name)
						if(nickName) {
							pokemonData.customName = nickName
							updateTeamList()
						}
					})

					const buttonContainer = document.createElement('div');
					buttonContainer.className = 'button-container';
					
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
						delete pokemonData.customName;
						myTeam.splice(index, 1); 
						updateTeamList();
					});

					reserveButton.addEventListener('click', () => {
						if (!reservedPokemon.includes(pokemonData)) {
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
					
					buttonContainer.appendChild(removeButton); 
					buttonContainer.appendChild(editNameButton)
					teamPokemonCard.appendChild(img);
					teamPokemonCard.appendChild(teamListName);
					teamPokemonCard.appendChild(pokemonTypes);
					teamList.appendChild(teamPokemonCard);
				});
			}
			
			//Function to list and show reserved pokemons members
			function updateReservedList() {
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
					'/img/poketext.png';
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
					const buttonContainer = document.createElement('div');
					buttonContainer.className = 'button-container';
					
					const addButton = document.createElement('button');
					addButton.className = 'add-btn';
					const addImage = document.createElement('img');
					addImage.src = '/img/Group 2 copy.png'; 
					addButton.appendChild(addImage);
					
					addButton.addEventListener('click', () => {
						if (myTeam.length < maxTeamMembers) {
							if (!myTeam.includes(pokemonData, index)) {
								myTeam.push(pokemonData);
								console.log(`Added ${pokemonData.name} to the team`);
								// Find index in the reserved list
								const reservedIndex = reservedPokemon.findIndex(p => p === pokemonData);
								if (reservedIndex !== -1) {
									reservedPokemon.splice(reservedIndex, 1);
								}
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
					removeImage.src = '/img/Group 2 (1).png'
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
					teamPokemonCard.appendChild(pokemonTypes);
					reservedList.appendChild(teamPokemonCard);
				});
			}
			pokemonInfo.appendChild(pokemonTypes);
			pokemonCard.appendChild(pokemonInfo);
			
			//Pop up alert for full team messege
			function showPopUpMessage(message, nextToElement) {
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
			
			//Click event to reserve pokemon
			reserveButton.addEventListener('click', () => {
				if (!reservedPokemon.includes(detailedPokemon)) {
					reservedPokemon.push(detailedPokemon);
					console.log(`Added ${detailedPokemon.name} to reserved list`);
					updateReservedList();
				} else {
					console.log(`${detailedPokemon.name} is already in the reserved list`);
				}
			});
			
			//Click event to add pokemon to the team
			addButton.addEventListener('click', () => {
				if (myTeam.length < maxTeamMembers) { 
					if (!myTeam.includes(detailedPokemon)) {
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
		searchPokemonInput.classList.add('hide')
	});
	
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
	
	goToMainScreenBtn.addEventListener('click', () => {
		secondScreen.classList.add('hide');
		firstScreen.classList.remove('hide');
		searchPokemonInput.classList.remove('hide')
		searchPokemonInput.classList.add('show')
	});
	
	
	