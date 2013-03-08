// Save this script as `options.js`

// Saves options to localStorage.

var data = {ogdata: true};

function loadWindows(){
  
  $('input').each(function(){
    $el = $(this);
    data[$el.attr('id')] = $el.val();
  });
  
  console.log(data)
  chrome.extension.sendMessage(data, function(response) {
    console.log(response);
  });
}

// Restores select box state to saved value from localStorage.
function restore_options(){


}


$('#loadWindows').click(loadWindows);


$('#facebookImage').change(function(e){ 
  var image = $(this).val();
  $('#previewImage').attr('src', image);
});

$('#previewImage').on('load', function(e){
  var width = $(this).width();
  var height = $(this).height();
  if (width == height){
    $('#imageInfoText').html('Image is square good job');
  } else {
    $('#imageInfoText').html('Image is not square, this may look whack. USE A SQAUARE IMAGE');
  }
})

$('#previewImage').on('error', function(e){
  $('#imageInfoText').html('UH OH there was a problem with this image, try again');
})

// document.addEventListener('DOMContentLoaded', restore_options);
// document.querySelector('#save').addEventListener('click', save_options);

