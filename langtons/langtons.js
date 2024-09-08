var scale = 10, h, w, grid=[], active=false, running=true, px, py, dir = 0, dirs = [[0,-1],[1,0],[0,1],[-1,0]];

function init() {
  h = window.innerHeight;
  w = window.innerWidth;
  height(h, w)
  ws = w/scale;
  hs = h/scale;
  for (i=0; i<(ws); i+=1) {
    var row = [];
    for (j=0; j<(hs); j+=1) {
      row.push(0);
    }
    grid.push(row);
  }
  px = Math.round(ws/2);
  py = Math.round(hs/2);
  grid[px][py] = 1;
  console.log(grid)
}

function update() {
  color("#344E41");
  stroke("#344E41");
  if (running) {
    let val = grid[px][py];
    if (val == 1) {
      if (dir > 0) {
        dir -= 1;
      } else {
        dir = 3;
      }
      grid[px][py] = 0;
      px += dirs[dir][0];
      py += dirs[dir][1];
    } else {
      if (dir < 3) {
        dir += 1;
      } else {
        dir = 0;
      }
      grid[px][py] = 1;
      px += dirs[dir][0];
      py += dirs[dir][1];
    }
  }
  for (i=0; i<(ws); i++) {
    for (j=0; j<(hs); j++) {
      let alive = grid[i][j];
      if (alive==1) {
        rect(i*scale, j*scale, scale, scale);
      }
    }
  }
}

function keyup(e) {
  if (e==" " && running) {
    running = false;
  } else if (e==" ") {
    running = true;
  }
}

loop(100);
