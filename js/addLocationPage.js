// Code for the Add Location page.
var map = null
var pos = null
var nickname = document.getElementById("nickname")
var lcation = document.getElementById("newAddress")
  function initMap() 
        {
// Initialise map, centred on Melbourne, Australia.
            map = new google.maps.Map(document.getElementById('map'), 
                                      {
                                            center: {
                                                lat: -37.8200855,
                                                lng: 144.9608045
                                                    },
                                            zoom: 13
                                      }
                                      );
 
    // Create the search box and link it to the UI element.
    var input = document.getElementById('newAddress');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });

        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            pos = place.geometry.location;
            name = place.name;

            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));


            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);
    });
    //return markers.pop();
}
      //from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

// all messages

//  orignal website: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
(function() 
 {
  'use strict';
  var snackbarContainer = document.querySelector('#snakeBar');
  var showSaveLocationrButton = document.querySelector('#saveLocation');  
    showSaveLocationrButton.addEventListener('click', function () {
        var data = {
            message: 'You have to enter a location to continue!'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
  
  ;
}
 ());








