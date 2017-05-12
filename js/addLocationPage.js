// Code for the Add Location page.
var map;
var result;
function initMap(){
    map=new google.maps.Map(document.getElementById('map'),{
        center:{lat:-34.397,lng:150.644},
        zoom:8
    });
}
function getGeoByAddress(){
    var geocoder=new google.maps.Geocoder();
    var address=document.getElementById('address').value;
    geocoder.geocode({'address':address}, function(results, status){
        if (status==='OK') {
            result=result[0];
            map.setCenter(results[0].geometry.location);
            var marker=new google.maps.Maker({
                map:map,
                position:result[0].geometry.loation,
                label:{
                    text:results[0].formatted_address,
                    color:'red'
                }
            });
        }else{
            
        }
    });
}
