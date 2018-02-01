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

var grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
      if (typeof grid[i] === 'number') {
        grid[i] = currentPlayer;
        tile.innerHTML = currentPlayer;
        computerPlays();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
      console.log(grid);
      checkForWinner(grid);
      checkForTie();
    });
  });
}

function checkForWinner(gameGrid) {

  var count = 0;
  
  for (var i = 0; i < wins.length; i++) {
    count = 0;
    for (var j = 0; j < 3; j++) {
      if (grid[wins[i][j]] === 'X') {
        count += 1;
      } else if (grid[wins[i][j]] === 'O') {
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

function checkForTie() {
  var count = 0;
  
  for (var i = 0; i < grid.length; i++) {
    if (typeof grid[i] !== 'number') {
      count++;
      if (count === grid.length - 1) {
        announceWin('tie');
      }  
    }
  }
  count = 0;
}

function announceWin(winner) {
  var winMsg = document.querySelector('.win');
  
  if (winner === 'tie') {
    winMsg.innerHTML = '<p> It\'s a ' + winner + '!</p> <button>Play Again?</button>';
  } else {
    winMsg.innerHTML = '<p>' + winner + ' Wins!</p> <button>Play Again?</button>';
  }
  
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
  grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

function computerPlays() {
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  var playIndex = checkPossibleWin();
  
  if (typeof grid[playIndex] === 'number') {
    if (currentPlayer === 'X') {
      grid[playIndex] = 'X'; 
    } else {
      grid[playIndex] = 'O'; 
    }
    tiles[playIndex].innerHTML = currentPlayer;  
  } 
}

function checkPossibleWin() {
  
  for (var i = 0; i < wins.length; i++) {
    for (var j = 0; j < 3; j++) {
      if (typeof grid[wins[i][j]] === 'number') {
        if (j === 2) {
          return wins[i][j];
        }
      } 
    }
  }
}

choosePlayerSymbol();

// TODO: make computer win

