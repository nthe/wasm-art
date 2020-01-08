
// Canvas context
const canvas = document.getElementById("blades")
const context = canvas.getContext("2d")

let loops = 280;

// Render circles on canvas
const render = (dataLength) => {

  // Get circles from WASM
  let cx = new Int32Array(Module.HEAP8.buffer, _getCircles(canvas.width, canvas.height), dataLength)

  // Draw painting
  for (let i = 0; i < dataLength; i += 6) {
    context.beginPath()
    context.arc(
      cx[i],
      cx[i + 1],
      cx[i + 2],
      0,
      2 * Math.PI
    )
    context.fillStyle = `rgba(${cx[i + 3]}, ${cx[i + 4]}, ${cx[i + 5]}, 0.3)`
    context.fill()
  }

  if (loops--) {
    // Animation
    requestAnimationFrame(() => render(dataLength))
  }
}

