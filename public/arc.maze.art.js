(function() {

  const div = document.getElementById("arc-maze")

  const getRandom = max => Math.floor(Math.random() * max)

  const getClass = () => {
    return {
      0: 'left',
      1: 'down',
      2: 'right',
      3: 'up',
      4: 'left right',
      5: 'up down',
      6: 'left down',
      7: 'up right',
      8: 'up left down right',
      9: 'accent'
    }[getRandom(12)]
  }

  let side = 16;

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