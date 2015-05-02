function loadRoutes(map)
{
	var map = map;
	var myRoutes = [new google.maps.LatLng(52.491221,-2.159843),
new google.maps.LatLng(52.493651,-2.156668),
new google.maps.LatLng(52.491169,-2.165380),
new google.maps.LatLng(52.488530,-2.163663),
new google.maps.LatLng(52.488922,-2.155552),
new google.maps.LatLng(52.493756,-2.155938),
new google.maps.LatLng(52.493625,-2.156582)
];
var polyOptions;
polyOptions = {
path: myRoutes,
strokeColor: "#FF0000",
strokeOpacity: 1,
strokeWeight: 3
}
var it = new google.maps.Polyline(polyOptions);
it.setMap(map);
}
