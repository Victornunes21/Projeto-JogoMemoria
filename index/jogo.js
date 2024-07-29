const cardsArray = [
    { name: 'A', symbol: '🂡' },
    { name: 'A', symbol: '🂡' },
    { name: 'B', symbol: '🂢' },
    { name: 'B', symbol: '🂢' },
    { name: 'C', symbol: '🂣' },
    { name: 'C', symbol: '🂣' },
    { name: 'D', symbol: '🂤' },
    { name: 'D', symbol: '🂤' },
    { name: 'E', symbol: '🂥' },
    { name: 'E', symbol: '🂥' },
    { name: 'F', symbol: '🂦' },
    { name: 'F', symbol: '🂦' },
    { name: 'G', symbol: '🂧' },
    { name: 'G', symbol: '🂧' },
    { name: 'H', symbol: '🂨' },
    { name: 'H', symbol: '🂨' },
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

document.addEventListener('DOMContentLoaded', createBoard);

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    shuffle(cardsArray);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.setAttribute('data-symbol', card.symbol);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-symbol');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name')) {
        resetCards();
    } else {
        lockBoard = true;
        setTimeout(unflipCards, 1000);
    }
}

function unflipCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetCards();
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
