///--- Create the UX elements ---///

function createColorPickers(){
  //-  Create all the color pickers required -//
  
  // Left color
  color_picker_1 = createColorPicker(colors[0]);
  color_picker_1.position(0.012345*screen_width, 0.195*screen_width);
  color_picker_1.input(updateShades)
  
  // Top color
  color_picker_2 = createColorPicker(colors[1]);
  color_picker_2.position(0.012345*screen_width, (0.195+0.035)*screen_width);
  color_picker_2.input(updateShades)
  
  // Bottom color
  color_picker_3 = createColorPicker(colors[2]);
  color_picker_3.position(0.012345*screen_width, (0.195+0.035*2)*screen_width);
  color_picker_3.input(updateShades)
  
  // Right color
  color_picker_4 = createColorPicker(colors[3]);
  color_picker_4.position(0.012345*screen_width, (0.195+0.035*3)*screen_width);
  color_picker_4.input(updateShades)
  
  // Background color
  color_picker_bg = createColorPicker(color(16,15,21));
  color_picker_bg.position(0.012345*screen_width, (0.195+0.035*4)*screen_width);
  color_picker_bg.input(updateBackgroundColor)

}

function createSliders(){
  //-- Create the sliders --//
  
  // Slider for spoticity of the petal 
  spots_count_slider = createSlider(1, 10 , default_spots_count,1);
  spots_count_slider.position(0.012345*screen_width, (0.012345)*screen_width);
  spots_count_slider.size(0.11*screen_width);
  spots_count_slider.input(updateWholeFlower)
  
  // Slider for the minimum opacity 
  minop_slider = createSlider(0, 50 , default_minimum_opacity,1);
  minop_slider.position(0.012345*screen_width,(0.012345+0.0246)*screen_width);
  minop_slider.size(0.11*screen_width);
  minop_slider.input(update)
  
  // Slider for the maximum opacity 
  maxop_slider = createSlider(0, 50 , default_maximum_opacity,1);
  maxop_slider.position(0.012345*screen_width, (0.012345+2*0.0246)*screen_width);
  maxop_slider.size(0.11*screen_width);
  maxop_slider.input(update)
  
  // Slider for the amount of petals 
  petals_count_slider = createSlider(1, 15 , default_petals_count,1);
  petals_count_slider.position(0.012345*screen_width, (0.012345+3*0.0246)*screen_width);
  petals_count_slider.size(0.11*screen_width);
  petals_count_slider.input(updateWholeFlower)
  
  // Slider for the blossomness 
  blossomness_slider = createSlider(2, 5 ,4,0.01);
  blossomness_slider.position(screen_width-0.012345*screen_width-0.11*screen_width, 0.012345*screen_width);
  blossomness_slider.size(0.11*screen_width);
  blossomness_slider.input(updateTopEye)


  // Slider for the excentricity 
  excentricity_slider = createSlider(35, 90 , 35, 0.5);
  excentricity_slider.position(screen_width-0.012345*screen_width-0.11*screen_width, (0.012345+0.0246)*screen_width);
  excentricity_slider.size(0.11*screen_width);
  excentricity_slider.input(updateTopEye)

  
  // Slider for the  strength
  strength_slider = createSlider(1, 13 , 1,1);
  strength_slider.position(0.012345*screen_width, 500);
  strength_slider.size(0.11*screen_width);
  strength_slider.input(update)
  strength_slider.hide()
  
}

function createCheckBoxes(){
  // Turn on or off the colors shuffling of the petal
  shuffle_checkbox = createCheckbox('', false);
  shuffle_checkbox.position(0.0185175*screen_width, 0.12345*screen_width);
  
  // Petalistic checkbox, change pov 
  eye_checkbox = createCheckbox('',false)
  eye_checkbox.position(0.0185175*screen_width, 0.16*screen_width);
  eye_checkbox.input(switchGUI)
}

function setUpColorsFonts(){
  background_color = color(16,15,21)
  text_color = color(255-red(background_color),255-green(background_color),255-blue(background_color))
  colors = [color(185,217,229),color(185,217,229),color(185,217,229), color(21,26,58)];
  
  
  textFont('Bahnschrift');
}

function setUpUx(){
  setUpColorsFonts()
  createCheckBoxes()
  createSliders()
  createColorPickers()
}  


///--- Functions for the sliders inputs ---///

function switchGUI(){
  // Set blossomness and excentricity sliders to hidden 
  // If the view is from top (eye_checkbox is true)
  // Because those sliders aren't used
  
  if (eye_checkbox.checked()){
    blossomness_slider.hide();
    excentricity_slider.hide()
  }
  else{
    blossomness_slider.show();
    excentricity_slider.show()
  }
}

function updateShades(){
  // Update each color selection
  colors[0] = color_picker_1.color()
  colors[1] = color_picker_2.color()
  colors[2] = color_picker_3.color()
  colors[3] = color_picker_4.color()

}

function updateWholeFlower(){
  // Assign the new petals count, 
  // and regenerate the petals.
  hyacinthisie.petals_count = petals_count_slider.value()
  hyacinthisie.flourish()
}

function updateBackgroundColor(){
  // Change the background color to the slider's one
  background_color = color_picker_bg.color()
  
  // If the background color is too light, change the font color 
  // And vice-versa
  var mean = (red(background_color)+green(background_color)+blue(background_color))/3
  text_color = mean<127 ? color(255):color(0)

}

function updateTopEye(){
  // Update the two top right sliders
  hyacinthisie.blossomness = blossomness_slider.value()
  hyacinthisie.excentricity = excentricity_slider.value()
}

///--- Carrying events ---///

function keyPressed() {
  // If any key is pressed, recreate the petals
  
  for (let i=0;i<hyacinthisie.petals_count;i+=1){
    hyacinthisie.petals[i].update()
  }
  hyacinthisie.resetAngle()
}

function mousePressed(){
  // If any mouse button is clicked, recreate the petals
  for (let i=0;i<hyacinthisie.petals_count;i+=1){
    hyacinthisie.petals[i].update()
  }
  hyacinthisie.resetAngle()
}

///--- Draw the UX elements ---///

function displayTexts(){
    // Set font values as expected ones
    noStroke()
    fill(text_color)
    textSize(int(0.019*screen_width))
  
    // Sliders and checkboxes texts 
    text("Petalness : "+str(spots_count_slider.value()),spots_count_slider.x+1.2*spots_count_slider.width,spots_count_slider.y+0.9*spots_count_slider.height)
    text("Minimum opacity : "+str(minop_slider.value()),minop_slider.x+1.2*minop_slider.width,minop_slider.y+0.9*minop_slider.height)
    text("Maximum opacity : "+str(maxop_slider.value()),maxop_slider.x+1.2*maxop_slider.width,maxop_slider.y+0.9*maxop_slider.height)
    text("Petals count : "+str(petals_count_slider.value()),petals_count_slider.x+1.2*petals_count_slider.width,petals_count_slider.y+0.9*petals_count_slider.height)
    text("Shuffle colors",3*0.0185175*screen_width,1.15*0.12345*screen_width)
    text("Petalistic",3*0.0185175*screen_width,1.1*0.16*screen_width)
    
    // Draw me 
    displaySignature()
}

function displaySignature(){
    fill(red(colors[0]),green(colors[0]),blue(colors[0]),40)
    textSize(screen_width/45)
  
    // Forced to push, cause i'll rotate
    push() 
    translate(screen_width*0.01, screen_height*0.84);
    rotate(PI/2);
    text("HAMON", 0, 0);
    text("EWANN", 0,-20);
    pop()

}