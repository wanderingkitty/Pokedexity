import { pokemonListContainer, addedPokemons, addPokemonToTeamBtn, teamContainer, hideSecondScreen, secondScreen } from './main.js';

const goToMainScreenBtn = document.querySelector('.logo-btn');
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
    }
    
    showSecondScreen();
});

goToMainScreenBtn.addEventListener('click', () => {
    console.log('btn works');
    pokemonListContainer.classList.remove('hide');
    pokemonListContainer.classList.add('show');
    teamContainer.classList.remove('show');
    teamScreenBtn.classList.remove('hide');
    hideSecondScreen()

});

function updateTeamList() {
    teamList.innerHTML = '';
    const pokemonTeam = 3;
    let currentTeam = document.createElement('ul');

    addedPokemons.forEach((pokemonData, index) => {
        const li = document.createElement('li');
        li.textContent = `${pokemonData.name.toUpperCase()} - ${pokemonData.types.join(', ')}`;
        li.className = 'pokemon-name pokemon-list-container pokemon-item';

        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
        img.alt = pokemonData.name;

        imgContainer.appendChild(img);
        li.appendChild(imgContainer);
        currentTeam.appendChild(li);

        if ((index + 1) % pokemonTeam === 0 || index === addedPokemons.length - 1) {
            teamList.appendChild(currentTeam);
            currentTeam = document.createElement('ul');
        }
    });
}


updateTeamList();

addPokemonToTeamBtn.addEventListener('click', updateTeamList);
