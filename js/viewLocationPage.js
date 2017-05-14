// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.


var map;
//init the map module on the App. This function will be the callback on querying google map api.
function initMap() {
  map = new google.maps.Map(document.getElementById('map_detail'), {
    center: {
    	lat: loca.latitude, 
    	lng: loca.longitude
    	},
    zoom: 8
  });

}

//add marker of the location in map
window.onload = function() {
	var myLatlng = new google.maps.LatLng(loca.latitude,loca.longitude);
    var marker = new google.maps.Marker({
        map: map,	            
        position: myLatlng
    });
}

//get the index of current location
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation");
var weatherUtil = loadLocations();
var loca;
var index;

if (locationIndex !== null)
{
    index = parseInt(locationIndex);
	loca = weatherUtil.locationAtIndex(index);
	document.getElementById("headerBarTitle").textContent = loca.nickname;
}

var date = new Date();
weatherUtil.getWeatherAtIndexForDate(index, date.darkSkyDateString(), function(index, forecasts) {
	//display the details of weather on the view.
	document.getElementById("date").innerHTML = date.simpleDateString();
	document.getElementById("summary").innerHTML = forecasts.value.daily.data.icon;
	document.getElementById("minTemp").innerHTML = forecasts.value.daily.data.temperatureMin;
	document.getElementById("maxTemp").innerHTML = forecasts.value.daily.data.temperatureMax;
	document.getElementById("humidity").innerHTML = forecasts.value.daily.data.humidity;
	document.getElementById("wind").innerHTML = forecasts.value.daily.data.windSpeed;
});

//remove current location from local storage.
function removeLocation() {
	var index = parseInt(locationIndex);
	weatherUtil.removeLocationAtIndex(index);
	saveLocations(weatherUtil);
	window.location.href='index.html';
}

//when the date slider is been dragging, this funtion will change the weather view on the page by the date dragged.
function dateChange() {
	$("#loading").show();
	$("#weatherTable").hide();
	var num = 29 - document.getElementById('dateRange').value;
	var newDate = new Date(new Date()-24*60*60*1000*num);
	weatherUtil.getWeatherAtIndexForDate(index, newDate.darkSkyDateString(), function(index, forecasts) {
		//alert(JSON.stringify(forecasts));
		document.getElementById("date").innerHTML = newDate.simpleDateString();
		document.getElementById("summary").innerHTML = forecasts.value.daily.data.icon;
		document.getElementById("minTemp").innerHTML = forecasts.value.daily.data.temperatureMin;
		document.getElementById("maxTemp").innerHTML = forecasts.value.daily.data.temperatureMax;
		document.getElementById("humidity").innerHTML = forecasts.value.daily.data.humidity;
		document.getElementById("wind").innerHTML = forecasts.value.daily.data.windSpeed;
		$("#loading").hide();
		$("#weatherTable").show();
	});
}