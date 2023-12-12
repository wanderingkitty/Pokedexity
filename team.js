import { pokemonListContainer } from './main.js'
import { addedPokemons } from './main.js'
import {addPokemonToTeamBtn} from './main.js'

const goToMainScreenBtn = document.querySelector('.logo-btn')
const teamContainer = document.querySelector('.team-container')
const teamList = document.querySelector('.team-list')
const teamScreenBtn = document.querySelector('.team-btn')

teamScreenBtn.addEventListener('click', () =>{
	console.log('Team button clicked');
	pokemonListContainer.classList.add('hide')
	teamContainer.classList.add('show')
})

goToMainScreenBtn.addEventListener('click', () =>{
    console.log('btn workds');
	pokemonListContainer.classList.remove('hide')
    pokemonListContainer.classList.add('show')
    // teamContainer.classList.add('hide')
})

// Function to update the team list
function updateTeamList() {
    teamList.innerHTML = '';

    addedPokemons.forEach((pokemonData) => {
        const li = document.createElement('li');
        li.textContent = `${pokemonData.name.toUpperCase()} - ${pokemonData.types.join(', ')}`;
        li.className = 'pokemon-name';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
        img.alt = pokemonData.name;

        imgContainer.appendChild(img);
        li.appendChild(imgContainer);
        teamList.appendChild(li);
    });
}

updateTeamList();

addPokemonToTeamBtn.addEventListener('click', updateTeamList);
