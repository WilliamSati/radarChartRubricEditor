function updateRadialLineArray(radialLineArray,outerCircle,numberOfLines){
  //delete all of the previous radialLines
  if(radialLineArray.length!=0){
    radialLineArray.splice(0);//remove all elements from the array and resize it.
                              //if only the references are deleted, then the garbage
                              //collection should destroy the actual objects.
  }
  //create the radial lines objects
  var angle = 0;
  var xOffset = 0;
  var yOffset = 0;
  for(var i=0 ; i < numberOfLines ; i++){
    xOffset = Math.cos(angle)*outerCircle.radius;
    yOffset = Math.sin(angle)*outerCircle.radius;
    var newRadialLine = new radialLine(outerCircle.middleX, outerCircle.middleY, outerCircle.middleX + xOffset, outerCircle.middleY + yOffset);
    radialLineArray.push(newRadialLine);// radialLine object is pushed by reference, but since the reference to the
                                  // object still exists in the global array, the object won't be deleted when the function exits and the
                                  // local object get's out of scope.
    angle += ((2 * Math.PI)/numberOfLines);
  }
  return radialLineArray;
}
function resetGraphPointArray(graphPointArray,outerCircle,numberOfPoints){
  if(graphPointArray.length!=0){
    graphPointArray.splice(0);//remove all elements from the array.
  }
  var angle = 0;
  var radius = outerCircle.radius/25;
  var color = '#000000';
  var x = 0;
  var y = 0;
  var desiredLength = outerCircle.radius/2; //hypotenus
  for(var i = 0; i < numberOfPoints; i++){
    x = outerCircle.middleX + Math.cos(angle)*desiredLength;
    y = outerCircle.middleY + Math.sin(angle)*desiredLength;

    var newPoint = new graphPoint(x,y,radius,color);
    graphPointArray.push(newPoint);

    angle += ((2 * Math.PI)/numberOfPoints);
  }
  return graphPointArray;
}
function updateGraphPointArray(graphPointArray, outerCircle, numberOfPoints, oldRadius,oldCenterX,oldCenterY){
  var angle = 0;
  var radius = outerCircle.radius/25;
  var x = 0;
  var y = 0;
  var oldLength = 0;
  var ratio = 0;
  var desiredLength = 0;
  for(var i = 0; i < numberOfPoints; i++){
    oldLength = Math.sqrt(Math.pow(graphPointArray[i].middleX-oldCenterX,2) + Math.pow(graphPointArray[i].middleY-oldCenterY,2));
    ratio = oldLength/oldRadius;//keep the ratio
    desiredLength = outerCircle.radius*ratio;
    x = outerCircle.middleX + Math.cos(angle)*desiredLength;
    y = outerCircle.middleY + Math.sin(angle)*desiredLength;

    updateGraphPoint(i,x,y,radius,graphPointArray[i].fillColor);
    angle += ((2 * Math.PI)/numberOfPoints);
  }
  return graphPointArray;
}


function updateGraphPoint(arrayIndex,middleX,middleY,radius,fillColor){
    graphPointArray[arrayIndex].middleX = middleX;
    graphPointArray[arrayIndex].middleY = middleY;
    graphPointArray[arrayIndex].radius = radius;
    graphPointArray[arrayIndex].fillColor = fillColor;
}

function updateOuterCircle(outerCircle,middleX,middleY,radius){
  //outerCircle gets passed by reference. the rest get passed by value;
  outerCircle.middleX = middleX;
  outerCircle.middleY = middleY;
  outerCircle.radius = radius;
  return outerCircle;
}
