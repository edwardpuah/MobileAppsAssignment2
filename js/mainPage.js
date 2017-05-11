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
var weatherUtil=loadLocations();
var date=new Date();
var str="";
//alert(weatherUtil.length());
for (var i=0; i<weatherUtil.length();i++){
    //if (weatherUtil.locationAtIndex(i).forecasts===null){
    weatherUtil.getWeatherAtIndexForDate(i,date.darkSkyDateString(),function(){
        
    });
//}
   var summary="";
		if(weatherUtil.locationAtIndex(i).forecasts != null)
			summary = weatherUtil.locationAtIndex(i).forecasts.value.daily.data.summary;
	str += '<li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation('+i+');">'
              +  '<span class="mdl-list__item-primary-content">'
               +   '<img class="mdl-list__item-icon" id="icon0" src="images/loading.png" class="list-avatar" />'
                +  '<span>'+ summary +'</span>'
                +  '<span id="weather'+i+'" class="mdl-list__item-sub-title">'+weatherUtil.locationAtIndex(i).nickname+'</span></span></li>'
}

document.getElementById("locationList").innerHTML = str;
