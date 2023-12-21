export function createElement(type, className, content) {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

export function addEvent(element, event, handler) {
    element.addEventListener(event, handler);
}

export function updateListUI(list, selector, maxCount = Infinity) {
    const container = document.querySelector(selector);
    container.innerHTML = '';
    list.forEach((pokemonData) => {
        // Create UI elements for each pokemon and append to container
    });
    for (let i = list.length; i < maxCount; i++) {
        // Create and append empty slot UI elements
    }
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
