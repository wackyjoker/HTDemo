
	var url = "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1";
	var s1_h3 = document.getElementById("s1-h3");
	var btn = document.querySelector("#btn-4")
	var para = document.querySelector(".s2-p");
	var ftct = document.querySelector("#ft-content");
	fetch(url)    //AJAX fetching from bacon ipsum
  .then(handleError)
   .then(parsedJSON)
    .then(updateInfo)
    .catch(function(error){
    console.log(error);
  });


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
