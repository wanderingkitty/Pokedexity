//Function to get data from url
async function getPokemon() {
	const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
	const response = await fetch(url)
	const data = await response.json()
	
	return data
}
export { getPokemon }

import { getPokemonDetails } from "./poke.js"