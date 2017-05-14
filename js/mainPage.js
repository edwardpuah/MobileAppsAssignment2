// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName);
    // And load the view location page.
    location.href = 'viewlocation.html';
}

var weatherUtil = loadLocations(); //instance the locationWeatherCache class from local storage
var date = new Date(); //current date
var str = "";

document.onreadystatechange = completeLoading;


//load the weather of locations stored in local storage
function completeLoading() {
    if (document.readyState == "complete") {
    	$("#loading").show();
    	$("#locationList").hide();
    	for(var i=0; i<weatherUtil.length(); i++) {
    		weatherUtil.getWeatherAtIndexForDate(i, date.darkSkyDateString(), function(index, forecasts) {
    			var nickname = loadLocations().locationAtIndex(index).nickname;
    			var summary = forecasts.value.daily.data.summary;
    			var minTemp = forecasts.value.daily.data.temperatureMin;
    			var maxTemp = forecasts.value.daily.data.temperatureMax;
    			var icon = forecasts.value.daily.data.icon + ".png";
    			//generate the html of each entry
    			str += '<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation('+index+');">'
    	              	+  '<span class="mdl-list__item-primary-content">'     
    	              	+   '<img class="mdl-list__item-icon" id="icon0" src="images/'+icon+'" class="list-avatar" />' 
    	                +  '<span id="weather'+index+'" class="mdl-list__item-sub-title">'+nickname+"&nbsp&nbsp"+minTemp+"-"+maxTemp+'</span>'
    	                +  '<span class="mdl-list__item-title">'+ summary +'</span></span></li>';
    			$("#loading").hide();
    			$("#locationList").show();
    			document.getElementById("locationList").innerHTML = str;
    			});
    	}
    }
}



