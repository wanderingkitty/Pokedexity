import { pokemonListContainer, addedPokemons, addPokemonToTeamBtn, teamContainer, hideSecondScreen, secondScreen, searchPokemonInput } from './main.js';

const goToMainScreenBtn = document.querySelector('.go-back-btn');
const teamList = document.querySelector('.team-list');
const teamScreenBtn = document.querySelector('.team-btn');


teamScreenBtn.addEventListener('click', () => {
    console.log('Team button clicked');
    pokemonListContainer.classList.add('hide');
    teamContainer.classList.add('show');
    teamScreenBtn.classList.add('hide');
  
    function showSecondScreen() {
        console.log('Showing second screen')
        secondScreen.classList.remove('hide');
        secondScreen.classList.add('show');
        searchPokemonInput.classList.add('hide')
    }
    
    showSecondScreen();
});

goToMainScreenBtn.addEventListener('click', () => {
    console.log('btn works');
    pokemonListContainer.classList.remove('hide');
    pokemonListContainer.classList.add('show');
    teamContainer.classList.remove('show');
    teamScreenBtn.classList.remove('hide');
    searchPokemonInput.classList.remove('hide')
    searchPokemonInput.classList.add('show')
    hideSecondScreen()

});


