saveProgressButton.addEventListener('click',function(){
var commentArray = [];
for(var i = 1; i<=graphPointArray.length; i++){
  var aComment = document.getElementById(`comment${i}`).value;
  commentArray.push(aComment);
}
var title = document.getElementById("title").innerHTML;
  var blobString = JSON.stringify([outerCircle, radialLineArray, graphPointArray, commentArray, title]);
  var outerCircleBlob = new Blob([blobString], {type: "application/json"});//"text/plain;charset=utf-8"});
  saveAs(outerCircleBlob, `${title}.txt`);
});

restoreProgressButton.addEventListener('change',function(e){
  var myFileReader = new FileReader();
  myFileReader.readAsText(restoreProgressButton.files[0]);
  myFileReader.onload = function(){
    var jsonArray = JSON.parse(myFileReader.result);
    outerCircle = jsonArray[0];
    radialLineArray = jsonArray[1];
    graphPointArray = jsonArray[2];
    var commentArray = jsonArray[3];
    var title = jsonArray[4];
    resetCommentSection(graphPointArray.length);//make sure there are enough comment boxes. Notice graphPointArray has been resized to how it was before
    for(var i = 1; i<=graphPointArray.length; i++){//notice graphPointArray is the same size as the number of comments there was
      var aComment = commentArray[i-1];
      document.getElementById(`comment${i}`).innerHTML = aComment;
    }
    document.getElementById("title").innerHTML = title;
    resizeHandler();
  }
});
