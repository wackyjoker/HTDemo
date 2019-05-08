//AJAX fetching from bacon ipsum
$(document).ready( function() {

  loadPopupBox();

  $('#popupBoxClose').click( function() {            
      unloadPopupBox();
  });

  $('#container').click( function() {
      unloadPopupBox();
  });

  function unloadPopupBox() {    // TO Unload the Popupbox
      $('#popup_box').fadeOut("slow");
      $("#container").css({ // this is just for style        
          "opacity": "1"  
      }); 
  }    

  function loadPopupBox() {    // To Load the Popupbox

      var counter = 10;
      var id;
      $('#popup_box').fadeIn("slow");
      $("#container").css({ // this is just for style
          "opacity": "0.3"  
      });

      id = setInterval(function() {
          counter--;
          if(counter < 0) {
              clearInterval(id);

              unloadPopupBox();
          } else {
              $("#countDown").text("it closed  after " + counter.toString() + " seconds.");
          }
      }, 1000);

  }        
});





	var url = "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1";
	var s1_h3 = document.getElementById("s1-h3");
	var para = document.querySelector(".s2-p");
	var ftct = document.querySelector("#ft-content");


if(s1_h3!=null){

	fetch(url)    
  .then(handleError)
   .then(parsedJSON)
    .then(updateInfo)
    .catch(function(error){
    console.log(error);
  });
}

//function area
function handleError(request){
  if(!request.ok){
    throw Error(request.status);
  }
  return request;
}
function parsedJSON(response){
  return response.json();
}

function updateInfo(data){
	
  s1_h3.innerText = data;
   para.textContent = data;
 
  }
// image slider
 


