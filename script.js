const board = document.getElementById("board");
const popup = document.getElementById("popup");
const resultText = document.getElementById("resultText");
const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const xTurn = document.getElementById("xTurn");
const oTurn = document.getElementById("oTurn");

let currentPlayer = "X";
let gameState = Array(9).fill(null);

function startGame() {
  homeScreen.style.display = "none";
  gameScreen.style.display = "block";
  createBoard();
}

function createBoard() {
  board.innerHTML = "";
  gameState = Array(9).fill(null);
  currentPlayer = "X";
  updateTurnIndicator();
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => makeMove(i, cell));
    board.appendChild(cell);
  }
}

function makeMove(index, cell) {
  if (gameState[index] || popup.style.display === "block") return;
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  document.getElementById("dropSound").play();

  if (checkWin()) {
    document.getElementById("winSound").play();
    showPopup(`${currentPlayer} Wins!`);
  } else if (gameState.every(Boolean)) {
    document.getElementById("drawSound").play();
    showPopup("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator();
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(p => 
    gameState[p[0]] && gameState[p[0]] === gameState[p[1]] && gameState[p[1]] === gameState[p[2]]
  );
}

function showPopup(message) {
  resultText.textContent = message;
  popup.style.display = "block";
}

function newGame() {
  popup.style.display = "none";
  createBoard();
}

function goHome() {
  popup.style.display = "none";
  gameScreen.style.display = "none";
  homeScreen.style.display = "block";
}

function updateTurnIndicator() {
  if (currentPlayer === "X") {
    xTurn.classList.add("active");
    oTurn.classList.remove("active");
  } else {
    oTurn.classList.add("active");
    xTurn.classList.remove("active");
  }
}



