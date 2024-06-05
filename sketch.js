let sourceImg = null;
let maskImg = null;
let renderCounter = 0;
let curLayer = 0; 
// change these three lines as appropriate
let sourceFile = "input_1.jpg";
let maskFile = "mask_1.png";
let outputFile = "output_1.png";

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
  background(231, 221, 255);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  
}
function draw () {
  if (curLayer == 0) {
    /////// gray image first layer 
    let num_lines_to_draw = 10;
    for (let j = renderCounter; j < renderCounter + num_lines_to_draw && j < 1080; j++) {
      for (let i = 0; i < 1920; i++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        let col = color(pix);
        let gray = (red(col) + green(col) + blue(col)) / 3 
        let grayColor = color(gray, gray, gray);
        set(i, j, grayColor);
      }
    }
    renderCounter += num_lines_to_draw
    updatePixels();
   ///  sheep 
   drawSheep()

    if(renderCounter >= 1080){
      curLayer = 1
      renderCounter = 0
    }
    /// second layer 
  } else if(curLayer == 1){
    rectMode(CORNERS);
    for(let i=0; i<100; i++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let x2 = x1 + random(-10, 10);
      let y2 = y1 + random(-10, 10);
      colorMode(RGB);
      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);
      let col = color(pix);
      stroke(col);
      fill(col);
      if(mask[1] < 128) {
        rect(x1, y1, x2, y2+20); //rectangle 
      }
      else {
        let pointSize2 = 12
        ellipse(x1, y1, pointSize2, pointSize2); //circle 
      }
    }

    renderCounter = renderCounter + 1
 

  }
  if(curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
  }
  else if(curLayer == 1 && renderCounter > 500) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}

function drawSheep(x,y){
  // sheep body
  noStroke()
  //sheep body
   noStroke()
  fill(255)
  ellipse(200,200,150,100)
  circle(200,140,50)
  ellipse(160,140,50,40)
  ellipse(140,160,50,40)
  ellipse(120,200,80,70)
  ellipse(140,240,60,40)
  ellipse(200,245,70,50)
  ellipse(250,220,70,50)
  ellipse(260,190,70,60)
  ellipse(230,160,70,60)

//sheep face 
  fill(0)
  ellipse(160,180,65,50)

//sheep ear 
  push(); 
  translate(140, 160); 
  rotate(radians(160));
  ellipse(0, 0, 30, 15); 
  pop();

  push(); 
  translate(180, 160); 
  rotate(radians(-170)); 
  ellipse(0, 0, 30, 15); 
  pop(); 

// leg
  push(); 
  translate(130, 260); 
  rotate(radians(150));
  ellipse(0, 0, 30, 17); 
  pop();

  push(); 
  translate(250, 245); 
  rotate(radians(-120)); 
  ellipse(0, 0, 30, 15); 
  pop(); 

//eye
  fill(255)
  circle(150,170,20)
  circle(180,170,20)
  fill(0)
  circle(150,175,10)
  circle(180,175,10)
}