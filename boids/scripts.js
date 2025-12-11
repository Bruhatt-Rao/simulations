var boids = [];
var f = true;
var sep = 0.02;
var x = 0;
var y = 0;
var c;
function startGame() {
  area.start();
  c = new component("coral");
  for (let i = 0; i < 100; i++) {
    boids.push(new component("black"));
  }
  console.log(boids[1].x);
  area.canvas.addEventListener("mousemove", function (e) {
    getMousePos(e);
  });
}
function getMousePos(event) {
  let rect = area.canvas.getBoundingClientRect();
  x = event.clientX - rect.left;
  y = event.clientY - rect.top;
}

function rx() {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(area.canvas.width);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

function ry() {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(area.canvas.height);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

var area = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(color) {
  this.r = 2;
  this.x = rx();
  this.color = color;
  this.y = ry();
  this.vx = 0;
  this.vy = 0;
  this.distance = function (p) {
    return Math.sqrt(
      (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y),
    );
  };
  this.draw = function () {
    let ctx = area.context;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();
    let len = 5; // length of direction line
    let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    if (speed > 0.001) {
      let dx = (this.vx / speed) * len;
      let dy = (this.vy / speed) * len;

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + dx, this.y + dy);
      ctx.stroke();
    }
  };
  this.update = function () {
    let neighbors = 0;
    let avx = 0;
    let avy = 0;
    let cdx = 0;
    let cdy = 0;
    let avvx = 0;
    let avvy = 0;

    for (const p of boids) {
      let d = this.distance(p);
      if (p != this && d < 100) {
        avx += p.x;
        avy += p.y;
        avvx += p.vx;
        avvy += p.vy;
        if (d > 0) {
          if (d < 50) {
            // <- adjust this "personal space" distance
            cdx += (this.x - p.x) / (d * 0.5);
            cdy += (this.y - p.y) / (d * 0.5);
          } else {
            cdx += (this.x - p.x) / d;
            cdy += (this.y - p.y) / d;
          }
        }
        neighbors++;
      }
    }
    let d = this.distance(c);
    if (d < 100) {
      avx += c.x;
      avy += c.y;
      avvx += c.vx;
      avvy += c.vy;
      cdx += this.x - c.x;
      cdy += this.y - c.y;
      neighbors++;
    }
    // this.vx = 0;
    // this.vy = 0;
    if (neighbors > 0) {
      this.vx += (avx / neighbors - this.x) * 0.005;
      this.vy += (avy / neighbors - this.y) * 0.005;

      // Alignment (match average velocity)
      this.vx += (avvx / neighbors - this.vx) * 0.1;
      this.vy += (avvy / neighbors - this.vy) * 0.1;

      // Separation (steer away from crowding)
      this.vx += cdx * sep;
      this.vy += cdy * sep;
    }

    let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    let maxSpeed = 3;
    if (speed > maxSpeed) {
      this.vx = (this.vx / speed) * maxSpeed;
      this.vy = (this.vy / speed) * maxSpeed;
    }
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) {
      this.x = area.canvas.width - 2;
    } else if (this.x > area.canvas.width) {
      this.x = 1;
    }
    if (this.y < 0) {
      this.y = area.canvas.height - 2;
    } else if (this.y > area.canvas.height) {
      this.y = 1;
    }
  };
}

function updateGameArea() {
  area.clear();
  c.x = x;
  c.y = y;
  c.draw();
  for (const p of boids) {
    p.update();
    p.draw();
  }
}
