const ui = {
  gameBoard: document.querySelector('.game-board'),
  cells: document.querySelectorAll('.cell'),
  resetBtn: document.querySelector('.restart'),
  message: document.querySelector('.message'),
};

// Player Factory Function

function createPlayer(name, symbol) {
  return { name, symbol };
}

// GameBoard Factory Function
function createGameBoard() {
  const board = Array(9).fill(null);

  // Check if there is a winner
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal (Rows)
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical (Columns)
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];

    //
    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  // Check if the board is full
  function isFull() {
    return board.every((cell) => cell !== null);
  }

  // Make a move
  function makeMove(index, symbol) {
    if (board[index] === null) {
      board[index] = symbol;
      return true;
    }
    return false;
  }

  // Get the board
  function getBoard() {
    return board;
  }

  // Return the public methods
  return { checkWinner, isFull, makeMove, getBoard };
}

// Main game function

function game() {
  const playerX = createPlayer('Player X', 'X');
  const playerO = createPlayer('Player O', 'O');
  const gameBoard = createGameBoard();
  let currentPlayer = playerX;

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (
        !gameBoard.isFull() &&
        gameBoard.makeMove(index, currentPlayer.symbol)
      ) {
        cell.textContent = currentPlayer.symbol;
        const winner = gameBoard.checkWinner();
        if (winner) {
          //   alert(`${currentPlayer.name} wins!`);
          //   document.querySelector('#reset').click();
          ui.message.textContent = `${currentPlayer.name} wins!`;

          resetGame();
        } else if (gameBoard.isFull()) {
          ui.message.textContent = "It's a draw!";
          //   alert("It's a draw!");
          resetGame();
        } else {
          currentPlayer = currentPlayer === playerX ? playerO : playerX;
        }
      }
    });
  });

  // Reset the game

  function resetGame() {
    gameBoard.getBoard().fill(null);
    cells.forEach((cell) => {
      cell.textContent = '';
    });
    currentPlayer = playerX;
  }

  // Reset the game when the reset button is clicked
  ui.resetBtn.addEventListener('click', () => {
    resetGame();
    ui.message.textContent = '';
  });
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', game);
