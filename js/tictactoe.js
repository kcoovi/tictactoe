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

    // Add X and O classes for styling
    cell.classList.remove("X", "O");
    if (gameBoard[index] === "X") {
      cell.classList.add("X");
      cell.style.color = "#2b96dd"; // Set blue color for X
    } else if (gameBoard[index] === "O") {
      cell.classList.add("O");
      cell.style.color = "#e74c3c"; // Set red color for O
    }
  });

  updatePlayerTurnTab();
}

// Function to update the player turn tab
function updatePlayerTurnTab() {
  var xTab = document.getElementById("xTab");
  var oTab = document.getElementById("oTab");

  if (currentPlayer === "X") {
    xTab.classList.add("active");
    oTab.classList.remove("active");
  } else {
    xTab.classList.remove("active");
    oTab.classList.add("active");
  }

  // Update the tab text to "X" or "O"
  xTab.textContent = "X";
  oTab.textContent = "O";
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

  for (var i = 0; i < winPatterns.length; i++) {
    var pattern = winPatterns[i];
    var a = pattern[0],
      b = pattern[1],
      c = pattern[2];

    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      document.getElementById("status").textContent = "Game Over";
      displayVictoryMessage(currentPlayer + " wins!");
      gameActive = false;
      return;
    }
  }

  if (!gameBoard.includes("")) {
    document.getElementById("status").textContent = "Game Over";
    displayVictoryMessage("It's a tie!");
    gameActive = false;
  }
}

// Function to display a victory message
function displayVictoryMessage(message) {
  var victoryMessage = document.createElement("p");
  victoryMessage.textContent = message;
  victoryMessage.classList.add("victory-message");

  // Remove existing victory message if any
  var existingMessage = document.querySelector(".victory-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  document.getElementById("board").appendChild(victoryMessage);
}

// Function to toggle players (X and O)
function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").textContent = gameActive
    ? currentPlayer + "'s Turn"
    : "Game Over";
  updatePlayerTurnTab(); // Add this line to update the player turn tab immediately
}

// Function to reset the game
function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;

  // Remove the victory message element from the DOM
  var victoryMessage = document.querySelector(".victory-message");
  if (victoryMessage) {
    victoryMessage.remove();
  }

  // Update the player turn tab to show the initial player
  updatePlayerTurnTab();

  document.getElementById("status").textContent = gameActive
    ? "Game in progress"
    : "Game Over";
  updateGameBoard();
}

// Generate the initial game board
document.addEventListener("DOMContentLoaded", function () {
  var boardContainer = document.getElementById("board");

  for (var i = 0; i < 9; i++) {
    var cell = document.createElement("div");
    cell.classList.add("cell");

    // Use closure to capture the current value of i
    cell.addEventListener(
      "click",
      (function (index) {
        return function () {
          handleCellClick(index);
        };
      })(i)
    );

    boardContainer?.appendChild(cell);
  }

  // Highlight the initial player (X) when the game starts
  updatePlayerTurnTab();
});
