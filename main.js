import { sample } from './ajax.js';
export const pokemonListContainer = document.querySelector('.pokemon-container');
const pokemonsName = document.querySelector('.pokemon-name')
export const searchPokemonInput = document.querySelector('#site-search')
export const addedPokemons = []
export const teamContainer = document.querySelector('.team-container')
export const firstScreen = document.querySelector('#first-screen')
export const secondScreen = document.querySelector('#second-screen')

export function hideSecondScreen() {
    console.log('Hiding second screen');
    firstScreen.classList.remove('hide');
    firstScreen.classList.add('show');

    secondScreen.classList.remove('show');
    secondScreen.classList.add('hide');
}

hideSecondScreen();

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
		const random = Math.floor(Math.random() * (i + 1));
		[array[i], array[random]] = [array[random], array[i]];
		
	}
}

export const addPokemonToTeamBtn = document.querySelector('.add-btn')
addPokemonToTeamBtn.style.display = 'none'

async function createListOfPokemons() {
	const listOfPokemons = sample.results
	
	shufflePokemons(listOfPokemons);
	
	const ul = document.createElement('ul');
	// ul.className = 'pokemon-list-container'


	
	const pokemonDataPromises = listOfPokemons.map(async (pokemon) => {
		const data = await fetchPokemonData(pokemon.url);
		return {
			id: data.id,
			name: pokemon.name,
			types: data.types.map(type => type.type.name)
		};
	});
	
	const pokemonDataArray = await Promise.all(pokemonDataPromises);
	
	pokemonDataArray.forEach((pokemonData) => {
		const li = document.createElement('li');
		li.className = 'pokemon-list-container';
	
		const imgContainer = document.createElement('div');
		imgContainer.className = 'img-container';
	
		const img = document.createElement('img');
		img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
		img.alt = pokemonData.name;
	
		imgContainer.appendChild(img);
		li.appendChild(imgContainer);
	
		const textContent = document.createElement('div');
		textContent.textContent = `${pokemonData.name.toUpperCase()} - ${pokemonData.types.join(', ')}`;
		li.appendChild(textContent);
	
		const addButton = document.createElement('button');
		addButton.className = 'add-btn';
		addButton.innerHTML = addPokemonToTeamBtn.innerHTML;
		li.appendChild(addButton);
	
		ul.appendChild(li);
		li.appendChild(addButton)
	

const teamList = document.querySelector('.team-list');

function updateTeamList() {
    teamList.innerHTML = '';

    addedPokemons.forEach((pokemonData) => {
        const li = document.createElement('li');
        li.textContent = `${pokemonData.name.toUpperCase()} - ${pokemonData.types.join(', ')}`
        li.className = 'pokemon-list-container';

        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
        img.alt = pokemonData.name;
        li.appendChild(img);
        teamList.appendChild(li);
    });
}
		const maxTeamMembers = 3
		let	popUpMessege = document.createElement('div')
		popUpMessege.innerText = 'Team is full.'
		popUpMessege.classList.add('pop-up-window')

addButton.addEventListener('click', () => {
	if(addedPokemons.length < maxTeamMembers)
    if (!addedPokemons.includes(pokemonData)) {
        addedPokemons.push(pokemonData);
        console.log(`Added ${pokemonData.name} to the team`);
        updateTeamList()
    } else {
        console.log(`${pokemonData.name} is already in the team`);
    }
	else {
        console.log('Cannot add more members. Team is full.');
		document.body.appendChild(popUpMessege);
    }
});
	});
	
	ul.style.listStyleType = 'none'
	pokemonListContainer.appendChild(ul)

	searchPokemonInput.addEventListener('input', function () {

        const filter = searchPokemonInput.value.toUpperCase()
        const lis = ul.getElementsByTagName('li')

        for (let i = 0; i < lis.length; i++) {
            const txtValue = lis[i].textContent || lis[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                lis[i].style.display = ""
            } else {
                lis[i].style.display = "none"
            }
        }
    })
}

createListOfPokemons()
