let cells = document.querySelectorAll('.cell');
let message = document.querySelector('.message');
let resetButton = document.querySelector('.reset-button');
let currentPlayer = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let handleCellClick = (e) => {
  const index = parseInt(e.target.dataset.index);

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = 'x';
    e.target.textContent = 'x';
    e.target.classList.add('x');
    checkWin();
    if (gameActive) {
      computerMove();
    }
  }
};

const computerMove = () => {
  let emptyCells = [];
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === '') {
      emptyCells.push(i);
    }
  }
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const index = emptyCells[randomIndex];
    gameBoard[index] = 'o';
    cells[index].textContent = 'o';
    cells[index].classList.add('o');
    checkWin();
  }
};

const checkWin = () => {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      message.textContent = `Игрок ${gameBoard[a]} выиграл!`;
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    message.textContent = 'Ничья!';
    gameActive = false;
  }
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'x';
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

