var game = new Game(20, 20);

function drawSnake() {
  $('body').empty();
  $('body').append('<div class="header">Snake!</div>');
  for (var i = 0; i < game.maxRow; i++) {
    var $row = $('<div class="row"></div>');
    $('body').append($row);
    for (var j = 0; j < game.maxCol; j++) {
      var cell_id = i + " " + j;
      var $cell = $('<span class="cell" id="' + cell_id + '"></span>');
      var cellContents = game.board[i][j];
      if (cellContents === "wall") {
        $cell.toggleClass("wall");
      } else if (cellContents === "open") {
        $cell.toggleClass("open");
      } else if (cellContents === "apple") {
        $cell.toggleClass("apple");
      } else {
        $cell.toggleClass("snake");
      }
      $row.append($cell);
    }
  }
	$('body').append('<div class="score">Score: ' + game.score + '</div>');
}

function run_loop() {
  game.game_step();
  drawSnake();
  if (game.snake.alive === false) {
  	$('body').append('<div class="info">Game Over!</div>');
    clearInterval(this.gameInterval);
  }
}

function pauseGame() {
  if (this.gameInterval) {
    $('body').append('<div class="info">Paused!</div>');
    clearInterval(this.gameInterval);
    this.gameInterval = null;
  } else {
    console.log("here!");
    this.gameInterval = setInterval(run_loop.bind(this), this.STEP_TIME_MILLIS);
  }
}


$(function() {
  var that = this;
  this.STEP_TIME_MILLIS = (1000 / 10);
  this.gameInterval = setInterval(run_loop.bind(this), this.STEP_TIME_MILLIS);

  key('up', function()  { game.snake.turn('north'); });
  key('down', function() {  game.snake.turn('south'); });
  key('left', function() {  game.snake.turn('west'); });
  key('right', function() { game.snake.turn('east'); });
  key('space', function() { pauseGame.bind(that)(); });
})