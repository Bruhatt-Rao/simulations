var num = 100, tag, len = 10, deg = 90;

function init() {
  var h = window.innerHeight;
  var w =  window.innerWidth;
  height(h, w)
  //save()
  translate(w/2, h/2)
}

function update() {
  color("#344E41")
  if (num % 2 == 0 && num != 4) {
    num = num / 2
    //save()
    rotate(deg)
    line(0, 0, 0, -len)
    //restore()
    translate(0, -len)
  } else if (num != 4) {
    num = (num * 3) + 1
    rotate(-(deg))
    line(0, 0, 0, -len)
    //restore()
    translate(0, -len)
  } else {
    //restore()
    //save()
    //translate(250,250)
    num = randint(100, 1000)
  }
  noclear()
}

loop();
