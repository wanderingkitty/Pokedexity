export const myTeam = document.querySelector('.team-btn')
import { secondScreen } from './poke.js'

myTeam.addEventListener('click', () => {
	firstScreen.classList.add('hide');
	firstScreen.classList.remove('show');
	secondScreen.classList.add('show');
	secondScreen.classList.remove('hide');
})