let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = 'player';  // Default mode: player vs player

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame(mode) {
  gameMode = mode;
  resetGame();
  document.getElementById('message').textContent = gameMode === 'computer' ? "Playing against Computer" : "Playing Player vs Player";
}

function makeMove(index) {
  if (board[index] !== "" || !gameActive) return;
  
  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].textContent = currentPlayer;
  
  checkWinner();
  
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameMode === 'computer' && currentPlayer === "O") {
      computerMove();
    }
  }
}

function computerMove() {
  // Simple AI: random empty spot
  let emptySpots = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  let randomIndex = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  
  board[randomIndex] = "O";
  document.getElementsByClassName('cell')[randomIndex].textContent = "O";
  
  checkWinner();
  
  if (gameActive) {
    currentPlayer = "X";
  }
}

function checkWinner() {
  let roundWon = false;
  
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }
  
  if (roundWon) {
    document.getElementById('message').textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }
  
  if (!board.includes("")) {
    document.getElementById('message').textContent = "It's a draw!";
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.getElementById('message').textContent = "";
  
  let cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}
