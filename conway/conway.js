var scale = 20, h, w, grid=[], active=false, running=true;

function init() {
  h = window.innerHeight;
  w = window.innerWidth;
  height(h, w)
  for (i=0; i<(w/scale); i+=1) {
    var row = [];
    for (j=0; j<(h/scale); j+=1) {
      if (randint(0,10) <3) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }
  console.log(grid)
}

function update() {
  color("#344E41");
  stroke("#344E41");
  if (running) {
    let newg = gen();
    for (i=1; i<(w/scale)-1; i+=1) {
      for (j=1; j<(h/scale)-1; j+=1) {
        let alive = grid[i][j];
        let n = neighbors(i,j);
        if (alive==1) {
          if (n<2) {
            newg[i][j] = 0;
          } else if (n>3) {
            newg[i][j] = 0;
          } else if (n==2 || n==3) {
            newg[i][j] = 1;
          }
        } else {
          if (n==3) {
            newg[i][j] = 1;
          }
        }
      }
    }
    grid = newg;
  }
  for (i=0; i<(w/scale); i++) {
    for (j=0; j<(h/scale); j++) {
      let alive = grid[i][j];
      if (alive==1) {
        rect(i*scale, j*scale, scale, scale);
      }
    }
  }
}

function gen() {
  let g = [];
  for (i=0; i<(w/scale); i+=1) {
    var row = [];
    for (j=0; j<(h/scale); j+=1) {
      row.push(0);
    }
    g.push(row);
  }
  return g;
}

function neighbors(i,j) {
  var n = 0;
  if (grid[i+1][j  ] == 1) {n+=1}
  if (grid[i+1][j+1] == 1) {n+=1}
  if (grid[i+1][j-1] == 1) {n+=1}
  if (grid[i-1][j  ] == 1) {n+=1}
  if (grid[i-1][j-1] == 1) {n+=1}
  if (grid[i-1][j+1] == 1) {n+=1}
  if (grid[i  ][j+1] == 1) {n+=1}
  if (grid[i  ][j-1] == 1) {n+=1}
  return n;
}

function mousedown(e) {
  active = true;
  grid[Number((e.clientX/scale).toFixed(0))][Number((e.clientY/scale).toFixed(0))] = 1;
}

function mouseup(e) {
  active = false;
}

function mousemove(e) {
  if (active) {
    grid[Number((e.clientX/scale).toFixed(0))][Number((e.clientY/scale).toFixed(0))] = 1;
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
