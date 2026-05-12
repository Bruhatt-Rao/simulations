var points = [];
var len = 150;
var w = 0;
var t;

function dist2(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function init() {
  t = document.getElementById("t");
  height(500, 500);
  for (let i = 0; i < 300; i++) {
    points.push(new p());
  }
}

function p() {
  this.x = randint(0, 500);
  this.y = randint(0, 500);
  this.c = "black";
  this.draw = function () {
    color(this.c);
    ellipse(this.x, this.y, 1);
  };
  this.dist = function () {
    return dist2(250, 250, this.x, this.y);
  };
  if (this.dist() < len) {
    this.c = "red";
    w++;
  }
}

function update() {
  color("black");
  for (let i = 0; i < points.length; i++) {
    points[i].draw();
  }
  t.innerText = (((w / points.length) * (500 * 500)) / (150 * 150)).toFixed(8);
  if (points.length < 50000) {
    for (let i = 0; i < 6; i++) {
      points.push(new p());
    }
  }
}

loop();
