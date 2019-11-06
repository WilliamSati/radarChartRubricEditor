convertToPDF.addEventListener('click', function(){

  var pdf = new jsPDF('p', 'pt', 'letter');
  var pageWidth = pdf.internal.pageSize.width;
  var pageHeight = pdf.internal.pageSize.height;

  var startingHeight = 50;
  //add the title
  var pageTitle = document.getElementById("title");
  var titleX = pdf.internal.pageSize.width/2;
  pdf.setFontSize(25);
  pdf.text(pageTitle.innerHTML,titleX,startingHeight,'center');
  startingHeight+=10;

  //add the canvas we made
  var canvasElement = document.getElementById("graphCanvas");
  var imgData = canvasElement.toDataURL("image/jpeg", 1.0);
  var imgWidth = pdf.internal.pageSize.width/2;
  var imgHeight = imgWidth;
  var marginLeft = pdf.internal.pageSize.width/2 - imgWidth/2 ;
  pdf.addImage(imgData, 'JPEG', marginLeft, startingHeight, imgWidth, imgHeight);
  startingHeight+=imgHeight;
  marginLeft = 25;

//add the comment title
  var commentsTitle = document.getElementById("commentsTitle");
  pdf.text(commentsTitle.innerHTML,marginLeft,startingHeight);
  startingHeight+=40;

//set the font size for the comments on the PDF
  var commentFontSize = 20 - 10*graphPointArray.length/20;
  if(commentFontSize<10){//don't get smaller than 10
    commentFontSize = 10;
  }
  if(commentFontSize>20){
    commentFontSize = 20;
  }
  var commentTitleSize = commentFontSize+=2;

  var lineHeight = commentTitleSize;
  //add all of the comments:
  for(var i=1; i <= graphPointArray.length; i++){
    var comment = document.getElementById('comment' + i);
    var commentText = comment.value.trim();//remove the trailing white spaces
    if(commentText === ""){//if the comment is empty, don't put it on the pdf.
      continue;
    }

    if(startingHeight > (pageHeight-2*lineHeight)){//if you surpass the lines, create a new page
      pdf.addPage('p', 'pt', 'letter');
      startingHeight = lineHeight*2;
    }

    pdf.setFontSize(commentTitleSize);//prepare to write the title (S1,S2, etc.)
    pdf.text(`C${i}:`,marginLeft,startingHeight);

    var stringArray = pdf.splitTextToSize(commentText,pageWidth-(60+marginLeft));

    for(var j=0 ; j<stringArray.length; j++){
      pdf.text(stringArray[j],commentTitleSize*2+marginLeft,startingHeight);//put the line 30 to the right of the 'Si:'
      startingHeight+=lineHeight;
      if(startingHeight > (pageHeight-2*lineHeight)){//if you surpass the lines, create a new page
        pdf.addPage('p', 'pt', 'letter');
        startingHeight = lineHeight*2;
      }
    }
    startingHeight+=1.5*lineHeight;
  }

  pdf.save(pageTitle.innerHTML);
});

/*
//takes in a long string and divides it into different
function divideString(originalString){
  var stringArray = [];
  var i = 0;
  var done = false;
  //keep extracting strings until the original string is empty
  while(1){
    var endIndex = 120;//we're gonna copy 101 characters
    if(originalString.length<=121){//if we're gonna copy all of the characters, we're done
      done = true;
      if(originalString.length<=120){//if the string doesen't have 101 characters, modify how much you're gonna copy.
        endIndex = originalString.length;
      }
    }
    stringArray.push(originalString.slice(0,endIndex));//copy up to 101 characters into.
    if(done){
      return stringArray;
    }else{
      originalString = originalString.slice(endIndex+1);//the original string becomes everything that hasn't been copied yet.
    }
    i++;
  }
}
*/
