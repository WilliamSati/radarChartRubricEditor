//reset the canvas and draw the graph on top of it.
function drawGraph(){
  //reset the background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, c.width, c.height);
  //draw the outerCircle
  ctx.strokeStyle = "#000000";//make the lines black
  ctx.beginPath();
  ctx.arc(outerCircle.middleX, outerCircle.middleY, outerCircle.radius, outerCircle.startingAngle,outerCircle.endingAngle);
  ctx.stroke();

  //draw the dotted reference points
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.arc(outerCircle.middleX, outerCircle.middleY, outerCircle.radius/2, outerCircle.startingAngle,outerCircle.endingAngle);
  ctx.stroke();
  ctx.setLineDash([]);//revert back to simple lines


  //draw the radial lines:
  ctx.strokeStyle = "#000000";//make the lines black
  for(var i=0; i < radialLineArray.length; i++){
    ctx.beginPath();
    ctx.moveTo(radialLineArray[i].startingX,radialLineArray[i].startingY);
    ctx.lineTo(radialLineArray[i].endingX,radialLineArray[i].endingY);
    ctx.stroke();
  }
  //draw the graph graph lines
  ctx.beginPath();
  ctx.moveTo(graphPointArray[0].middleX, graphPointArray[0].middleY);
  for(var i = 1; i < graphPointArray.length; i++){
    ctx.lineTo(graphPointArray[i].middleX,graphPointArray[i].middleY);
  }
  ctx.strokeStyle = "#000000";
  ctx.closePath();
  ctx.stroke();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = '#ffb380';
  ctx.fill();
  ctx.globalAlpha = 1;


  //draw the graph Points
  for(var i = 0; i < graphPointArray.length; i++){
    var color = graphPointArray[i].fillColor;
    ctx.strokeStyle = color;//make the lines black
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(graphPointArray[i].middleX, graphPointArray[i].middleY, graphPointArray[i].radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  //draw the graph labels
  var angle = 0;
  var angleJump = 2*Math.PI/graphPointArray.length;
  var x=0;
  var y=0;
  ctx.fillStyle = '#000000';
  var fontSize = c.width/20;
  ctx.font = `${fontSize}px Arial`;
  var xOffset = 0;
  var yOffset = 0;
  for(var i=1; i<= graphPointArray.length; i++){
    xOffset = Math.cos(angle)*(outerCircle.radius+1.5*fontSize);
    yOffset = Math.sin(angle)*(outerCircle.radius+1.5*fontSize);

    x=outerCircle.middleX-c.width/30 + xOffset;
    y=outerCircle.middleY+c.width/45 + yOffset;
    ctx.fillText(`C${i}`,x,y);
    angle+=angleJump;
  }

}

function resizeCanvas(){
  var newCanvasWidth = $(window).width()/3;
  var newCanvasHeight = newCanvasWidth;
  c.width = newCanvasWidth;
  c.height= newCanvasHeight;
  c.style.marginLeft = ($(window).width()/2 - newCanvasWidth/2) - 15 + "px";
}
//this function will iterate through all of the graph objects we created
//in order to reset their size before calling the drawGraph function
function resetGraph(numCriteria){
  //size the canvas appropriately
    resizeCanvas();
  //reset the global structures
    //this variable will hold the outer circle class object. By default it starts in the middle of the canvas
    outerCircle = new circle(c.width/2,c.height/2,c.width/3);
    //this array will hold all of the radialLine objects. By default, there are 8 lines
    radialLineArray = updateRadialLineArray(radialLineArray, outerCircle, numCriteria);
    //this array will hold all of the graphPoint objects. By default, there are 8 points
    graphPointArray = resetGraphPointArray(graphPointArray, outerCircle, numCriteria);
  //now that we've crated the objects to be drawn, draw them to the canvas.
    drawGraph();
}
