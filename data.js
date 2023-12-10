// import { sample } from './ajax.js'
// import { colors } from './colors.js'

// const listOfPokemons = document.querySelector('#poke-list')

// // Function to get general Pokemon data from a URL
// async function getPokemon() {
// 	const response = await fetch('https://pokeapi.co/api/v2/pokemon')
// 	const data = await response.json()
// 	console.log('Data from API:', data)
// 	return data.results
// }

// // Function used to fetch detailed information about a specific Pokemon
// async function getDetailedPokemon(pokemonName) {
// 	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
// 	const data = await response.json()
// 	console.log('Detailed data from API:', data)
// 	return data
// }
// // Function to make Pokemons appear in a list and have their own color according to their type
// async function displayPokemonList() {
// 	try {
// 		const pokemonList = await getPokemon()
// 		listOfPokemons.innerHTML = ''

// 		const addingPokemoneBtn = document.querySelector('.add-btn')
		
// 		for (const pokemon of pokemonList) {
// 			const nameOfPokemon = document.createElement('div')
// 			nameOfPokemon.className = 'pokemon-list-container'
			
// 			const detailedPokemon = await getDetailedPokemon(pokemon.name)
// 			const types = detailedPokemon.types.map(type => type.type.name)
// 			const mainType = types[0]
// 			const color = colors[mainType] 
			
// 			const imgContainer = document.createElement('div')
// 			imgContainer.className = 'img-container'
			
// 			const img = document.createElement('img')
// 			img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailedPokemon.id}.png`;
// 			img.alt = '';
			
// 			imgContainer.appendChild(img)
// 			nameOfPokemon.appendChild(imgContainer)
			
// 			const nameDiv = document.createElement('span')
// 			nameDiv.className = 'pokemon-name';
// 			nameDiv.textContent = pokemon.name.toUpperCase()
// 			nameOfPokemon.appendChild(nameDiv)
			
// 			const typeOfPokemon = document.createElement('span')
// 			typeOfPokemon.className = 'pokemon-name-type'
// 			typeOfPokemon.style.backgroundColor = color
			
// 			const typeText = document.createTextNode(types.join(', '))
// 			typeText.className = ('pokemon-type')
			
// 			nameOfPokemon.appendChild(typeText)
// 			nameOfPokemon.appendChild(typeOfPokemon)
		
// 			nameOfPokemon.appendChild(addingPokemoneBtn)
// 			listOfPokemons.appendChild(nameOfPokemon)
// 		}
		
// 	} catch (error) {
// 		console.log('An error occurred! ' + error.message)
// 	}
// }

// window.addEventListener('load', displayPokemonList)


