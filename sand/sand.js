var scale = 5,
  h,
  w,
  grid = [],
  active = false,
  running = true;
var mx, my;

function init() {
  h = window.innerHeight;
  w = window.innerWidth;
  height(h, w);
  for (i = 0; i < w / scale; i += 1) {
    var row = [];
    for (j = 0; j < h / scale; j += 1) {
      row.push(0);
    }
    grid.push(row);
  }
  console.log(grid);
}

function update() {
  color("#e3b976");
  stroke("#e3b976");
  if (active) {
    grid[mx][my] = 1;
  }
  if (running) {
    let newg = gen();
    for (i = 0; i < w / scale - 1; i += 1) {
      for (j = 0; j < h / scale - 1; j += 1) {
        let alive = grid[i][j];
        if (alive == 1) {
          if (grid[i][j + 1] == 0 && j < h / scale - 2) {
            newg[i][j + 1] = 1;
          } else if (j >= h / scale - 2) {
            newg[i][j] = 1;
          } else if (grid[i + 1][j + 1] == 0) {
            newg[i + 1][j + 1] = 1;
          } else if (grid[i - 1][j + 1] == 0) {
            newg[i - 1][j + 1] = 1;
          } else {
            newg[i][j] = 1;
          }
        }
      }
    }
    grid = newg;
  }
  for (i = 0; i < w / scale; i++) {
    for (j = 0; j < h / scale; j++) {
      let alive = grid[i][j];
      if (alive == 1) {
        rect(i * scale, j * scale, scale, scale);
      }
    }
  }
}

function gen() {
  let g = [];
  for (i = 0; i < w / scale; i += 1) {
    var row = [];
    for (j = 0; j < h / scale; j += 1) {
      row.push(0);
    }
    g.push(row);
  }
  return g;
}

function mousedown(e) {
  active = true;
  mx = Number((e.clientX / scale).toFixed(0));
  my = Number((e.clientY / scale).toFixed(0));
  grid[Number((e.clientX / scale).toFixed(0))][
    Number((e.clientY / scale).toFixed(0))
  ] = 1;
}

function mouseup(e) {
  active = false;
}

function mousemove(e) {
  if (active) {
    mx = Number((e.clientX / scale).toFixed(0));
    my = Number((e.clientY / scale).toFixed(0));
    grid[Number((e.clientX / scale).toFixed(0))][
      Number((e.clientY / scale).toFixed(0))
    ] = 1;
  }
}

function keyup(e) {
  if (e == " " && running) {
    running = false;
  } else if (e == " ") {
    running = true;
  }
}

loop(10);
