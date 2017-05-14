// Code for LocationWeatherCache class and other shared code.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:

    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
    	return locations.length;
    };

    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
    	return locations[index];
    };

    // Given a latitude, longitude and nickname, this method saves a
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname) {

    	var loca = {
    			nickname: nickname,
    			latitude: latitude,
    			longitude: longitude,
    			forecasts: null
    	};
    	locations.push(loca);
    	return locations.length - 1;
    }

    // Removes the saved location at the given index.
    //
    this.removeLocationAtIndex = function(index)
    {
    	locations.splice(index, 1);
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
    	return JSON.stringify(locations);
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
    	//alert(locationWeatherCachePDO);

    	
    	locations = JSON.parse(locationWeatherCachePDO);
    	//alert(locations);
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the
    // weather object for that location.
    // https://api.darksky.net/forecast/8377b04ab8d9b33ed60f7046062aabd7/42.3601,-71.0589,409467600?exclude=currently,minutely,hourly,alerts,flags

    var _this = this;
    this.getWeatherAtIndexForDate = function(index, date, callback) {
    	//alert(date);
    	var loca = locations[index];
    	if(loca.forecasts!=null){
    		var dt = new Date(parseInt(loca.forecasts.value.daily.data.time));
    		if(date == dt.darkSkyDateString()){
	    		callback(index, loca.forecasts);
	    		return;
    		}
    	}
    	
    	//the query URL for darsky.net
    	var url = "https://api.darksky.net/forecast/8377b04ab8d9b33ed60f7046062aabd7/"
    		+loca.latitude+","+loca.longitude+"," +date
    		+"?exclude=currently,minutely,hourly,alerts,flags";

    	//query weather information via JSONP
    	$.getJSON("http://query.yahooapis.com/v1/public/yql", {
    	    q: 'select * from json where url="'+url+'"',
    	    format: "json"
    	}, function(data) {
    		_this.weatherResponse(data.query.results.json);
    	});
    	_this.callback = callback;
    };

    // This is a callback function passed to darksky.net API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {
    	var index = indexForLocation(response.latitude, response.longitude);
    	var forecasts = {
    			name: response.latitude+","+response.longitude+","+response.daily.data.time,
    			value: response
    	}
    	_this.locationAtIndex(index).forecasts = forecasts;
    	saveLocations(_this);
    	_this.callback(index, forecasts);
    };

    // Private methods:

    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude) {
    	for(var i=0; i<locations.length; i++){
    		if(locations[i].latitude == latitude && locations[i].longitude == longitude)
    			return i;
    	}
    	return -1;
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
	var str = localStorage.getItem(APP_PREFIX + "-weatherUtil");
	//alert(str);
	var weatherUtil = new LocationWeatherCache();
	if(str != null && str != "") {
		weatherUtil.initialiseFromPDO(str);
	}
//alert(weatherUtil.locations[0].nickname);
	return weatherUtil;

}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations(weatherUtil)
{
	var str = weatherUtil.toJSON();
	//alert(str);
	localStorage.setItem(APP_PREFIX + "-weatherUtil", str);
}
