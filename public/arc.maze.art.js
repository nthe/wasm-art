(function() {

  const div = document.getElementById("arc-maze")

  const getClass = () => {
    return {
      0: 'left',
      1: 'down',
      2: 'right',
      3: 'up'
    }[Math.floor(Math.random() * 4)]
  }

  let todo = 16 * 16;
  while(todo--) {
    let item = document.createElement("div")
    item.className = getClass()
    div.appendChild(item)
  }

  //animate
  const update = () => {
    
    div.childNodes.forEach(node => {
      node.className = getClass()
    })

    setTimeout(update, 2000);
  }

  update();

})()