(function() {

  const div = document.getElementById("arc-maze")

  const getRandom = max => Math.floor(Math.random() * max)

  const getClass = () => {
    return {
      0: 'left',
      1: 'down',
      2: 'right',
      3: 'up'
    }[getRandom(8)]
  }

  let side = 24;

  let todo = side * side;
  while(todo--) {
    let item = document.createElement("div")
    div.appendChild(item)
  }

  //animate
  const update = () => {
    let x2 = getRandom(side * side)
    // let y2 = getRandom(23)
    // let a = x2 - 11.5;
    // let b = y2 - 11.5;
    // let d = Math.sqrt((a * a) + (b * b))
    // div.childNodes[(x2 + y2 * 24)].className = d < 11 ? getClass() : ''
    div.childNodes[x2].className = getClass()
    requestAnimationFrame(update);
  }

  update();

})()