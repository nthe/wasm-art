#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

// Number of circles
#define NUM_CIRCLES 400

// Circle Struct
struct Circle {
  int x;  // x coordinate
  int y;  // y coordinate
  int r;  // circle radius
  int cr; // color - RED
  int cg; // color - GREEN
  int cb; // color - BLUE
};

// Animation Struct
struct Animation {
  int x;  // x coordinate
  int y;  // y coordinate
  int r;  // circle radius
  int xv; // x-axis velocity
  int yv; // y-axis velocity
  int xd; // x-axis direction
  int yd; // y-axis direction
};

// Degined circles array variable
struct Circle circles[NUM_CIRCLES];
struct Animation animations[NUM_CIRCLES];

// Random number generator
int getRand(max) {
  return (rand() % max);
}

// Init circle data and start render - JS
int main() {

  // Seed random number generator
  srand(time(NULL));

  // Create circles
  for (int i = 0; i < NUM_CIRCLES; i++) {
    // Radius
    int r = getRand(20);

    // Coordinates
    int x = getRand(2000) - r;
    int y = getRand(2000) - r;

    // Animation
    animations[i].x = x;
    animations[i].y = y;
    animations[i].r = r;
    animations[i].xv = getRand(2);
    animations[i].yv = getRand(2);
    animations[i].xd = getRand(2);
    animations[i].yd = getRand(2);
    
    // Assign to array
    circles[i].x = x;
    circles[i].y = y;
    circles[i].r = r;

    // Color
    int c = getRand(150);
    circles[i].cr = getRand(100) + 150;
    circles[i].cg = c; //getRand(250);
    circles[i].cb = c; //getRand(250);

  }

  // Start JS rendering
  // emscripten_run_script("render()");
  EM_ASM({ render($0); }, NUM_CIRCLES * 6);
  return 1;
}


struct Circle * getCircles(int canvasWidth, int canvasHeight) {

  // Update circle data
  for(int i = 0; i < NUM_CIRCLES; i++) {
    
    // Collision detection
    if (animations[i].x + animations[i].r >= canvasWidth) animations[i].xd = 0;
    if (animations[i].x - animations[i].r <= 0) animations[i].xd = 1;
    if (animations[i].y + animations[i].r >= canvasHeight) animations[i].yd = 0;
    if (animations[i].y - animations[i].r <= 0) animations[i].yd = 1;

    // Movement
    if (animations[i].xd == 1) {
      animations[i].x += animations[i].xv;
    } else {
      animations[i].x -= animations[i].xv;
    }

    if (animations[i].yd == 1) {
      animations[i].y += animations[i].yv;
    } else {
      animations[i].y -= animations[i].yv;
    }

    circles[i].x = animations[i].x;
    circles[i].y = animations[i].y;
  }

  return circles;
}


// Compilation command
//
// $ emcc lib/wasm.lib.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_main', '_getCircles']" -o public/wasm.lib.js
//