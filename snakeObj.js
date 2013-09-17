function Snake(xStart, yStart, startDirection) {
  this.segment = [[xStart, yStart]];
  this.xHead = xStart;
  this.yHead = yStart;
  this.direction = startDirection;
  this.alive = true;
}

Snake.prototype.turn = function(input_direction) {
  // Can't move backwards!
  if ((this.direction === "north" && input_direction === "south") ||
      (this.direction === "south" && input_direction === "north") ||
      (this.direction === "east" && input_direction === "west") ||
      (this.direction === "west" && input_direction === "east")) {
        return;
  } else {
  this.direction = input_direction;
  }
}

Snake.prototype.move = function() {
  switch (this.direction) {
    case "north":
      this.xHead -= 1;
      break;
    case "south":
      this.xHead += 1;
      break;
    case "west":
      this.yHead -= 1;
      break;
    case "east":
      this.yHead += 1;
      break;
  }
  this.segment.push([this.xHead, this.yHead])
}

Snake.prototype.dropTail = function() {
  return this.segment.shift();
}