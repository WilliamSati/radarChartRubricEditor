
//when the html page has loaded(not CSS)
document.addEventListener("DOMContentLoaded", function(){
  resetGraph(8);//load the graph with 8 criteria by default
  resetCommentSection(8);
});

helpButton.addEventListener('click',function(){
  window.location.href="https://radarchartrubriceditor-42144.firebaseapp.com/help";
});
//user presses enter in the title input  box
title_inputBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {//if the user presses enter
    event.preventDefault();
    title_submitButton.click();
  }
});

title_submitButton.addEventListener('click',function(){
  var pageTitle = document.getElementById("title");
  var input = title_inputBox.value;
  pageTitle.innerHTML = input;
});

resetButton.addEventListener('click',function(){
  resetGraph(radialLineArray.length);
  //resetCommentSection(radialLineArray.length);
});

//when the user clics enter, trigger the submit button
numberOfCriteria_inputBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {//if the user presses enter
    event.preventDefault();
    numberOfCriteria_submitButton.click();//click the submit button
  }
});
//when the user submits the number of Criteria, if the number of criteria hasn't changed,
//don't redraw the graph
numberOfCriteria_submitButton.addEventListener('click',function(){

  var input = Number(numberOfCriteria_inputBox.value);

  if(Number.isInteger(input)==false || input <= 2 || input > 50){
    alert("Try a positive integer ranging from 3 to 50");
    return;
  }else if(input === radialLineArray.length){
    alert("Your graph already has " + input + ' criteria');
    return;
  }else{//if the user changed the number of criteria, reset and draw the graph
    updateRadialLineArray(radialLineArray,outerCircle,input);
    resetGraphPointArray(graphPointArray, outerCircle, input);
    drawGraph();//reDdraw the canvas
    resetCommentSection(input);//redraw the comment section
  }
});

window.addEventListener("resize", resizeHandler);
function resizeHandler(){
  var oldRadius = outerCircle.radius;
  var oldCenterX = outerCircle.middleX;
  var oldCenterY = outerCircle.middleY;
  resizeCanvas();
  updateOuterCircle(outerCircle,c.width/2,c.height/2,c.width/3);
  updateRadialLineArray(radialLineArray,outerCircle,radialLineArray.length);
  updateGraphPointArray(graphPointArray, outerCircle, graphPointArray.length, oldRadius,oldCenterX, oldCenterY);
  drawGraph();
};

//these global variables describe the state of the program
var savedPoint = null;
var savedPointIndex = null;
var stillHovering = false;
var stopTrackingIndex = null;
window.addEventListener('mousemove', function(e){

//check if the user is hovering over the canvas
  if((e.pageY > c.offsetTop) && (e.pageY < (c.offsetTop + c.height)) && (e.pageX > c.offsetLeft) && (e.pageX < (c.offsetLeft + c.width)) ){
    //if they are, record their position relative to the canvas
    var mouseX = e.pageX - c.offsetLeft;
    var mouseY = e.pageY - c.offsetTop;

    //find out if the user is within the outerCircle
    var distanceFromCenter = Math.sqrt(Math.pow(mouseX-outerCircle.middleX,2) + Math.pow(mouseY-outerCircle.middleY,2));
    if(distanceFromCenter <= outerCircle.radius){
      //if they are, find the angle that their mouse makes with the center of the updateOuterCircle

      var cursorX = mouseX-outerCircle.middleX;
      var cursorY = mouseY-outerCircle.middleY;
      if(cursorX==0){//get rid of the undefined case;
        cursorX=0.01;
      }
      var cursorAngle = Math.atan(cursorY/cursorX);

      //take care of the 0 case
      if(cursorY==0){
        if(cursorX>0){
          cursorAngle = 0;
        }else{
          cursorAngle = Math.PI;
        }
      }
      //adjust for arctan symmetries as well as to be on a scale from 0 to 2*PI:
      if(cursorX>0 && cursorY>0){
        ;//do nothing
      }
      if(cursorX<0 && cursorY>0){
        cursorAngle+=Math.PI;
      }
      if(cursorX<0 && cursorY < 0){
        cursorAngle+=Math.PI;
      }
      if(cursorX>0 && cursorY <0){
        cursorAngle+=(Math.PI*2);
      }


      var angle = 0;
      var angleJump = 2*Math.PI/radialLineArray.length;
      //Check if the user overlaps with a radial line
      for(var i=0; i<radialLineArray.length; i++){
        //if you've been told to stop tracking this index, don't check if the user is hovering over it, just move on.
        if(stopTrackingIndex===i){
          angle+=angleJump;
          stillHovering=false;
          continue;
        }
        //check the upper and lower andgle boundaries that the user would have to fit in to select this dot
        var upperBoundary = angle+angleJump/3;
        var lowerBoundary = angle-angleJump/3;
        //take care of the case where the angle goes from 2Pi to 0
        var specialCase = false;
        if(angle===0){
          if(cursorAngle>2*Math.PI-angleJump/3){
            specialCase = true;
          }
        }
        //if the user fits into these boundaries, then have the user select this dot.
        if( ((cursorAngle < upperBoundary) && (cursorAngle > lowerBoundary)) || specialCase ){
          //if you found another index that your cursor is hovering over, forget about the stopTracking condition on the other index
          stopTrackingIndex=null;
          //save the old values of the dot in case you have to restore it's value;
          if(savedPoint===null){
            savedPoint = new graphPoint(graphPointArray[i].middleX,graphPointArray[i].middleY,graphPointArray[i].radius,graphPointArray[i].fillColor);
            savedPointIndex = i;
          }else if(savedPointIndex!=i){//if the user was hovering over another point but not they're hovering over this point
            //reset the old saved pointer for the other dot
            updateGraphPoint(savedPointIndex,savedPoint.middleX,savedPoint.middleY,savedPoint.radius,savedPoint.fillColor);
            drawGraph();
            //save the old values of the dot in case you have to restore it's value;
            savedPoint = new graphPoint(graphPointArray[i].middleX,graphPointArray[i].middleY,graphPointArray[i].radius,graphPointArray[i].fillColor);
            savedPointIndex = i;
          }
          //now, having saved the old point information, we want to update the graphPointArray to follow the user's mouse
          //move the dot along with the cursor
          var middleX = outerCircle.middleX + Math.cos(angle)*distanceFromCenter;
          var middleY = outerCircle.middleY + Math.sin(angle)*distanceFromCenter;
          updateGraphPoint(i,middleX,middleY,graphPointArray[i].radius,'#F4FC12');
          drawGraph();
          stillHovering=true;//keep track that we are currently tracking a dot
          break;//don't bother checking the rest of the dots. Break out of the while loop and tell them that you are still tracking a dot
        }else{//if the cursor does not fit within the point's bounds, try the next angle
          angle+=angleJump;
          stillHovering=false;//stillHovering is set to false unless there is an angle range at which the user falls within
        }
      }
      if(!stillHovering && savedPoint!=null){//if the user has just recently stopped tracking a dot, meaning we saved the original dot position,
        //restore the saved point and set the savedPoint to null. This always sets the point back to it's original value.
        updateGraphPoint(savedPointIndex,savedPoint.middleX,savedPoint.middleY,savedPoint.radius,savedPoint.fillColor);
        savedPoint = null;
        savedPointIndex = null;
        drawGraph();
      }
    }else{//if the user is no longer in the circle radius, restore the savedPoint and set the saved pointer to NULL.
          //this covers the case when the user goes from within the circle, between an angle, to outside the circle,
          //not allowing for the previous updateGraphPoint to be called
      if(savedPoint!=null){
        stillHovering=false;
        updateGraphPoint(savedPointIndex,savedPoint.middleX,savedPoint.middleY,savedPoint.radius,savedPoint.fillColor);
        savedPoint = null;
        savedPointIndex = null;
        stopTrackingIndex = null;//forget about not tracking the index
        drawGraph();
      }
    }
  }
});

c.addEventListener('click',function(e){
  if(savedPoint!=null){//if you're currently hoevering over an object
    //update the point position in the savedPointArray.
    savedPoint.middleX = graphPointArray[savedPointIndex].middleX;
    savedPoint.middleY = graphPointArray[savedPointIndex].middleY;
    updateGraphPoint(savedPointIndex,savedPoint.middleX,savedPoint.middleY,savedPoint.radius,savedPoint.fillColor);
    drawGraph();
    //stop tracking the point on that radial line until the user exits the range of that line.
    savedPoint = null;
    stopTrackingIndex = savedPointIndex;//remember the index you're stopping tracking for
    savedPointIndex = null;
    stillHovering = false;
  }else if(stopTrackingIndex!=null){//if the user is trying to update the graph again, without repositionning, let them
    //move the dot along with the
    var mouseX = e.pageX - c.offsetLeft;
    var mouseY = e.pageY - c.offsetTop;
    var distanceFromCenter = Math.sqrt(Math.pow(mouseX-outerCircle.middleX,2) + Math.pow(mouseY-outerCircle.middleY,2));
    if(distanceFromCenter <= outerCircle.radius){
      var angle = 2*Math.PI/graphPointArray.length*stopTrackingIndex;
      var middleX = outerCircle.middleX + Math.cos(angle)*distanceFromCenter;
      var middleY = outerCircle.middleY + Math.sin(angle)*distanceFromCenter;
      updateGraphPoint(stopTrackingIndex,middleX,middleY,graphPointArray[stopTrackingIndex].radius,'#000000');
      drawGraph();
    }
  }
});
