let cx, cy, parent, xoff, yoff, zoff;
let autorun = true;


let inc = 0.04;
let pv1 = 0;
let pv2 = 0;
let pv3 = 0;
let pv4 = 0;

function setup() {
  parent = document.getElementById("water");
  let cnv = createCanvas(parent.offsetWidth, parent.offsetHeight, P2D);
  cnv.parent(parent);
  zoff = 0.0;
  cx = width / 2;
  cy = height / 2;
  pv1 = createVector(0, 0);
  pv2 = createVector(5.2, 1.3);
  pv3 = createVector(1.7, 9.2);
  pv4 = createVector(8.3, 2.8);
}

function windowResized() {
  resizeCanvas(parent.offsetWidth, parent.offsetHeight);
}

function draw() {
  background(220);
  loadPixels();
  xoff = 0.0;
  for (let x = 0; x < width; x++) {
    yoff = 0.0;
    for (let y = 0; y < height; y++) {
      var p = createVector(xoff, yoff, zoff);
      var levels = pattern2(p, 0.25);
      var i = (x + y * width) * 4;
      pixels[i] = levels[0];
      pixels[i + 1] = levels[1];
      pixels[i + 2] = levels[2];
      pixels[i + 3] = levels[3]; 
      yoff += inc;
    }
    xoff += inc;
  }
  updatePixels();
  if (autorun) {
    zoff += 0.025;
  }
  
  noLoop();
}

function keyPressed() {
  switch (key) {
    case 'S':
    case 's':
      saveFrame();
      break;
    case 'A':
    case 'a':
      zoff += inc;
      break;
    case 'R':
    case 'r':
      autorun = !autorun;
      break;
  }
}


/**
 * Perform 2 levels of warping.
 */
function pattern2(p, distance) {
  let qx = v2n(p5.Vector.add(p, pv1));
  let qy = v2n(p5.Vector.add(p, pv2));
  
  let q = createVector(qx, qy);
  let qm = p5.Vector.mult(q, distance * 4);
  let qa = p5.Vector.add(p, qm);
  
  let rx = v2n(p5.Vector.add(qa, pv3));
  let ry = v2n(p5.Vector.add(qa, pv4));
  
  let r = createVector(rx, ry);
  let rm = p5.Vector.mult(r, distance * 24);
  let ra = p5.Vector.add(p, rm);
  
  let n = v2n(ra);
  let b = (n * n * n) * 255;
  
  let rc = r.mag() * b * 0.466;
  let bc = p.mag() * b * 0.454;
  let gc = q.mag() * b * 3.283;
  
  let c = color(rc, b * 2.754, b * 4.754);
  return c.levels;
}

/**
 * Convert vector to float.
 */
function v2n(p) {
  return noise(p.x, p.y, p.z);
}
