(function() {

  const div = document.getElementById("encoder")
  const cursor = document.createElement("div")
  cursor.className = "cursor"
  div.appendChild(cursor)
  
  const getRandom = max => Math.floor(Math.random() * max)

  //animate
  const update = () => {
    const h = div.offsetHeight
    const o = getRandom(h * 0.6) + h * 0.2
    cursor.style.top = o
    
    setTimeout(update, 2000);
  }

  update();

})()