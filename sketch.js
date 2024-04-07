// Define my constants
const screen_width = 950
const screen_height = screen_width*9/16
const default_minimum_opacity = 0;
const default_maximum_opacity = 3;
const default_petals_count = 7; 
const default_spots_count = 10;

// Declare my mains varialbes
var colors;
var shades_mask;
var petal_mask; 
var shape_image;
var petal_image;
var time=0;


function setup() {
  // Create all the canvas
  pixelDensity(1)
  createCanvas(screen_width, screen_height);
  shades_mask = createGraphics(screen_width, screen_height);
  petal_mask = createGraphics(screen_width,screen_height)
  shades_mask.noStroke();
  
  // Set up the UX elements -> sliders, fonts, colors
  setUpUx()
  
  // Create my main flower
  hyacinthisie = new Flower(screen_width/2,screen_height/2,petals_count_slider.value() );
  hyacinthisie.flourish()
}

function draw() {
  // Clear the background
  background(color_picker_bg.color());
  
  // Draw my texts
  displayTexts()
  
  // Display the flower, and its context
  hyacinthisie.draw(eye_checkbox.checked())
  
  time += 0.1;
}

function update(){
  hyacinthisie.resetAngle()
  for (let i=0;i<hyacinthisie.petals_count;i+=1){
    hyacinthisie.petals[i].update()
  }
}
