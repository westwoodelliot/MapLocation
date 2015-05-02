//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	
	//set up listener for button click
	//$(document).ready(getPosition);
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});


//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
	
	
}

//called when the position is successfully determined
function successPosition(position) {
	
	
	//lets get some stuff out of the position object
	var unixTime = new Date(position.timestamp);
	var date = unixTime.toTimeString();
	var time = position.timestamp;
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	//OK. Now we want to update the display with the correct values
	$('#time').val("Received data at " + date);
	$('#lattext').val("Your latitude is " + latitude);
	$('#longtext').val("Your longitude is " + longitude);
	if ('null' != latitude)
	{
	loadMap(position);
	}
	
}
function loadMap(position)
{
		
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var myLatlng = new google.maps.LatLng(latitude,longitude);
        var mapOptions = {
          center: { lat: latitude, lng: longitude},
          zoom: 16
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
			
      var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		draggable: true,
		title:"Your Position!"});
		
		 var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYLINE
      ]
    },
    markerOptions: {
      icon: 'images/filled_flag.png',
	  draggable: true,
    },
    
  });
    drawingManager.setMap(map);
	loadRoutes(map);

		
      google.maps.event.addDomListener(window, 'load', initialize);
	  
	  
}
//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

$( document ).on( "pagecreate", "#map-page", function() {
    var defaultLatLng = new google.maps.LatLng(52.19812, -2.24185);
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 16,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            draggable: true,
		title:"Your Position!"
        });
		
    }
});