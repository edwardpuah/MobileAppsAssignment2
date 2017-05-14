// Code for the Add Location page.

var map;
var result;

//init the map module on the App. This function will be the callback on querying google map api.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  
}


//query geocode information by the address input by user. This function is completed with the google geocoding service.
function getGeoByAddress() {
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById('address').value;
	geocoder.geocode( { 'address': address}, function(results, status) {
	      if (status == 'OK') {
	    	result = results[0];
	        map.setCenter(results[0].geometry.location);
	        
	        //add annotation on the map
	        var marker = new google.maps.Marker({
	            map: map,	            
	            position: results[0].geometry.location,
	            label: {
	            	text: results[0].formatted_address,
	            	color: "red"
	            }
	        });
	    	  
	      } else {
	        
	      }
	});
}

//function bind to onkeyup event of the address input field. 
function onchangeAddress() {
	getGeoByAddress();	
}


//add location specified by user to locationweatherCache object, and then store it to the local storage.
function addLocation() {

	if(result != null) {
		var nickname = document.getElementById('nickname').value;
		if(nickname==null || nickname=="")
			nickname = result.formatted_address;
		var weatherUtil = loadLocations(); //get locationweatherCache object from stored locations.

		//add location specified by user to locationweatherCache object
		weatherUtil.addLocation(result.geometry.location.lat(), result.geometry.location.lng(), nickname);
		
		//store it to the local storage
		saveLocations(weatherUtil);		

		window.location.href='index.html';
	}
	else alert("The location is not found! Please check your input!");
}