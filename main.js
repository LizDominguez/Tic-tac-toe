/*jslint browser: true*/
'use strict';

var wins = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var grid = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];

var tiles = document.querySelectorAll('.game-board div'),
    chooseX = document.querySelector('#x'),
    chooseO = document.querySelector('#o'),
    currentPlayer = 'X';

function choosePlayerSymbol() {
  
  chooseX.addEventListener('click', function() {
    currentPlayer = 'X';
    clearGameBoard();
  });
  
  chooseO.addEventListener('click', function() {
    currentPlayer = 'O';
    clearGameBoard();
  });
  
  startGame();
}

function startGame() {
 
  tiles.forEach(function(tile, i) {

    tile.addEventListener('click', function() {
      if (grid[i] === 0) {
        if (currentPlayer === 'X') {
          grid[i] = 1; // X = 1 on game board
        } else {
          grid[i] = -1; // O = -1 on game board
        }

        tile.innerHTML = currentPlayer;
        computerPlays();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
      console.log(grid);
      checkWin(grid);
    });
  });
}

function checkWin(gameGrid) {

  var count = 0;
  
  for (var i = 0; i < wins.length; i++) {
    count = 0;
    for (var j = 0; j < 3; j++) {
      if (grid[wins[i][j]] === 1) {
        count += 1;
      } else if (grid[wins[i][j]] === -1) {
        count -= 1;
      }
    }
    
    if (count === 3) {
      console.log('X WINS');
      announceWin('X');
    } else if (count === -3) {
      console.log('O WINS');
      announceWin('O');
    }
  } 
}

function announceWin(winner) {
  var winMsg = document.querySelector('.win');
  winMsg.innerHTML = '<p>' + winner + ' Wins!</p> <button>Play Again?</button>';
  var playAgainBtn = document.querySelector('.win button');
  winMsg.style.display = 'block';
  
  playAgainBtn.addEventListener('click', function() {
    winMsg.style.display = 'none';
    clearGameBoard();
  });
}

function clearGameBoard() {
  tiles.forEach(function(tile, i) {  
      tile.innerHTML = '';
    });
  grid = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function computerPlays() {
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
  for (var i = 0; i < tiles.length; i++) {
     if (grid[i] === 0) {
        if (currentPlayer === 'X') {
          grid[i] = 1; // X = 1 on game board
        } else {
          grid[i] = -1; // O = -1 on game board
        }
        tiles[i].innerHTML = currentPlayer;  
        break;
      }
      console.log(grid);
      checkWin(grid);
  }
}

choosePlayerSymbol();

// TODO: make computer win

