///--- Petal generation ---///

function dyePetal(h){
  //=- Draw spots "mini petals" on a big petal -=//
  // Use interpolated colors, and assign random
  // locations to the spots. Furthermore, create each
  // spot with random shape (random points bound by cubic curves)
  
  // Defining my variables
  let length; // Radii of the spots
  let sides = 5; // Amount of sides of the spots
  
  let splash_color; // Bilinearly interpolated color of the spots
  
  let strength; // Iterations of applying spots
  let nx = spots_count_slider.value() // Amount of spots per petal on x axis
  let ny = spots_count_slider.value() // Amount of spots per petal on y axis
  
  shades_mask.clear()
  
  ///--- Apply the spots ---///
  
  // Loop on each x and y coordinate of the grid, draw nx*ny spots on the petal
  for (let x=h/nx;x<=2*h;x+=2*h/nx){
  for (let y=h/(2*nx);y<=h;y+=h/ny){
      
  // Get bilinear interpolation, and shuffle the corner colors if the box is checked
  splash_color = shuffle_checkbox.checked() ? bilinearInterpolation(...rotateMatrix(x,y,h,0,2*h,h/2 ),colors[int(random(0,4))],colors[int(random(0,4))],colors[int(random(0,4))],colors[int(random(0,4))]) : bilinearInterpolation(...rotateMatrix(x,y,h,0,2*h,h/2 ),...colors)
  shades_mask.fill(splash_color)
    
  // Determine the strength of the specific spot 
  strength = int(random(0,strength_slider.value()))
  
  
  
  
  // Create a spot, "strength" times on the location
  for (let d=0;d<=strength;d+=1){
  
  // Begin the shape determination of a single spot
  shades_mask.beginShape();
    
  for (let s=0;s<=sides;s+=1){
    
  length = random(h*nx/30,h*nx/15); // random length
  
  // Basically determines a polygon, with slight random variations on the angle or the length
  shades_mask.curveVertex(x+length*random(-0.1,0.1)+length*cos(2*s*PI/sides),
                          y+length*random(-0.1,0.1)+length*sin(2*s*PI/sides));
  }
  
  // End the shape 
  shades_mask.curveVertex(x+length*random(-0.1,0.1)+length*cos(2*0*PI/sides),
                          y+length*random(-0.1,0.1)+length*sin(2*0*PI/sides));
  
  shades_mask.endShape()
  }
    
  
  }}
}

function sculptPetal(h){
  //=- Create the shape of a petal -=//
  
  // Get a random width for the petal
  var w = random(0.55,0.65)*h;
  
  // Prepare the mask
  petal_mask.clear()
  petal_mask.fill(255,0,0,255)
  
  petal_mask.beginShape()
  
  // Very bottom of the petal
  petal_mask.curveVertex(h,h)
  petal_mask.curveVertex(h,h)
  
  // Right side fluctuations
  petal_mask.curveVertex(h+w*random(0.3,0.7),h-h*random(0,0.1))
  petal_mask.curveVertex(h+w*random(0.5,0.9),h-h*random(0.5,0.7))
  
  // Top right corner
  petal_mask.curveVertex(h+w,h*0.2)
  
  // Center fluctuations
  petal_mask.curveVertex(h+w*random(0.5,1),h-h*random(0.85,1))
  petal_mask.curveVertex(h+w*random(-0.4,0.4),h-h*random(0.7,0.9))
  petal_mask.curveVertex(h-w*random(0.5,1),h-h*random(0.85,1))
  
  // Top left corner
  petal_mask.curveVertex(h-w,h*0.2)
  
  // Left side fluctuations
  petal_mask.curveVertex(h-w*random(0.5,0.9),h-h*random(0.5,0.7))
  petal_mask.curveVertex(h-w*random(0.3,0.7),h-h*random(0,0.1))
  
  // Back to very bottom
  petal_mask.vertex(h,h)
  petal_mask.vertex(h,h)
  petal_mask.endShape()
  

}
 
function bloomPetal(h){
    // Crop into the shades mask, based on petal_mask
    // And get an image from it 
    
    // Extract an image from the shades canva
    petal_image =  shades_mask.get(0,0,h*2,h*1.5)
    // Extract an image from the shape canva
    shape_image = petal_mask.get(0,0,h*2,h*1.5 )
    // Crop
    petal_image.mask(shape_image)
    return petal_image
}

///--- Decor generation ---///

function factory(x,y,w){
  //=- Draw the flue-gas stack -=//
  
  fill(red(colors[0]),green(colors[0]),blue(colors[0]),20)
  noStroke()
  
  // Main shape, a trapeze
  quad(
    x-w,y,
    x-1.5*w,screen_height,
    x+1.5*w,screen_height,
    x+w,y
  )
  
  // 3D effect on the very top
  arc(x,y,2*w,w,PI,0)
}

function pipe(x,y,w,state){
  //=- Draw several pipes -=//
  
  fill(red(colors[0]),green(colors[0]),blue(colors[0]),20)
  noStroke()
  
  // Draw the pipe itself
  rect(
    x-w,y,
    2*w,screen_height-y
  )
  
  // Draw the pipe head
  rect(
    x-w*1.3,y-0.55*w,
    2*w*1.3,0.55*w,
    5,5,5,5
  )
  
  // For pipes 0 to 1, draw a male union
  if (state <2){
      rect(
      x-w*1.3,y+1/3*(screen_height-y),
      2*w*1.3,0.74*w,
      5,5,5,5
      )
  }
  
  // For pipes 0 and 2 draw an other male union
  if (state!=1){
      rect(
      x-w*1.3,y+2/3*(screen_height-y),
      2*w*1.3,0.55*w
      )
  }
  
  // For pipes 2, draw a manometer
  if (state==2){
      // Piece of metal to join manometer to the pipe
      rect(
      x-2*w,y+1/3*(screen_height-y),
      w,w
      )
      
      // Draw inner circle of the manometer
      circle(x-2.5*w,y+1/3*(screen_height-y)+w/2,w*2)
      // Draw outer circle of the manometer
      circle(x-2.5*w,y+1/3*(screen_height-y)+w/2,w*1.5)
  
      // An other male union
      rect(
      x-w*1.3,y+1/7*(screen_height-y),
      2*w*1.3,0.55*w)
      }
}

function faucetted_pipe(x,y,w,angle){
  fill(red(colors[0]),green(colors[0]),blue(colors[0]),20)
  noStroke()
  
  // Main part of the pipe
  rect(
    x-w,y,
    2*w,-y
  )
  
  // Pipe head
  rect(
    x-w*1.3,y,
    2*w*1.3,0.55*w,
    5,5,5,5
  )
  
  // Pipe male unions
  rect(
    x-w*1.3,y/5,
    2*w*1.3,0.55*w,
    5,5,5,5
  )
  rect(
    x-w*1.3,y/15,
    2*w*1.3,0.55*w,
    5,5,5,5
  )
  
  //=- Draw the rotating valve -=// 
  stroke(red(colors[0]),green(colors[0]),blue(colors[0]),20)
  strokeWeight(w*0.4);
  noFill()
  
  // Set the diameter of the valve to three time the width of the pipe
  var d = w*3;
  
  ellipse(x, y*0.58,d,d );
  
  // Draw the cross axis, rotating in respect of time
  line(x+cos(angle)*d/2,y*0.58+sin(angle)*d/2,
       x+cos(angle+PI)*d/2,y*0.58+sin(angle+PI)*d/2)
  line(x+cos(angle+PI/2)*d/2,y*0.58+sin(angle+PI/2)*d/2,
       x+cos(angle+3*PI/2)*d/2,y*0.58+sin(angle+3*PI/2)*d/2)
}

function brocken_pipe(x,y,w){
  fill(red(colors[0]),green(colors[0]),blue(colors[0]),20)
  noStroke()
  
  // Vertical main part
  rect(
    x-w,y+2*w,
    2*w,screen_height-y
  )
  
  // 90° elbow
  arc(x-w,y+2*w,w*4,w*4,-PI/2,0)
  

  // Horizontal main part
  rect(
    x-w*4,y,
    3*w,2*w
  )
  
  // First and little vertical male union
  rect(
    x-w*1.3,y+1/3*(screen_height-y),
    2*w*1.3,0.74*w,
    5,5,5,5
  )
  // Middle and huge vertical male union
  rect(
    x-w*1.5,y+1/2*(screen_height-y),
    2*w*1.5,2*w,
    5,5,5,5
  )
  // Last and little vertical male union
  rect(
    x-w*1.3,y+6/7*(screen_height-y),
    2*w*1.3,0.74*w,
    5,5,5,5
  )
  
  // Horizontal pipe head
  rect(x-w*4.55,y-0.3*w,
       w*0.55,2.6*w,
       5,5,5,5
      )
  
  // Horizontals pipe male unions
  rect(x-w*3.55,y-0.3*w,
       w*0.55,2.6*w

      )
  rect(x-w*2.55,y-0.3*w,
       w*0.55,2.6*w

      )
}

///--- Classes ---///

class Cloud{
  constructor(x,y){
    // Current position of the cloud
    this.x = x;
    this.y = y;
    // Spawning position of the cloud
    this.initial_x = x;
    this.initial_y = y;
    // Size of the cloud
    this.scaling = 0;
    
    // Relative to the shape
    this.sides = 5;
    this.lengths = [];
    for(let s=0;s<this.sides;s++){
      this.lengths.push(random(20,80));
    }
  }
  
  update(){
    // Make the cloud bigger
    this.scaling += 0.01;
    
    // Make it go up
    this.y -= 1
    // Jiggle wiggle 
    this.x = this.initial_x + screen_width*0.01*cos(time*0.3)
    
    // Catch it if it is too high 
    if (this.y < 0){
      this.x = this.initial_x;
      this.y = this.initial_y;
      this.scaling = 0;
    }
  }
  
  draw(){
    // Set its color as the common one 
    noStroke()
    fill(red(colors[0]),green(colors[0]),blue(colors[0]),max(0,20-this.scaling*10))
    
    // Create its shape
    beginShape()
    
    // Anchor point
    curveVertex(this.x+this.scaling*this.lengths[0]*cos(2*0*PI/this.sides),
                this.y+this.scaling*this.lengths[0]*sin(2*0*PI/this.sides));
    
    // Polygon slightly randomised, curved by the cubic curves
    for (let s=0;s<this.sides;s++){
    curveVertex(this.x+this.scaling*this.lengths[s]*cos(2*s*PI/this.sides),
                this.y+this.scaling*this.lengths[s]*sin(2*s*PI/this.sides));
    }
    
    // Anchor point
    curveVertex(this.x+this.scaling*this.lengths[this.sides-1]*cos(2*(this.sides-1)*PI/this.sides),
                this.y+this.scaling*this.lengths[this.sides-1]*sin(2*(this.sides-1)*PI/this.sides));

    endShape()  
  }
}

class Petal{
  constructor(h){
    // Height of the petal
    this.h = h;
    // Orientation of the petal
    this.offset = random(-PI/20,PI/25)
    // Generate itself
    this.update()
   
  }
  update(){
    // Define the shape
    sculptPetal(this.h)
    // Apply the colors
    dyePetal(this.h)
    // Get the image
    this.raw_image = bloomPetal(this.h)
  }
}

class Flower{
  constructor(x,y,p_count){
    // Position of the flower
    this.x = x 
    this.y = y
    // Openness of the flower
    this.blossomness = 4
    // Spreadness of the flower
    this.excentricity = 35
    
    this.angle_offset = random(0,2*PI)
    this.petals_count = p_count;
    this.size_range = [0.1714*screen_width,0.2*screen_width];
    
    this.createContext()
  }
  flourish(){
    // Create the petals 
    this.petals = [];
    // Append a newly born petal to the list
    for (let i=0;i<this.petals_count;i+=1){
      this.petals.push(new Petal(random(...this.size_range)))
    }
  }
  stemish(){
    // Generate random parameters for the stems
    let stemish_list = [];
    for (let i=0;i<this.stems_count;i++){
      stemish_list.push(
      [random(0.5,0.8), // first node speed
       random(0.5,0.8), // second node speed 
       random(0,2*PI), // first node time offset 
       random(0,2*PI), // second node time offset
       random(50,150), // first node y offset
       random(50,100), // second node y offset 
       random(-40,40), // first node x offset 
       random(-40,40)  //second node x offset
      ])
    }
    return stemish_list
  }
  createContext(){

    
    this.clouds_top_eye = [
                  new Cloud(screen_width*0.80,screen_height*0.6),
                  new Cloud(screen_width*0.25,screen_height*0.75),
                  new Cloud(screen_width*0.90,screen_height*0.85)]
    
    this.cloud_side_eye = new Cloud(screen_width*0.85,screen_height*0.6)
    
    this.stems_count = 7;
    this.stems = this.stemish()
    this.dead_stems = [this.stemish(),this.stemish()]
    this.dead_stems_utility = [[screen_width*0.24,screen_height*0.82,screen_height*0.12,0],
                              [screen_width*0.75,screen_height*0.75,0,screen_height*0.12]]
    
  }
  drawPetals(){
    // Draw the petals from the top view
    imageMode(CENTER)
    let angle;
    for (let i=0;i<this.petals_count;i+=1){
        // Get the angle of the petal, trust me
        angle = i*2*PI/this.petals_count+this.petals[i].offset+this.angle_offset+time/20;
        push()
        // Move the canva
        translate(this.x+0.075*screen_width*cos(angle),this.y+0.075*screen_width*sin(angle))//60
        rotate(angle+PI/2)
        // Blit the image of the petal at the right location
        image(this.petals[i].raw_image, 0,0 );
        pop()
    }
  }
  drawPistils(){
    // Draw the petals from the side view
    imageMode(CENTER)
    let angle;
     for (let i=0;i<this.petals_count;i+=1){
        // Get the orientation of the petal, with respect to blossomness
        angle = PI/(this.blossomness*(1+0.1*cos(time*0.2))) + i*(PI-2*PI/(this.blossomness*(1+0.1*cos(time*0.2))))/this.petals_count+PI;
        push()
        // Move the canva
        translate(this.x+0.001*this.excentricity*screen_width*cos(angle),
                  this.y+0.001*this.excentricity*screen_width*sin(angle))
        rotate(angle+PI/2)
        // Blit the image of the petal at the right location
        image(this.petals[i].raw_image, 0,0 );
        pop()
    }
  
  }
  drawStem(){
    // Set the color as the color of the petal
    stroke(red(colors[0]),green(colors[0]),blue(colors[0]),10)
    strokeWeight(7)
    noFill()
    
    // Draw severals cords
    for (let i=0;i<this.stems_count;i+=1){
    beginShape()
    // Adjut the y position so the anchor point of the stem is well placed
    curveVertex(this.x,this.y-this.excentricity*0.001*screen_width+0.05*screen_width)
    curveVertex(this.x,this.y-this.excentricity*0.001*screen_width+0.05*screen_width)
    // Moving points, see above for explainations
    curveVertex(this.x+this.stems[i][6]*cos(time*this.stems[i][0]+this.stems[i][2]),
                this.y+this.stems[i][4])
    curveVertex(this.x+this.stems[i][7]*cos(time*this.stems[i][1]+this.stems[i][3]),
                this.y+this.stems[i][4]+this.stems[i][5])
    // Second anchor point, on the floor (a little bit below)
    curveVertex(this.x,1.05*screen_height)
    curveVertex(this.x,1.05*screen_height)
    endShape()
    }
  }
  drawDeadStems(){
    stroke(red(colors[0]),green(colors[0]),blue(colors[0]),10)
    strokeWeight(7)
    noFill()
    
    // Draw  severals cords
    for (let j=0;j<2;j++){
    for (let i=0;i<this.stems_count;i+=1){
    beginShape()
    // Adjut the y position so the anchor point of the stem is well placed
    curveVertex(this.dead_stems_utility[j][0]+this.dead_stems_utility[j][2]*cos(time*0.3),
                this.dead_stems_utility[j][1]+this.dead_stems_utility[j][3]*sin(time*0.3))
    curveVertex(this.dead_stems_utility[j][0]+this.dead_stems_utility[j][2]*cos(time*0.3),
                this.dead_stems_utility[j][1]+this.dead_stems_utility[j][3]*sin(time*0.3))
    // Moving points, see above for explainations
    curveVertex(this.dead_stems_utility[j][0]+this.dead_stems[j][i][6]*cos(time*this.dead_stems[j][i][0]+this.dead_stems[j][i][2]),
                this.y+1.4*this.dead_stems[j][i][4])
    curveVertex(this.dead_stems_utility[j][0]+this.dead_stems[j][i][7]*cos(time*this.dead_stems[j][i][1]+this.dead_stems[j][i][3]),
                this.y+1.4*(this.dead_stems[j][i][4]+this.dead_stems[j][i][5]))
    // Second anchor point, on the floor (a little bit below)
    curveVertex(this.dead_stems_utility[j][0],1.05*screen_height)
    curveVertex(this.dead_stems_utility[j][0],1.05*screen_height)
    endShape()
    }}
  }
  drawTopViewContext(){
    // Draw and update the clouds 
    for (const cloud_object of this.clouds_top_eye){
      cloud_object.update()
      cloud_object.draw()
    }
    
    // Draw all sorts of pipes
    pipe(screen_width*0.80,
         screen_height*(0.6+0.05*sin(1.527+time*0.2)),
         screen_width*0.02,
         2)
    pipe(screen_width*0.25,
         screen_height*(0.75+0.03*sin(0.57+time*0.1)),
         screen_width*0.02,
         0)
    pipe(screen_width*0.90,
         screen_height*(0.85+0.03*sin(0.57+time*0.1)),
         screen_width*0.02,
         0)
    
    brocken_pipe(screen_width*0.11,
                 screen_height*0.7,
                 screen_width*0.02);
    }
  drawSideViewContext(){
    // Draw and update the single cloud from the flue-gas stack
    this.cloud_side_eye.update()
    this.cloud_side_eye.draw()
    
    // Draw the flue-gas stack itself
    factory(screen_width*0.85,screen_height*0.6,screen_width*0.02)
    
    // Draw all sorts of pipes
    pipe(screen_width*0.95,
         screen_height*(0.8+0.03*sin(0.57+time*0.1)),
         screen_width*0.02,
         0)
    pipe(screen_width*0.64,
         screen_height*(0.9+0.02*cos(0.124+time*0.2)),
         screen_width*0.03,
         1)
    pipe(screen_width*0.40,
         screen_height*(0.8+0.03*sin(1.527+time*0.2)),
         screen_width*0.02,
         2)
    
    faucetted_pipe(screen_width*0.78,
                   screen_height*(0.3+0.02*cos(0.1+time*0.2)),
                   screen_width*0.025,
                   cos(time*0.2))
    
    brocken_pipe(screen_width*0.11,
                 screen_height*0.7,
                 screen_width*0.02);
    
    // Draw the dancing stems
    this.drawDeadStems()
  }
  draw(type){
    if (type){
      this.drawTopViewContext()
      this.drawPetals()
    }
    else {
      this.drawSideViewContext()
      this.drawStem()
      this.drawPistils()
    }
  }
  resetAngle(){
    this.angle_offset = 0
  }
}