async function getPokemon() {
	const url = 'https://pokeapi.co/api/v2/pokemon/ditto'
	const response = await fetch(url)
	const data = await response.json()

	return data.abilities
}
export { getPokemon }
