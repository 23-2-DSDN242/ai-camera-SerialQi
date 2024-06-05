let sourceImg = null;
let maskImg = null;
let renderCounter = 0;
let curLayer = 0; 
// change these three lines as appropriate
let sourceFile = "input_3.jpg";
let maskFile = "mask_3.png";
let outputFile = "output_3.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup() {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  //background(0,0,0);
  background(148, 86, 53);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  
}

function drawSheep(x, y) {
  // Sheep body
  noStroke();
  fill(255);
  ellipse(x + 0, y + 0, 150, 100)
  circle(x + 0, y - 60, 50)
  ellipse(x - 40, y - 60, 50, 40)
  ellipse(x - 60, y - 40, 50, 40)
  ellipse(x - 80, y + 0, 80, 70)
  ellipse(x - 60, y + 40, 60, 40)
  ellipse(x + 0, y + 45, 70, 50)
  ellipse(x + 50, y + 20, 70, 50)
  ellipse(x + 60, y - 10, 70, 60)
  ellipse(x + 30, y - 40, 70, 60)

  // Sheep face 
  fill(0)
  ellipse(x - 40, y - 20, 65, 50)

  // Sheep ears 
  push()
  translate(x - 60, y - 40)
  rotate(radians(160))
  ellipse(0, 0, 30, 15)
  pop()

  push() 
  translate(x - 20, y - 40)
  rotate(radians(-170))
  ellipse(0, 0, 30, 15)
  pop()

  // Sheep legs
  push()
  translate(x - 70, y + 60) 
  rotate(radians(150))
  ellipse(0, 0, 30, 17)
  pop()

  push() 
  translate(x + 50, y + 45)
  rotate(radians(-120))
  ellipse(0, 0, 30, 15)
  pop()

  // Sheep eyes
  fill(255);
  circle(x - 50, y - 30, 20)
  circle(x - 20, y - 30, 20)
  fill(0)
  circle(x - 50, y - 25, 10)
  circle(x - 20, y - 25, 10)
}

function draw () {
  if (curLayer == 0) {
    ////// draw sheeps
  let sheepvertical = 5
  let sheephorizontal = 6
  let xspacing = width/ (sheephorizontal +1)
  let yspacing = width/ (sheepvertical +1)

  for (let vertical=0; vertical< sheepvertical;  vertical++){
  for(let horizontal=0; horizontal< sheephorizontal; horizontal++ ){
    let x = xspacing* (horizontal+1)
    let y = yspacing* (vertical+1)
    drawSheep(x,y)
  }
  }
  renderCounter += 1
  /////// gray image first layer 
 let num_lines_to_draw = 10
   for (let j = renderCounter; j < renderCounter + num_lines_to_draw && j < 1080; j++) {
   for (let i = 0; i < 1920; i++) {
    colorMode(RGB)
    let pix = sourceImg.get(i, j)
    let col = color(pix)
    let gray = (red(col) + green(col) + blue(col)) / 3 
    let grayColor = color(gray, gray, gray)
    set(i, j, grayColor)
  }
}
    renderCounter += num_lines_to_draw
    updatePixels();

    if(renderCounter >= 1080){
      curLayer = 1
      renderCounter = 0
    }

    /// second layer 
  } else if(curLayer == 1){
    rectMode(CORNERS)
    for(let i=0; i<100; i++) {
      let x1 = random(0, width)
      let y1 = random(0, height)
      let x2 = x1 + random(-10, 10)
      let y2 = y1 + random(-10, 10)
      colorMode(RGB)
      let pix = sourceImg.get(x1, y1)
      let mask = maskImg.get(x1, y1)
      let col = color(pix)
      stroke(col)
      fill(col)
      if(mask[1] < 128) {
        rect(x1, y1, x2, y2+20) //rectangle 
      }
      else {
        let pointSize2 = 12
        ellipse(x1, y1, pointSize2, pointSize2) //circle 
      }
    }
    renderCounter = renderCounter + 1
  }
  if(curLayer == 0 && renderCounter > 1080) {
    curLayer = 1
    renderCounter = 0
  }
  else if(curLayer == 1 && renderCounter > 500) {
    console.log("Done!")
    noLoop()
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}

