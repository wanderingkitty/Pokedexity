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

//Function to get pokemon data
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

//Function to randomise pokemons 
function shufflePokemons(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const random = Math.floor(Math.random() * (i + 1));
		[array[i], array[random]] = [array[random], array[i]];
		
	}
}

export const addPokemonToTeamBtn = document.querySelector('.add-btn')
addPokemonToTeamBtn.style.display = 'none'

//Function to make a list from a fetched data
async function createListOfPokemons() {
	const listOfPokemons = sample.results
	
	shufflePokemons(listOfPokemons);
	
	const ul = document.createElement('ul');

	const pokemonDataPromises = listOfPokemons.map(async (pokemon) => {
		const data = await fetchPokemonData(pokemon.url);
		return {
			id: data.id,
			name: pokemon.name,
			types: data.types.map(type => type.type.name)
		};
	});
	
	const pokemonDataArray = await Promise.all(pokemonDataPromises);

//Foreach function to append and create pokemons as a list of them
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
	

const teamList = document.querySelector('.team-list');

//Function to get added pokemons on a separate list
function updateTeamList() {
    teamList.innerHTML = '';

    addedPokemons.forEach((pokemonData) => {
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

		const removeButton = document.createElement('button');
		removeButton.className = 'remove-btn';
		removeButton.innerHTML = removePokemonToTeamBtn.innerHTML;
		li.appendChild(removeButton)

        teamList.appendChild(li);
    });
}

		const maxTeamMembers = 3
		let	popUpMessege = document.createElement('div')
		popUpMessege.innerText = 'Team is full.'
		popUpMessege.classList.add('pop-up-window')

//Button to add pokemons to a list
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


//Button to remove pokemons from a list
const removePokemonToTeamBtn = document.querySelector('.remove-btn');
removePokemonToTeamBtn.style.display = 'none'

removePokemonToTeamBtn.addEventListener('click', () => {
    const indexToRemove = addedPokemons.findIndex((pokemon) => pokemon === pokemonData);

    if (indexToRemove !== -1) {
        addedPokemons.splice(indexToRemove, 1);
        console.log(`Removed ${pokemonData.name} from the team`);
        updateTeamList();
    } else {
        console.log(`${pokemonData.name} is not in the team`);
    }
});

//Input to search pokemons by their names and types
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
