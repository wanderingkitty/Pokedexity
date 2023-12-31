
//Function to get data from url
async function getPokemon() {
	const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
	const response = await fetch(url)
	const data = await response.json()
	
	return data
}
export { getPokemon }

//Object for specifying typed colors of pokemons
export const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};
