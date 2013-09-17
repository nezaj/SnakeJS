function Game(xDim, yDim) {
  var xSnakeStart = Math.floor(xDim/2);
  var ySnakeStart = Math.floor(yDim/2);
  this.snake = new Snake(xSnakeStart, ySnakeStart, 'north');
  this.maxRow = xDim;
  this.maxCol = yDim;
  this.board = this.makeBoard(xDim, yDim)
  this.hasApple = false;
  this.score = 0;
  this.generateApple();
  this.placeSnakeOnBoard();
}

Game.prototype.makeBoard = function(xDim, yDim) {
  return _.times(xDim, function (i) {
    return _.times(yDim, function(j) {
      if (i === 0 || j === 0 || i === xDim - 1 || j === xDim - 1) {
        return 'wall';
      } else {
        return 'open';
      }
    });
  });
};

Game.prototype.game_step = function() {
    if (this.hasApple === false) {
      this.generateApple();
    }

    this.snake.move();

    var x = this.snake.xHead;
    var y = this.snake.yHead;

    if (this.board[x][y] === "wall" || this.board[x][y] === "snake") {
      console.log("Dead!");
      this.snake.alive = false;
      return;
    } else if (this.board[x][y] === "apple") {
      console.log("Ate Apple");
      this.score += 100;
      this.hasApple = false;
    } else {
      console.log("Dropped Tail");
      var xyCoords = this.snake.dropTail();
      this.board[xyCoords[0]][xyCoords[1]] = "open";
    }

    this.placeSnakeOnBoard();
}

Game.prototype.generateApple = function() {
  while (!this.hasApple) {
    x = Math.floor(Math.random() * this.maxRow);
    y = Math.floor(Math.random() * this.maxCol);
    if (this.board[x][y] === "open") {
      this.board[x][y] = "apple";
      this.hasApple = true;
    }
  }
}

Game.prototype.placeSnakeOnBoard = function() {
  var holdBoard = this.board;
  _(this.snake.segment).each(function(coords) {
    holdBoard[coords[0]][coords[1]] = "snake";
  });
}