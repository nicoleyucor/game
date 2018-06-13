function Game(){
  this.grid = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  this.score = 0;
  this.bestScore;
  this.init();
}

//track score
Game.prototype.init = function(){
	this.addRandomNum();
	this.addRandomNum();
	this.printCells();
		if (localStorage.getItem('bestScore')){
			this.bestScore = localStorage.getItem('bestScore');
		} else {
			this.bestScore = 0;
		}
	this.printScore();
	this.move();
};


Game.prototype.getRandom = function(){
  return Math.random() < 0.9 ? 2 : 4;
};

Game.prototype.getRandom1 = function() {
  return Math.floor(Math.random() * 4);
};

Game.prototype.addRandomNum = function() {
  var row = this.getRandom1();
  var column = this.getRandom1();

  if (this.grid[row][column] === 0) {
    this.grid[row][column] = this.getRandom();
  } else {
    this.addRandomNum();
  }
};

Game.prototype.resetView = function() {
  var i, j, cell = document.getElementsByClassName('cell');

      i = 0;
      while (i < this.grid.length) {
        j = 0;
        while (j < this.grid[i].length) {
          cell[i*4 + j].innerHTML = '';
          cell[i*4 + j].className = 'cell';
          j += 1;
        }
        i += 1;
      }
};

Game.prototype.printCells = function() {
  var i, j, cell = document.getElementsByClassName('cell');
  this.resetView();

      i = 0;
      while (i < this.grid.length) {
        j = 0;
        while (j < this.grid[i].length) {
          if (this.grid[i][j] > 0) {
            cell [i * 4 + j].innerHTML = this.grid[i][j];
          }
          j += 1;
        }
        i += 1;
      }
  this.addClasses();
};

Game.prototype.printScore = function(){
  var score = document.getElementsByClassName('currentScore')[0];
  var bestScore = document.getElementsByClassName('currentScore')[1];

  score.innerHTML = this.score;
	  if (this.score > this.bestScore) {
	    bestScore.innerHTML = this.score;
	    localStorage['bestScore'] = this.score;
	  } else {
	    bestScore.innerHTML = this.bestScore;
	  }
};

Game.prototype.addClasses = function(){
  var i, x, cell = document.getElementsByClassName('cell');

  i = 0;
  while (i < 16) {
    x = 2;
    if (cell[i].innerHTML) {
      while (x != cell[i].innerHTML) {
        x = x * 2;
      }
      cell[i].className = 'cell cell-' + x;
    }
    i += 1;
  }
};

Game.prototype.moveLeft = function(){
  var i, x, y, canMove = false;

  i = 0;
  while (i < this.grid.length) {
    if (this.grid[i] != [0, 0, 0, 0]) {
      y = 0;
      while (y < this.grid[i].length) {
        x = 0;
          while (x < this.grid[i].length - 1) {
            if (this.grid[i][x] === 0) {
              this.grid[i][x] = this.grid[i][x+1];
              this.grid[i][x+1] = 0;
              if (this.grid[i][x] !== 0) {
                canMove = true;
              }
            }
            x += 1;
          }
        y += 1;
      }
    }
    i += 1;
  }
  return canMove;
};

Game.prototype.moveRight = function(){
  var i, x, y, canMove = false;

  i = 0;
  while (i < this.grid.length) {
    if (this.grid[i] != [0, 0, 0, 0]) {
      y = 0;
      while (y < this.grid[i].length) {
        x = this.grid.length - 1;
          while (x > 0) {
            if (this.grid[i][x] === 0) {
              this.grid[i][x] = this.grid[i][x-1];
              this.grid[i][x-1] = 0;
              if (this.grid[i][x] !== 0) {
                canMove = true;
              }
            }
            x -= 1;
          }
        y += 1;
      }
    }
    i += 1;
  }
  return canMove;
};


Game.prototype.moveUp = function(){
  var i, x, y, canMove = false;

  y = 0;
  while (y < this.grid.length - 1) {
    i = 0;
    while (i < this.grid.length - 1) {
      x = 0;
      while (x < this.grid.length) {
        if (this.grid[i][x] === 0) {
          this.grid[i][x] = this.grid[i+1][x];
          this.grid[i+1][x] = 0;
          if (this.grid[i][x] !== 0) {
            canMove = true;
          }
        }
        x += 1;
      }
      i += 1;
    }
    y += 1;
  }
  return canMove;
};


Game.prototype.moveDown = function(){
  var i, x, y, canMove = false;

  y = 0;
  while (y < this.grid.length - 1) {
    i = this.grid.length - 1;
    while (i > 0) {
      x = 0;
      while (x < this.grid.length) {
        if (this.grid[i][x] === 0) {
          this.grid[i][x] = this.grid[i-1][x];
          this.grid[i-1][x] = 0;
          if (this.grid[i][x] !== 0) {
            canMove = true;
          }
        }
        x += 1;
      }
      i -= 1;
    }
    y += 1;
  }
  return canMove;
};

Game.prototype.checkMatchLeft = function(){
  var i, x, canMerge = false;

  i = 0;
  while (i < this.grid.length) {
    x = 0;
    while (x < this.grid[i].length - 1) {
      if (this.grid[i][x] !== 0 && this.grid[i][x] === this.grid[i][x+1]) {
        this.grid[i][x] = this.grid[i][x] * 2;
        this.score += this.grid[i][x];
        this.grid[i][x+1] = 0;
        canMerge = true;
      }
      x += 1;
    }
    i += 1;
  }
  this.moveLeft();
  return canMerge;
};

Game.prototype.checkMatchRight = function(){
  var i, x, canMerge = false;

  i = 0;
  while (i < this.grid.length) {
    x = this.grid.length - 1;
    while (x > 0) {
      if (this.grid[i][x] !== 0 && this.grid[i][x] === this.grid[i][x-1]) {
        this.grid[i][x] = this.grid[i][x] * 2;
        this.score += this.grid[i][x];
        this.grid[i][x-1] = 0;
        canMerge = true;
      }
      x -= 1;
    }
    i += 1;
  }

  this.moveRight();
  return canMerge;

};

Game.prototype.checkMatchUp = function(){
  var i, x, canMerge = false;

  i = 0;
  while (i < this.grid.length - 1) {
    x = 0;
    while (x < this.grid.length) {
      if (this.grid[i][x] !== 0 && this.grid[i][x] === this.grid[i+1][x]) {
        this.grid[i][x] = this.grid[i][x] * 2;
        this.score += this.grid[i][x];
        this.grid[i+1][x] = 0;
        canMerge = true;
      }
      x += 1;
    }
    i += 1;
  }
  this.moveUp();
  return canMerge;
};

Game.prototype.checkMatchDown = function(){
  var i, x, canMerge = false;

  i = this.grid.length - 1;
  while (i > 0) {
    x = 0;
    while (x < this.grid.length) {
      if (this.grid[i][x] !== 0 && this.grid[i][x] === this.grid[i-1][x]) {
        this.grid[i][x] = this.grid[i][x] * 2;
        this.score += this.grid[i][x];
        this.grid[i-1][x] = 0;
        canMerge = true;
      }
      x += 1;
    }
    i -= 1;
  }

  this.moveDown();
  return canMerge;

};

Game.prototype.move = function(){
  var self = this;
  var move, check;

  document.addEventListener('keydown', function movements(a) {
    a = a || window.event;

    if (a.keyCode == '37') {
      move = self.moveLeft();
      check = self.checkMatchLeft();
      if (move || check) {
        self.addRandomNum();
        self.printCells();
        self.printScore();
      }
    }
    else if (a.keyCode == '38') {
      move = self.moveUp();
      check = self.checkMatchUp();
      if (move || check) {
        self.addRandomNum();
        self.printCells();
        self.printScore();
      }
    }
    else if (a.keyCode == '39') {
      move = self.moveRight();
      check = self.checkMatchRight();
      if (move || check) {
        self.addRandomNum();
        self.printCells();
        self.printScore();
      }
    }
    else if (a.keyCode == '40') {
      move = self.moveDown();
      check = self.checkMatchDown();
      if (move || check) {
        self.addRandomNum();
        self.printCells();
        self.printScore();
      }
    }
    self.checkIfLost();
    if (self.checkIfWon()) {
      document.removeEventListener('keydown', movements);
    }
  });

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  };

  function handleTouchMove(evt) {
    event.preventDefault();

    self.checkIfLost();

    if (self.checkIfWon()) {
      document.removeEventListener('touchstart', handleTouchStart, false);
    }

      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
          if ( xDiff > 0 ) {
            move = self.moveLeft();
            check = self.checkMatchLeft();
            if (move || check) {
              self.addRandomNum();
              self.printCells();
              self.printScore();
            }
          } else {
            move = self.moveRight();
            check = self.checkMatchRight();
            if (move || check) {
              self.addRandomNum();
              self.printCells();
              self.printScore();
            }
          }
      } else {
          if ( yDiff > 0 ) {
            move = self.moveUp();
            check = self.checkMatchUp();
            if (move || check) {
              self.addRandomNum();
              self.printCells();
              self.printScore();
            }
          } else {
            move = self.moveDown();
            check = self.checkMatchDown();
            if (move || check) {
              self.addRandomNum();
              self.printCells();
              self.printScore();
            }
          }
      }
      /* reset values */
      xDown = null;
      yDown = null;
  };
};

Game.prototype.checkIfWon = function(){
  var i, won = false, 
  div = document.getElementById('won');

  i = 0;
  while (i < this.grid.length) {
    if (this.grid[i].indexOf(2048) > -1) {
      won = true;
      div.style.display = 'block';
      break;
    }
    i += 1;
  }

  return won;
};

Game.prototype.checkIfLost = function (){
  var i, x, lost = true, 
  div = document.getElementById('lost');

  i = 0;
  while (i < this.grid.length - 1) {
    x = 0;
    while (x < this.grid.length) {
      if (this.grid[i][x] === 0 || this.grid[i][x] === this.grid[i+1][x] || this.grid[i+1][x] === 0) {
        lost = false;
      }
      x += 1;
    }
    i += 1;
  }

  i = 0;
  while (i < this.grid.length) {
    x = 0;
    while (x < this.grid[i].length - 1) {
      if (this.grid[i][x] === 0 || this.grid[i][x] === this.grid[i][x+1] || this.grid[i][x+1] === 0) {
        lost = false;
      }
      x += 1;
    }
    i += 1;
  }
  if (lost) {
    div.style.display = 'block';
  }
};

new Game();