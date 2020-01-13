(function() {

  const div = document.getElementById("encoder")
  
  const getRandom = max => Math.floor(Math.random() * max)

  let items = 400
  while(items--) {
    const item = document.createElement("div")
    item.className = 'item'
    item.style.left = getRandom(div.clientWidth)
    let size = getRandom(32)
    item.style.width = size
    item.style.height = size
    item.style.animationDelay = `${getRandom(3000)}ms`
    item.style.animationDuration = `${getRandom(16000) + 4000}ms`
    div.appendChild(item)
  }

})()