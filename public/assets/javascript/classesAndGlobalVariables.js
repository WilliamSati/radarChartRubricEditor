//Global structures that will hold information about the canvas and the graphics objects on the canvas
///////////////////////////////////////////////////////////////////////////////////////////
//global variables to interact with the canvas
var c = document.getElementById("graphCanvas");
var ctx = c.getContext("2d");
var radialLineArray = [];
var outerCircle;
var graphPointArray = [];
var numberOfCriteria_inputBox = document.getElementById("numberOfCriteria_inputBox");//user input button
var numberOfCriteria_submitButton = document.getElementById("numberOfCriteria_submitButton");//submit button
var resetButton = document.getElementById("resetButton");
var title_inputBox = document.getElementById("title_inputBox");
var title_submitButton = document.getElementById("title_submitButton");
var saveProgressButton = document.getElementById('saveProgress');
var restoreProgressButton = document.getElementById('restoreProgress');

//var commentSection = document.getElementById("commentSection");
var helpButton = document.getElementById("helpButton");

//global objects for jsPDF
var convertToPDF = document.getElementById('convertToPDF');//the button the converts to pdf

//define the structures that will hold the drawn opbjects
class radialLine{
  constructor(startingX,startingY,endingX,endingY){
    this.startingX = startingX;
    this.startingY = startingY;
    this.endingX = endingX;
    this.endingY = endingY;
  }
}
class circle{
  constructor(middleX,middleY,radius){
    this.middleX = middleX;
    this.middleY = middleY;
    this.radius = radius;
    this.startingAngle = 0;
    this.endingAngle = 2*Math.PI;
  }
}
class graphPoint{
  constructor(middleX,middleY,radius,fillColor){
    this.middleX = middleX;
    this.middleY = middleY;
    this.radius = radius;
    this.startingAngle = 0;
    this.endingAngle = 2*Math.PI;
    this.fillColor = fillColor;
  }
}
