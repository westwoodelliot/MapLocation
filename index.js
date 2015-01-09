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
		title:"Hello World!"})
		
      google.maps.event.addDomListener(window, 'load', initialize);
}
//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}
