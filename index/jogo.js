const cardsArray = [
  { name: 'A', symbol: '7' },
  { name: 'A', symbol: '7' },
  { name: 'B', symbol: '6' },
  { name: 'B', symbol: '6' },
  { name: 'C', symbol: '4' },
  { name: 'C', symbol: '4' },
  { name: 'D', symbol: '2' },
  { name: 'D', symbol: '2' },
  { name: 'E', symbol: '1' },
  { name: 'E', symbol: '1' },
  { name: 'F', symbol: '3' },
  { name: 'F', symbol: '3' },
  { name: 'G', symbol: '8' },
  { name: 'G', symbol: '8' },
  { name: 'H', symbol: '5' },
  { name: 'H', symbol: '5' },
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
