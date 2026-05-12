var rockets = [];
const epoch = 70;
var f = 0;
var target;

function gen(m) {
  rockets = [];
  for (let i = 0; i < 15; i++) {
    rockets.push(new p(m));
  }
}
function init() {
  target = new Vector(canvas.width / 2, 200);
  gen(false);
  console.log(p + 1);
}

function p(m) {
  this.pos = new Vector(canvas.width / 2, 600);
  this.vel = new Vector();
  if (m) {
    this.m = [];
    for (let i = 0; i < epoch; i++) {
      this.m.push([
        m.m[i][0] / 2 + randint(-1, 1),
        m.m[i][1] / 2 + randint(-1, 1),
      ]);
    }
  } else {
    this.m = [];
    for (let i = 0; i < epoch; i++) {
      this.m.push([randint(-4, 4), randint(-4, 4)]);
    }
  }
  this.draw = function () {
    this.vel.x += this.m[f][0];
    this.vel.y += this.m[f][1];
    this.pos.add(this.vel);
    ellipse(this.pos.x, this.pos.y, 4);
  };
  this.score = function () {
    return dist2d(this.pos, target);
  };
}

function update() {
  color("black");
  ellipse(target.x, target.y, 10);
  rect(canvas.width / 2 - 100, 400, 200, 30);
  for (const r of rockets) {
    r.draw();
  }
  f++;
  if (f >= epoch) {
    f = 0;
    max = rockets[0];
    for (const r of rockets) {
      if (r.score() < max.score()) {
        max = r;
      }
    }
    console.log(max);
    gen(max);
  }
}

loop();
