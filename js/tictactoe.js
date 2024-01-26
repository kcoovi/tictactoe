// Define game variables
var currentPlayer = "X";
var gameBoard = ["", "", "", "", "", "", "", "", ""];
var gameActive = true;
// Function to handle cell click
function handleCellClick(index) {
  if (gameBoard[index] === "" && gameActive) {
    gameBoard[index] = currentPlayer;
    updateGameBoard();
    checkWinner();
    togglePlayer();
  }
}
// Function to update the game board UI
function updateGameBoard() {
  var cells = document.querySelectorAll(".cell");
  cells.forEach(function (cell, index) {
    cell.textContent = gameBoard[index];
  });
}
// Function to check for a winner or a tie
function checkWinner() {
  var winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (
    var _i = 0, winPatterns_1 = winPatterns;
    _i < winPatterns_1.length;
    _i++
  ) {
    var pattern = winPatterns_1[_i];
    var a = pattern[0],
      b = pattern[1],
      c = pattern[2];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      document.getElementById("status").textContent = "".concat(
        currentPlayer,
        " wins!"
      );
      gameActive = false;
      return;
    }
  }
  if (!gameBoard.includes("")) {
    document.getElementById("status").textContent = "It's a tie!";
    gameActive = false;
  }
}
// Function to toggle players (X and O)
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").textContent = "Current Player: ".concat(
    currentPlayer
  );
}
// Function to reset the game
function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  document.getElementById("status").textContent = "Current Player: X";
  updateGameBoard();
}
// Generate the initial game board
document.addEventListener("DOMContentLoaded", function () {
  var boardContainer = document.getElementById("board");
  var _loop_1 = function (i) {
    var cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", function () {
      return handleCellClick(i);
    });
    boardContainer === null || boardContainer === void 0
      ? void 0
      : boardContainer.appendChild(cell);
  };
  for (var i = 0; i < 9; i++) {
    _loop_1(i);
  }
});
