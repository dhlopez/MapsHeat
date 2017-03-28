var locations = [];

function myMap() {

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var points = getPoints();
	var mapOptions1 = {
		center: new google.maps.LatLng(43.653569, -79.387802),
		zoom:12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('googleMap1'), mapOptions1);
	function createMap()
	{
		//section going from a lot of values to 0 and repeating
		console.info(points.length);
		heatmap = new google.maps.visualization.HeatmapLayer({
			data: points,
			map: map
        });
		for(var i =0; i<points.length; i++)
		{
			points.splice(i,1);
		}
		if(points.length=="0")
		{
			points = getPoints();
		}
		//end of section
	}
	window.setInterval(createMap, 1000);

		//window.setInterval(myMap, 3000);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('right-panel'));
	
	google.maps.event.addListener(map,'click',function(event) {
		geocodeConvert(geocoder, map, event.latLng);
	});
	
	var geocoder = new google.maps.Geocoder();
}

function geocodeAddress(geocoder, resultsMap) {
	var address = document.getElementById('address').value;
	
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			locations.push({
				location:results[0].formatted_address,
				stopover: true
			});
			resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
			  map: resultsMap,
			  position: results[0].geometry.location
			});
			document.getElementById('allAddresses').innerHTML += '<b>' + address + '</b><br>';
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
function geocodeConvert(geocoder, resultsMap, location){

	geocoder.geocode({'location': location}, function(results, status) {
		if (status === 'OK') {
			locations.push({
				location:results[0].formatted_address,
				stopover: true
			});
			var marker = new google.maps.Marker({   
			  map: resultsMap,
			  position:results[0].geometry.location
			});
			var infowindow = new google.maps.InfoWindow({
				content: results[0].formatted_address
			});
			infowindow.open(resultsMap,marker);
			document.getElementById('allAddresses').innerHTML += '<b>' + results[0].formatted_address + '</b><br>';
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
function displayAddresses(directionsService,directionsDisplay)
{
	var lastStop = locations.length-1;
	var waypts =[];
	//ommit the first and last
	for(var i =1; i<lastStop; i++)
	{
		waypts.push(locations[i]);
		//alert(waypts.length);
	}
	
	directionsService.route({
		origin: locations[0].location,
		destination: locations[lastStop].location,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: 'DRIVING'
		}, function(response, status) {
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
			var route = response.routes[0];
			//directions panel
			var summaryPanel = document.getElementById('directions-panel');
			summaryPanel.innerHTML = '';
			// For each route, display summary information.
			for (var i = 0; i < route.legs.length; i++) {
				var routeSegment = i + 1;
				summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
					'</b><br>';
				summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
				summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
				summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
			}
		} else {
		  window.alert('Directions request failed due to ' + status);
		}
	});
	/*
	for (var i = 0; i < locations.length; i++) {
		alert(locations[i].location);
	}
	*/
}
function getPoints() {
        return [ //(43.653226, -79.383184
          new google.maps.LatLng(43.652551, -79.385368),
          new google.maps.LatLng(43.652745, -79.384586),
          new google.maps.LatLng(43.652842, -79.383688),
          new google.maps.LatLng(43.652919, -79.382815),
          new google.maps.LatLng(43.652992, -79.382112),
          new google.maps.LatLng(43.653100, -79.381461),
          new google.maps.LatLng(43.653206, -79.380829),
          new google.maps.LatLng(43.653273, -79.380324),
          new google.maps.LatLng(43.653316, -79.380023),
          new google.maps.LatLng(43.653357, -79.439794),
          new google.maps.LatLng(43.653371, -79.439687),
          new google.maps.LatLng(43.653368, -79.439666),
          new google.maps.LatLng(43.653383, -79.439594),
          new google.maps.LatLng(43.653508, -79.439525),
          new google.maps.LatLng(43.653842, -79.439591),
          new google.maps.LatLng(43.654147, -79.439668),
          new google.maps.LatLng(43.654206, -79.439686),
          new google.maps.LatLng(43.654386, -79.439790),
          new google.maps.LatLng(43.654701, -79.439902),
          new google.maps.LatLng(43.654965, -79.439938),
          new google.maps.LatLng(43.655010, -79.439947),
          new google.maps.LatLng(43.655360, -79.439952),
          new google.maps.LatLng(43.655715, -79.380030),
          new google.maps.LatLng(43.656117, -79.380119),
          new google.maps.LatLng(43.656564, -79.380209),
          new google.maps.LatLng(43.656905, -79.380270),
          new google.maps.LatLng(43.656956, -79.380279),
          new google.maps.LatLng(43.640224, -79.433520),
          new google.maps.LatLng(43.640155, -79.434101),
          new google.maps.LatLng(43.640160, -79.434430),
          new google.maps.LatLng(43.640378, -79.434527),
          new google.maps.LatLng(43.640738, -79.434598),
          new google.maps.LatLng(43.640938, -79.434650),
          new google.maps.LatLng(43.641024, -79.434889),
          new google.maps.LatLng(43.640955, -79.435392),
          new google.maps.LatLng(43.640886, -79.435959),
          new google.maps.LatLng(43.640811, -79.436275),
          new google.maps.LatLng(43.640788, -79.436299),
          new google.maps.LatLng(43.640719, -79.436302),
          new google.maps.LatLng(43.640702, -79.436298),
          new google.maps.LatLng(43.640661, -79.436273),
          new google.maps.LatLng(43.640395, -79.436172),
          new google.maps.LatLng(43.640228, -79.436116),
          new google.maps.LatLng(43.640169, -79.436130),
          new google.maps.LatLng(43.640066, -79.436167),
          new google.maps.LatLng(43.654345, -79.422922),
          new google.maps.LatLng(43.654389, -79.422926),
          new google.maps.LatLng(43.654437, -79.422924),
          new google.maps.LatLng(43.654746, -79.422818),
          new google.maps.LatLng(43.655436, -79.422959),
          new google.maps.LatLng(43.656120, -79.423112),
          new google.maps.LatLng(43.656433, -79.423029),
          new google.maps.LatLng(43.656631, -79.421213),
          new google.maps.LatLng(43.656660, -79.421033),
          new google.maps.LatLng(43.656801, -79.420141),
          new google.maps.LatLng(43.656823, -79.420034),
          new google.maps.LatLng(43.656831, -79.419916),
          new google.maps.LatLng(43.657034, -79.418208),
          new google.maps.LatLng(43.657056, -79.418034),
          new google.maps.LatLng(43.657169, -79.417145),
          new google.maps.LatLng(43.657217, -79.416715),
          new google.maps.LatLng(43.656144, -79.416403),
          new google.maps.LatLng(43.655292, -79.416257),
          new google.maps.LatLng(43.650666, -79.390374),
          new google.maps.LatLng(43.650501, -79.391281),
          new google.maps.LatLng(43.650148, -79.392052),
          new google.maps.LatLng(43.650173, -79.391148),
          new google.maps.LatLng(43.650693, -79.390592),
          new google.maps.LatLng(43.651261, -79.391142),
          new google.maps.LatLng(43.651808, -79.391730),
          new google.maps.LatLng(43.652340, -79.392341),
          new google.maps.LatLng(43.652812, -79.393022),
          new google.maps.LatLng(43.653300, -79.393672),
          new google.maps.LatLng(43.653809, -79.394275),
          new google.maps.LatLng(43.654246, -79.394979),
          new google.maps.LatLng(43.654791, -79.395958),
          new google.maps.LatLng(43.655675, -79.396746),
          new google.maps.LatLng(43.656262, -79.395780),
          new google.maps.LatLng(43.656776, -79.395093),
          new google.maps.LatLng(43.657282, -79.394426),
          new google.maps.LatLng(43.657783, -79.393767),
          new google.maps.LatLng(43.658343, -79.393184),
          new google.maps.LatLng(43.658895, -79.392506),
          new google.maps.LatLng(43.659371, -79.391701),
          new google.maps.LatLng(43.659722, -79.390952),
          new google.maps.LatLng(43.690315, -79.390305),
          new google.maps.LatLng(43.690738, -79.389616),
          new google.maps.LatLng(43.679448, -79.438702),
          new google.maps.LatLng(43.679023, -79.438585),
          new google.maps.LatLng(43.678542, -79.438492),
          new google.maps.LatLng(43.678100, -79.438411),
          new google.maps.LatLng(43.677986, -79.438376),
          new google.maps.LatLng(43.677680, -79.438313),
          new google.maps.LatLng(43.677316, -79.438273),
          new google.maps.LatLng(43.677135, -79.438254),
          new google.maps.LatLng(43.676987, -79.438303),
          new google.maps.LatLng(43.676946, -79.438404),
          new google.maps.LatLng(43.676944, -79.438467),
          new google.maps.LatLng(43.676892, -79.438459),
          new google.maps.LatLng(43.676842, -79.438442),
          new google.maps.LatLng(43.676822, -79.438391),
          new google.maps.LatLng(43.676814, -79.438412),
          new google.maps.LatLng(43.676787, -79.438628),
          new google.maps.LatLng(43.676729, -79.438650),
          new google.maps.LatLng(43.676759, -79.438677),
          new google.maps.LatLng(43.676772, -79.438498),
          new google.maps.LatLng(43.676787, -79.438389),
          new google.maps.LatLng(43.676848, -79.438283),
          new google.maps.LatLng(43.676870, -79.438239),
          new google.maps.LatLng(43.677015, -79.438198),
          new google.maps.LatLng(43.677333, -79.438256),
          new google.maps.LatLng(43.677595, -79.438308),
          new google.maps.LatLng(43.677797, -79.438344),
          new google.maps.LatLng(43.678160, -79.438442),
          new google.maps.LatLng(43.678414, -79.438508),
          new google.maps.LatLng(43.678445, -79.438516),
          new google.maps.LatLng(43.678503, -79.438529),
          new google.maps.LatLng(43.678607, -79.438549),
          new google.maps.LatLng(43.678670, -79.438644),
          new google.maps.LatLng(43.678847, -79.438706),
          new google.maps.LatLng(43.679240, -79.438744),
          new google.maps.LatLng(43.679738, -79.438822),
          new google.maps.LatLng(43.650201, -79.438882),
          new google.maps.LatLng(43.650400, -79.438905),
          new google.maps.LatLng(43.650501, -79.438921),
          new google.maps.LatLng(43.650892, -79.438986),
          new google.maps.LatLng(43.651446, -79.439087),
          new google.maps.LatLng(43.651985, -79.439199),
          new google.maps.LatLng(43.652239, -79.439249),
          new google.maps.LatLng(43.652286, -79.439266),
          new google.maps.LatLng(43.697847, -79.429388),
          new google.maps.LatLng(43.697874, -79.429180),
          new google.maps.LatLng(43.697885, -79.429069),
          new google.maps.LatLng(43.697887, -79.429050),
          new google.maps.LatLng(43.697933, -79.428954),
          new google.maps.LatLng(43.698242, -79.428990),
          new google.maps.LatLng(43.698617, -79.429075),
          new google.maps.LatLng(43.698719, -79.429092),
          new google.maps.LatLng(43.698944, -79.429145),
          new google.maps.LatLng(43.699320, -79.429251),
          new google.maps.LatLng(43.699590, -79.429309),
          new google.maps.LatLng(43.699677, -79.429324),
          new google.maps.LatLng(43.699966, -79.429360),
          new google.maps.LatLng(43.640288, -79.429430),
          new google.maps.LatLng(43.640443, -79.429461),
          new google.maps.LatLng(43.640465, -79.429474),
          new google.maps.LatLng(43.640644, -79.429540),
          new google.maps.LatLng(43.640948, -79.429620),
          new google.maps.LatLng(43.641242, -79.429685),
          new google.maps.LatLng(43.641375, -79.429702),
          new google.maps.LatLng(43.641400, -79.429703),
          new google.maps.LatLng(43.641453, -79.429707),
          new google.maps.LatLng(43.641473, -79.429709),
          new google.maps.LatLng(43.641532, -79.429707),
          new google.maps.LatLng(43.641852, -79.429729),
          new google.maps.LatLng(43.642173, -79.429789),
          new google.maps.LatLng(43.642459, -79.429847),
          new google.maps.LatLng(43.642554, -79.429825),
          new google.maps.LatLng(43.642647, -79.429549),
          new google.maps.LatLng(43.642693, -79.429179),
          new google.maps.LatLng(43.642729, -79.428751),
          new google.maps.LatLng(43.666104, -79.409291),
          new google.maps.LatLng(43.666103, -79.409268),
          new google.maps.LatLng(43.666138, -79.409229),
          new google.maps.LatLng(43.666183, -79.409231),
          new google.maps.LatLng(43.666153, -79.409276),
          new google.maps.LatLng(43.666005, -79.409365),
          new google.maps.LatLng(43.665897, -79.409570),
          new google.maps.LatLng(43.665767, -79.409739),
          new google.maps.LatLng(43.665693, -79.410389),
          new google.maps.LatLng(43.665615, -79.411201),
          new google.maps.LatLng(43.665533, -79.412121),
          new google.maps.LatLng(43.665467, -79.412939),
          new google.maps.LatLng(43.665444, -79.414821),
          new google.maps.LatLng(43.665444, -79.414964),
          new google.maps.LatLng(43.665318, -79.415424),
          new google.maps.LatLng(43.663961, -79.415296),
          new google.maps.LatLng(43.663115, -79.415196),
          new google.maps.LatLng(43.662967, -79.415183),
          new google.maps.LatLng(43.662278, -79.415127),
          new google.maps.LatLng(43.661675, -79.415055),
          new google.maps.LatLng(43.660932, -79.414988),
          new google.maps.LatLng(43.659337, -79.414862),
          new google.maps.LatLng(43.673187, -79.421922),
          new google.maps.LatLng(43.673043, -79.422118),
          new google.maps.LatLng(43.673007, -79.422165),
          new google.maps.LatLng(43.672979, -79.422219),
          new google.maps.LatLng(43.672865, -79.422394),
          new google.maps.LatLng(43.672779, -79.422503),
          new google.maps.LatLng(43.672676, -79.422701),
          new google.maps.LatLng(43.672606, -79.422806),
          new google.maps.LatLng(43.672566, -79.422840),
          new google.maps.LatLng(43.672508, -79.422852),
          new google.maps.LatLng(43.672387, -79.423011),
          new google.maps.LatLng(43.672099, -79.423328),
          new google.maps.LatLng(43.671704, -79.423783),
          new google.maps.LatLng(43.671481, -79.424081),
          new google.maps.LatLng(43.671400, -79.424179),
          new google.maps.LatLng(43.671352, -79.424220),
          new google.maps.LatLng(43.671248, -79.424327),
          new google.maps.LatLng(43.670904, -79.424781),
          new google.maps.LatLng(43.670520, -79.425283),
          new google.maps.LatLng(43.670337, -79.425553),
          new google.maps.LatLng(43.670128, -79.425832),
          new google.maps.LatLng(43.669756, -79.426331),
          new google.maps.LatLng(43.669300, -79.426902),
          new google.maps.LatLng(43.669132, -79.427065),
          new google.maps.LatLng(43.669092, -79.427103),
          new google.maps.LatLng(43.668979, -79.427172),
          new google.maps.LatLng(43.668595, -79.427634),
          new google.maps.LatLng(43.668372, -79.427913),
          new google.maps.LatLng(43.668337, -79.427961),
          new google.maps.LatLng(43.668244, -79.428138),
          new google.maps.LatLng(43.667942, -79.428581),
          new google.maps.LatLng(43.667482, -79.429094),
          new google.maps.LatLng(43.667031, -79.429606),
          new google.maps.LatLng(43.666732, -79.429986),
          new google.maps.LatLng(43.666680, -79.430058),
          new google.maps.LatLng(43.666633, -79.430109),
          new google.maps.LatLng(43.666580, -79.430211),
          new google.maps.LatLng(43.666367, -79.430594),
          new google.maps.LatLng(43.665910, -79.431137),
          new google.maps.LatLng(43.665353, -79.431806),
          new google.maps.LatLng(43.664962, -79.432298),
          new google.maps.LatLng(43.664868, -79.432486),
          new google.maps.LatLng(43.664518, -79.432913),
          new google.maps.LatLng(43.663435, -79.434173),
          new google.maps.LatLng(43.662847, -79.434953),
          new google.maps.LatLng(43.662291, -79.435935),
          new google.maps.LatLng(43.662224, -79.436074),
          new google.maps.LatLng(43.661957, -79.436892),
          new google.maps.LatLng(43.661652, -79.438886),
          new google.maps.LatLng(43.661284, -79.439955),
          new google.maps.LatLng(43.661210, -79.380068),
          new google.maps.LatLng(43.661064, -79.380720),
          new google.maps.LatLng(43.661040, -79.381411),
          new google.maps.LatLng(43.661048, -79.382324),
          new google.maps.LatLng(43.660851, -79.383118),
          new google.maps.LatLng(43.659977, -79.384591),
          new google.maps.LatLng(43.659913, -79.384698),
          new google.maps.LatLng(43.659623, -79.385065),
          new google.maps.LatLng(43.658902, -79.385158),
          new google.maps.LatLng(43.658428, -79.384570),
          new google.maps.LatLng(43.657687, -79.383340),
          new google.maps.LatLng(43.657583, -79.383240),
          new google.maps.LatLng(43.657019, -79.382787),
          new google.maps.LatLng(43.656603, -79.382322),
          new google.maps.LatLng(43.656380, -79.381602),
          new google.maps.LatLng(43.655790, -79.381382),
          new google.maps.LatLng(43.654493, -79.382133),
          new google.maps.LatLng(43.654361, -79.382206),
          new google.maps.LatLng(43.653719, -79.382650),
          new google.maps.LatLng(43.653096, -79.382915),
          new google.maps.LatLng(43.651617, -79.383211),
          new google.maps.LatLng(43.651496, -79.383246),
          new google.maps.LatLng(43.650733, -79.383428),
          new google.maps.LatLng(43.650126, -79.383536),
          new google.maps.LatLng(43.650103, -79.383784),
          new google.maps.LatLng(43.650390, -79.384010),
          new google.maps.LatLng(43.650448, -79.384013),
          new google.maps.LatLng(43.650536, -79.384040),
          new google.maps.LatLng(43.650493, -79.384141),
          new google.maps.LatLng(43.690859, -79.402808),
          new google.maps.LatLng(43.690864, -79.402768),
          new google.maps.LatLng(43.690995, -79.402539),
          new google.maps.LatLng(43.691148, -79.402172),
          new google.maps.LatLng(43.691385, -79.401312),
          new google.maps.LatLng(43.691405, -79.400776),
          new google.maps.LatLng(43.691288, -79.400528),
          new google.maps.LatLng(43.691113, -79.400441),
          new google.maps.LatLng(43.691027, -79.400395),
          new google.maps.LatLng(43.691094, -79.400311),
          new google.maps.LatLng(43.691211, -79.400183),
          new google.maps.LatLng(43.691060, -79.399334),
          new google.maps.LatLng(43.690538, -79.398718),
          new google.maps.LatLng(43.690095, -79.398086),
          new google.maps.LatLng(43.659644, -79.397360),
          new google.maps.LatLng(43.659254, -79.396844),
          new google.maps.LatLng(43.658855, -79.396397),
          new google.maps.LatLng(43.658483, -79.395963),
          new google.maps.LatLng(43.658015, -79.395365),
          new google.maps.LatLng(43.657558, -79.394735),
          new google.maps.LatLng(43.657472, -79.394323),
          new google.maps.LatLng(43.657630, -79.394025),
          new google.maps.LatLng(43.657767, -79.393987),
          new google.maps.LatLng(43.657486, -79.394452),
          new google.maps.LatLng(43.656977, -79.395043),
          new google.maps.LatLng(43.656583, -79.395552),
          new google.maps.LatLng(43.656540, -79.395610),
          new google.maps.LatLng(43.656516, -79.395659),
          new google.maps.LatLng(43.656378, -79.395707),
          new google.maps.LatLng(43.656044, -79.395362),
          new google.maps.LatLng(43.655598, -79.394715),
          new google.maps.LatLng(43.655321, -79.394361),
          new google.maps.LatLng(43.655207, -79.394236),
          new google.maps.LatLng(43.655751, -79.394062),
          new google.maps.LatLng(43.655996, -79.393881),
          new google.maps.LatLng(43.656092, -79.393830),
          new google.maps.LatLng(43.655998, -79.393899),
          new google.maps.LatLng(43.655114, -79.394365),
          new google.maps.LatLng(43.655022, -79.394441),
          new google.maps.LatLng(43.654823, -79.394635),
          new google.maps.LatLng(43.654719, -79.394629),
          new google.maps.LatLng(43.655069, -79.394176),
          new google.maps.LatLng(43.655500, -79.393650),
          new google.maps.LatLng(43.655770, -79.393291),
          new google.maps.LatLng(43.655839, -79.393159),
          new google.maps.LatLng(43.652651, -79.400628),
          new google.maps.LatLng(43.652616, -79.400599),
          new google.maps.LatLng(43.652702, -79.400470),
          new google.maps.LatLng(43.652915, -79.400192),
          new google.maps.LatLng(43.653137, -79.399887),
          new google.maps.LatLng(43.653414, -79.399519),
          new google.maps.LatLng(43.653629, -79.399237),
          new google.maps.LatLng(43.653688, -79.399157),
          new google.maps.LatLng(43.653716, -79.399106),
          new google.maps.LatLng(43.653798, -79.399072),
          new google.maps.LatLng(43.653997, -79.399186),
          new google.maps.LatLng(43.654271, -79.399538),
          new google.maps.LatLng(43.654577, -79.399948),
          new google.maps.LatLng(43.654828, -79.400260),
          new google.maps.LatLng(43.654999, -79.400477),
          new google.maps.LatLng(43.655113, -79.400651),
          new google.maps.LatLng(43.655155, -79.400703),
          new google.maps.LatLng(43.655192, -79.400749),
          new google.maps.LatLng(43.655278, -79.400839),
          new google.maps.LatLng(43.655387, -79.400857),
          new google.maps.LatLng(43.655478, -79.400890),
          new google.maps.LatLng(43.655526, -79.401022),
          new google.maps.LatLng(43.655598, -79.401148),
          new google.maps.LatLng(43.655631, -79.401202),
          new google.maps.LatLng(43.655660, -79.401267),
          new google.maps.LatLng(43.643986, -79.426035),
          new google.maps.LatLng(43.644102, -79.425089),
          new google.maps.LatLng(43.644211, -79.424156),
          new google.maps.LatLng(43.643861, -79.423385),
          new google.maps.LatLng(43.643151, -79.423214),
          new google.maps.LatLng(43.642439, -79.423077),
          new google.maps.LatLng(43.641740, -79.422905),
          new google.maps.LatLng(43.641069, -79.422785),
          new google.maps.LatLng(43.640345, -79.422649),
          new google.maps.LatLng(43.699633, -79.422603),
          new google.maps.LatLng(43.699750, -79.421700),
          new google.maps.LatLng(43.699885, -79.420854),
          new google.maps.LatLng(43.699209, -79.420607),
          new google.maps.LatLng(43.695656, -79.400395),
          new google.maps.LatLng(43.695203, -79.400304),
          new google.maps.LatLng(43.678738, -79.415584),
          new google.maps.LatLng(43.678812, -79.415189),
          new google.maps.LatLng(43.678824, -79.415092),
          new google.maps.LatLng(43.678833, -79.414932),
          new google.maps.LatLng(43.678834, -79.414898),
          new google.maps.LatLng(43.678740, -79.414757),
          new google.maps.LatLng(43.678501, -79.414433),
          new google.maps.LatLng(43.678182, -79.414026),
          new google.maps.LatLng(43.677851, -79.413623),
          new google.maps.LatLng(43.677486, -79.413166),
          new google.maps.LatLng(43.677109, -79.412674),
          new google.maps.LatLng(43.676743, -79.412186),
          new google.maps.LatLng(43.676440, -79.411800),
          new google.maps.LatLng(43.676295, -79.411614),
          new google.maps.LatLng(43.676158, -79.411440),
          new google.maps.LatLng(43.675806, -79.410997),
          new google.maps.LatLng(43.675422, -79.410484),
          new google.maps.LatLng(43.675126, -79.410087),
          new google.maps.LatLng(43.675012, -79.409854),
          new google.maps.LatLng(43.675164, -79.409573),
          new google.maps.LatLng(43.675498, -79.409180),
          new google.maps.LatLng(43.675868, -79.408730),
          new google.maps.LatLng(43.676256, -79.408240),
          new google.maps.LatLng(43.676519, -79.407928),
          new google.maps.LatLng(43.676539, -79.407904),
          new google.maps.LatLng(43.676595, -79.407854),
          new google.maps.LatLng(43.676853, -79.407547),
          new google.maps.LatLng(43.677234, -79.407087),
          new google.maps.LatLng(43.677644, -79.406558),
          new google.maps.LatLng(43.678066, -79.406017),
          new google.maps.LatLng(43.678468, -79.405499),
          new google.maps.LatLng(43.678866, -79.404995),
          new google.maps.LatLng(43.679295, -79.404455),
          new google.maps.LatLng(43.679695, -79.403950),
          new google.maps.LatLng(43.679982, -79.403584),
          new google.maps.LatLng(43.650295, -79.403223),
          new google.maps.LatLng(43.650664, -79.402766),
          new google.maps.LatLng(43.651043, -79.402288),
          new google.maps.LatLng(43.651399, -79.401823),
          new google.maps.LatLng(43.651727, -79.401407),
          new google.maps.LatLng(43.651853, -79.401247),
          new google.maps.LatLng(43.651894, -79.401195),
          new google.maps.LatLng(43.652076, -79.400977),
          new google.maps.LatLng(43.652338, -79.400603),
          new google.maps.LatLng(43.652666, -79.400133),
          new google.maps.LatLng(43.653048, -79.399634),
          new google.maps.LatLng(43.653450, -79.399198),
          new google.maps.LatLng(43.653791, -79.398998),
          new google.maps.LatLng(43.654177, -79.398959),
          new google.maps.LatLng(43.654388, -79.398971),
          new google.maps.LatLng(43.654404, -79.399128),
          new google.maps.LatLng(43.654586, -79.399524),
          new google.maps.LatLng(43.654835, -79.399927),
          new google.maps.LatLng(43.655116, -79.400307),
          new google.maps.LatLng(43.655282, -79.400539),
          new google.maps.LatLng(43.655346, -79.400692),
          new google.maps.LatLng(43.665769, -79.407201),
          new google.maps.LatLng(43.665790, -79.407414),
          new google.maps.LatLng(43.665802, -79.407755),
          new google.maps.LatLng(43.665791, -79.408219),
          new google.maps.LatLng(43.665763, -79.408759),
          new google.maps.LatLng(43.665726, -79.409348),
          new google.maps.LatLng(43.665716, -79.409882),
          new google.maps.LatLng(43.665708, -79.410202),
          new google.maps.LatLng(43.665705, -79.410253),
          new google.maps.LatLng(43.665707, -79.410369),
          new google.maps.LatLng(43.665692, -79.410720),
          new google.maps.LatLng(43.665699, -79.411215),
          new google.maps.LatLng(43.665687, -79.411789),
          new google.maps.LatLng(43.665666, -79.412373),
          new google.maps.LatLng(43.665598, -79.412883),
          new google.maps.LatLng(43.665543, -79.413039),
          new google.maps.LatLng(43.665532, -79.413125),
          new google.maps.LatLng(43.665500, -79.413553),
          new google.maps.LatLng(43.665448, -79.414053),
          new google.maps.LatLng(43.665388, -79.414645),
          new google.maps.LatLng(43.665323, -79.415250),
          new google.maps.LatLng(43.665303, -79.415847),
          new google.maps.LatLng(43.665251, -79.416439),
          new google.maps.LatLng(43.665204, -79.417020),
          new google.maps.LatLng(43.665172, -79.417556),
          new google.maps.LatLng(43.665164, -79.418075),
          new google.maps.LatLng(43.665153, -79.418618),
          new google.maps.LatLng(43.665136, -79.419112),
          new google.maps.LatLng(43.665129, -79.419378),
          new google.maps.LatLng(43.665119, -79.419481),
          new google.maps.LatLng(43.665100, -79.419852),
          new google.maps.LatLng(43.665083, -79.420349),
          new google.maps.LatLng(43.665045, -79.420930),
          new google.maps.LatLng(43.664992, -79.421481),
          new google.maps.LatLng(43.664980, -79.421695),
          new google.maps.LatLng(43.664993, -79.421843),
          new google.maps.LatLng(43.664986, -79.422255),
          new google.maps.LatLng(43.664975, -79.422823),
          new google.maps.LatLng(43.664939, -79.423411),
          new google.maps.LatLng(43.664902, -79.424014),
          new google.maps.LatLng(43.664853, -79.424576),
          new google.maps.LatLng(43.664826, -79.424922),
          new google.maps.LatLng(43.664796, -79.425375),
          new google.maps.LatLng(43.664782, -79.425869),
          new google.maps.LatLng(43.664768, -79.426089),
          new google.maps.LatLng(43.664766, -79.426117),
          new google.maps.LatLng(43.664723, -79.426276),
          new google.maps.LatLng(43.664681, -79.426649),
          new google.maps.LatLng(43.652012, -79.404200),
          new google.maps.LatLng(43.651574, -79.404911),
          new google.maps.LatLng(43.651055, -79.405597),
          new google.maps.LatLng(43.650479, -79.406341),
          new google.maps.LatLng(43.679996, -79.406939),
          new google.maps.LatLng(43.679459, -79.407613),
          new google.maps.LatLng(43.678953, -79.408228),
          new google.maps.LatLng(43.678409, -79.408839),
          new google.maps.LatLng(43.677842, -79.409501),
          new google.maps.LatLng(43.677334, -79.410181),
          new google.maps.LatLng(43.676809, -79.410836),
          new google.maps.LatLng(43.676240, -79.411514),
          new google.maps.LatLng(43.675725, -79.412145),
          new google.maps.LatLng(43.675190, -79.412805),
          new google.maps.LatLng(43.674672, -79.413464),
          new google.maps.LatLng(43.674084, -79.414186),
          new google.maps.LatLng(43.673533, -79.413636),
          new google.maps.LatLng(43.673021, -79.413009),
          new google.maps.LatLng(43.672501, -79.412371),
          new google.maps.LatLng(43.671964, -79.411681),
          new google.maps.LatLng(43.671479, -79.411078),
          new google.maps.LatLng(43.670992, -79.410477),
          new google.maps.LatLng(43.670467, -79.409801),
          new google.maps.LatLng(43.670090, -79.408904),
          new google.maps.LatLng(43.669657, -79.408103),
          new google.maps.LatLng(43.669132, -79.407276),
          new google.maps.LatLng(43.668564, -79.406469),
          new google.maps.LatLng(43.667980, -79.405745),
          new google.maps.LatLng(43.667380, -79.405299),
          new google.maps.LatLng(43.666604, -79.405297),
          new google.maps.LatLng(43.665838, -79.405200),
          new google.maps.LatLng(43.665139, -79.405139),
          new google.maps.LatLng(43.664457, -79.405094),
          new google.maps.LatLng(43.663716, -79.405142),
          new google.maps.LatLng(43.662932, -79.405398),
          new google.maps.LatLng(43.662126, -79.405813),
          new google.maps.LatLng(43.661344, -79.406215),
          new google.maps.LatLng(43.660556, -79.406495),
          new google.maps.LatLng(43.659732, -79.406484),
          new google.maps.LatLng(43.658910, -79.406228),
          new google.maps.LatLng(43.658182, -79.405695),
          new google.maps.LatLng(43.657676, -79.405118),
          new google.maps.LatLng(43.657039, -79.404346),
          new google.maps.LatLng(43.656335, -79.403719),
          new google.maps.LatLng(43.655503, -79.403406),
          new google.maps.LatLng(43.654665, -79.403242),
          new google.maps.LatLng(43.653837, -79.403172),
          new google.maps.LatLng(43.652986, -79.403112),
          new google.maps.LatLng(43.651266, -79.403355)
        ];
      }
	  
	  //window.setInterval(myMap, 1000);