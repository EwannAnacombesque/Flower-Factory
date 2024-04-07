function bilinearInterpolation(x,y,col1,col2,col3,col4){
  // Apply bilinear interpolation to colors components, taking 4 colors 
  // Return the color with the opacity randomly taken in the range defined by the sliders
  var red_component = 
                      red(col1)*(1-x)*(1-y)+
                      red(col2)*x*(1-y)+
                      red(col3)*(1-x)*(y)+
                      red(col4)*x*y;
  var green_component =
                      green(col1)*(1-x)*(1-y)+
                      green(col2)*(x)*(1-y)+
                      green(col3)*(1-x)*(y)+
                      green(col4)*x*y;
  var blue_component = 
                      blue(col1)*(1-x)*(1-y)+
                      blue(col2)*x*(1-y)+
                      blue(col3)*(1-x)*(y)+
                      blue(col4)*x*y;
  
  return color(red_component,green_component,blue_component,random(minop_slider.value(),maxop_slider.value()))
}

function rotateMatrix(x,y,x0,y0,xf,yf){ 
 // this matrix applied to x and y, taking as parameters X0 and Xf,
 // Turns a rhombus / diamond into a square of coords 0,0
 dy  = yf - y0
 dx = xf-x0
 k = dy/dx 

 return [0.5*((x-x0)/dx+(y-y0)/dy),0.5*(-(x-x0)/dx+(y-y0)/dy)]
}
