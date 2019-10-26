//redraw the comment section
function resetCommentSection(input){
  var commentList = document.getElementById('commentList');
  var newInnerHTML = ``;
  for(var i = 1; i <= input ; i++){
    newInnerHTML += `<span class="commentID">C${i}: </span><textarea id="comment${i}" class="commentBox"></textarea><br>`;
  }
  commentList.innerHTML = newInnerHTML;
};
