import { sample } from './ajax.js';
// import { colors } from './colors.js';
export const pokemonListContainer = document.querySelector('.pokemon-container');
const pokemonsName = document.querySelector('.pokemon-name')
// let pokemonTypeColor
const searchPokemonInput = document.querySelector('#site-search')
export const addedPokemons = []
const teamContainer = document.querySelector('.team-container')
teamContainer.classList.add('hide')


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

export const addPokemonToTeamBtn = document.querySelector('.add-btn')
addPokemonToTeamBtn.style.display = 'none'

// function getTypeColor(type) {
// 	return colors[type] || '#CCCCCC';
// }

async function createListOfPokemons() {
	const listOfPokemons = sample.results
	
	shufflePokemons(listOfPokemons);
	
	const ul = document.createElement('ul');
	ul.classList.add('pokemon-name')
	
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
		li.textContent = `${pokemonData.name.toUpperCase()} - ${pokemonData.types.join(', ')}`
		li.className = 'pokemon-list-container pokemon-item'
		
		const addButton = document.createElement('button')
		addButton.className = 'add-btn'
		addButton.innerHTML = addPokemonToTeamBtn.innerHTML;
	
		const imgContainer = document.createElement('div')
		imgContainer.className = 'img-container'
		const img = document.createElement('img')
		img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
		img.alt = pokemonData.name;
	
		imgContainer.appendChild(img)
		imgContainer.appendChild(img)
		li.appendChild(imgContainer)

		ul.appendChild(li)
		li.appendChild(addButton)
		
		addButton.addEventListener('click', () => {
			if (!addedPokemons.includes(pokemonData)) {
				addedPokemons.push(pokemonData)
				console.log(`Added ${pokemonData.name} to the team`)
			} else {
				console.log(`${pokemonData.name} is already in the team`)
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
