import { myTeam, maxTeamMembers, saveToLocalStorage, reservedPokemon, showPopUpMessage } from "./main.js"
import { getPokemon, colors} from "./data.js";

//Function to get added pokemons on a separate list after adding them
export function updateTeamList() {
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
		
		const pokemonAbilities = document.createElement('div');
		pokemonAbilities.className = 'pokemon-abilities';
		pokemonData.abilities.forEach(ability => {
			const abilityName = document.createElement('span');
			abilityName.textContent = ability.ability.name;
			abilityName.className = 'pokemon-ability';
			pokemonAbilities.appendChild(abilityName);
		});
		
		// Add abilities to the card
		/* =============================================== */
		//Buttons realisation with event listener
		const editNameButton = document.createElement('button')
		editNameButton.className = 'edit-btn'
		const editImage = document.createElement('img')
		editImage.src = 'img/edit.png'
		editNameButton.appendChild(editImage)
		
		editNameButton.addEventListener('click', () => {
			if (document.querySelector('.edit-name-input')) {
				return;
			}
		
			const input = document.createElement('input');
			input.type = 'text';
			input.className = 'edit-name-input';
			input.value = pokemonData.customName || pokemonData.name;
			input.style.width = '200px'; 
		
			const parentElement = editNameButton.parentElement;
		
			parentElement.replaceChild(input, editNameButton);
		
			input.focus();
			input.select();
		
			const submitChange = () => {
				if (input.value.trim() !== '') {
					pokemonData.customName = input.value.trim();
				}
				updateTeamList();
			};
		
			input.addEventListener('blur', submitChange);
		
			input.addEventListener('keypress', (event) => {
				if (event.key === 'Enter') {
					submitChange();
					input.blur(); 
				}
			});
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
		
		//Move left/right btn
		moveToLeftBtn.addEventListener('click', () => {
			if (index > 0) {
				[myTeam[index], myTeam[index - 1]] = [myTeam[index - 1], myTeam[index]];
				updateTeamList();
			}
		});
		moveToRightbtn.addEventListener('click', () => {
			if (index < myTeam.length - 1) {
				[myTeam[index], myTeam[index + 1]] = [myTeam[index + 1], myTeam[index]];
				updateTeamList();
			}
		});
		
		
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
		const buttonContainer = document.createElement('div');
		buttonContainer.className = 'button-container';
		
		const addButton = document.createElement('button');
		addButton.className = 'add-btn';
		const addImage = document.createElement('img');
		addImage.src = 'img/Group 2 copy.png'; 
		addButton.appendChild(addImage);
		
		addButton.addEventListener('click', () => {
			if (myTeam.length < maxTeamMembers) {
					myTeam.push(pokemonData);
					console.log(`Added ${pokemonData.name} to the team`);
					// Remove from reserved if added to team
					reservedPokemon.splice(index, 1);
					updateTeamList();
					updateReservedList();
					showPopUpMessage("Pokemon added to the team!", addButton);
				
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
		
		const pokemonAbilities = document.createElement('div');
		pokemonAbilities.className = 'pokemon-abilities';
		pokemonData.abilities.forEach(ability => {
			const abilityName = document.createElement('span');
			abilityName.textContent = ability.ability.name;
			abilityName.className = 'pokemon-ability';
			pokemonAbilities.appendChild(abilityName);
		});
		
		// Add abilities to the card
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