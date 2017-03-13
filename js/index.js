var locations = [];

function myMap() {

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
  
	var mapOptions1 = {
		center: new google.maps.LatLng(43.783226, -79.383184),
		zoom:12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('googleMap1'), mapOptions1);
	heatmap = new google.maps.visualization.HeatmapLayer({
          data: getPoints(),
          map: map
        });
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('right-panel'));
	
	google.maps.event.addListener(map,'click',function(event) {
		geocodeConvert(geocoder, map, event.latLng);
	});
	
	var geocoder = new google.maps.Geocoder();
	document.getElementById('submit').addEventListener('click', function() {
		geocodeAddress(geocoder, map);
	});
	document.getElementById('draw').addEventListener('click', function() {
		displayAddresses(directionsService,directionsDisplay);
	});
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
          new google.maps.LatLng(43.782551, -79.445368),
          new google.maps.LatLng(43.782745, -79.444586),
          new google.maps.LatLng(43.782842, -79.443688),
          new google.maps.LatLng(43.782919, -79.442815),
          new google.maps.LatLng(43.782992, -79.442112),
          new google.maps.LatLng(43.783100, -79.441461),
          new google.maps.LatLng(43.783206, -79.440829),
          new google.maps.LatLng(43.783273, -79.440324),
          new google.maps.LatLng(43.783316, -79.440023),
          new google.maps.LatLng(43.783357, -79.439794),
          new google.maps.LatLng(43.783371, -79.439687),
          new google.maps.LatLng(43.783368, -79.439666),
          new google.maps.LatLng(43.783383, -79.439594),
          new google.maps.LatLng(43.783508, -79.439525),
          new google.maps.LatLng(43.783842, -79.439591),
          new google.maps.LatLng(43.784147, -79.439668),
          new google.maps.LatLng(43.784206, -79.439686),
          new google.maps.LatLng(43.784386, -79.439790),
          new google.maps.LatLng(43.784701, -79.439902),
          new google.maps.LatLng(43.784965, -79.439938),
          new google.maps.LatLng(43.785010, -79.439947),
          new google.maps.LatLng(43.785360, -79.439952),
          new google.maps.LatLng(43.785715, -79.440030),
          new google.maps.LatLng(43.786117, -79.440119),
          new google.maps.LatLng(43.786564, -79.440209),
          new google.maps.LatLng(43.786905, -79.440270),
          new google.maps.LatLng(43.786956, -79.440279),
          new google.maps.LatLng(43.800224, -79.433520),
          new google.maps.LatLng(43.800155, -79.434101),
          new google.maps.LatLng(43.800160, -79.434430),
          new google.maps.LatLng(43.800378, -79.434527),
          new google.maps.LatLng(43.800738, -79.434598),
          new google.maps.LatLng(43.800938, -79.434650),
          new google.maps.LatLng(43.801024, -79.434889),
          new google.maps.LatLng(43.800955, -79.435392),
          new google.maps.LatLng(43.800886, -79.435959),
          new google.maps.LatLng(43.800811, -79.436275),
          new google.maps.LatLng(43.800788, -79.436299),
          new google.maps.LatLng(43.800719, -79.436302),
          new google.maps.LatLng(43.800702, -79.436298),
          new google.maps.LatLng(43.800661, -79.436273),
          new google.maps.LatLng(43.800395, -79.436172),
          new google.maps.LatLng(43.800228, -79.436116),
          new google.maps.LatLng(43.800169, -79.436130),
          new google.maps.LatLng(43.800066, -79.436167),
          new google.maps.LatLng(43.784345, -79.422922),
          new google.maps.LatLng(43.784389, -79.422926),
          new google.maps.LatLng(43.784437, -79.422924),
          new google.maps.LatLng(43.784746, -79.422818),
          new google.maps.LatLng(43.785436, -79.422959),
          new google.maps.LatLng(43.786120, -79.423112),
          new google.maps.LatLng(43.786433, -79.423029),
          new google.maps.LatLng(43.786631, -79.421213),
          new google.maps.LatLng(43.786660, -79.421033),
          new google.maps.LatLng(43.786801, -79.420141),
          new google.maps.LatLng(43.786823, -79.420034),
          new google.maps.LatLng(43.786831, -79.419916),
          new google.maps.LatLng(43.787034, -79.418208),
          new google.maps.LatLng(43.787056, -79.418034),
          new google.maps.LatLng(43.787169, -79.417145),
          new google.maps.LatLng(43.787217, -79.416715),
          new google.maps.LatLng(43.786144, -79.416403),
          new google.maps.LatLng(43.785292, -79.416257),
          new google.maps.LatLng(43.780666, -79.390374),
          new google.maps.LatLng(43.780501, -79.391281),
          new google.maps.LatLng(43.780148, -79.392052),
          new google.maps.LatLng(43.780173, -79.391148),
          new google.maps.LatLng(43.780693, -79.390592),
          new google.maps.LatLng(43.781261, -79.391142),
          new google.maps.LatLng(43.781808, -79.391730),
          new google.maps.LatLng(43.782340, -79.392341),
          new google.maps.LatLng(43.782812, -79.393022),
          new google.maps.LatLng(43.783300, -79.393672),
          new google.maps.LatLng(43.783809, -79.394275),
          new google.maps.LatLng(43.784246, -79.394979),
          new google.maps.LatLng(43.784791, -79.395958),
          new google.maps.LatLng(43.785675, -79.396746),
          new google.maps.LatLng(43.786262, -79.395780),
          new google.maps.LatLng(43.786776, -79.395093),
          new google.maps.LatLng(43.787282, -79.394426),
          new google.maps.LatLng(43.787783, -79.393767),
          new google.maps.LatLng(43.788343, -79.393184),
          new google.maps.LatLng(43.788895, -79.392506),
          new google.maps.LatLng(43.789371, -79.391701),
          new google.maps.LatLng(43.789722, -79.390952),
          new google.maps.LatLng(43.790315, -79.390305),
          new google.maps.LatLng(43.790738, -79.389616),
          new google.maps.LatLng(43.779448, -79.438702),
          new google.maps.LatLng(43.779023, -79.438585),
          new google.maps.LatLng(43.778542, -79.438492),
          new google.maps.LatLng(43.778100, -79.438411),
          new google.maps.LatLng(43.777986, -79.438376),
          new google.maps.LatLng(43.777680, -79.438313),
          new google.maps.LatLng(43.777316, -79.438273),
          new google.maps.LatLng(43.777135, -79.438254),
          new google.maps.LatLng(43.776987, -79.438303),
          new google.maps.LatLng(43.776946, -79.438404),
          new google.maps.LatLng(43.776944, -79.438467),
          new google.maps.LatLng(43.776892, -79.438459),
          new google.maps.LatLng(43.776842, -79.438442),
          new google.maps.LatLng(43.776822, -79.438391),
          new google.maps.LatLng(43.776814, -79.438412),
          new google.maps.LatLng(43.776787, -79.438628),
          new google.maps.LatLng(43.776729, -79.438650),
          new google.maps.LatLng(43.776759, -79.438677),
          new google.maps.LatLng(43.776772, -79.438498),
          new google.maps.LatLng(43.776787, -79.438389),
          new google.maps.LatLng(43.776848, -79.438283),
          new google.maps.LatLng(43.776870, -79.438239),
          new google.maps.LatLng(43.777015, -79.438198),
          new google.maps.LatLng(43.777333, -79.438256),
          new google.maps.LatLng(43.777595, -79.438308),
          new google.maps.LatLng(43.777797, -79.438344),
          new google.maps.LatLng(43.778160, -79.438442),
          new google.maps.LatLng(43.778414, -79.438508),
          new google.maps.LatLng(43.778445, -79.438516),
          new google.maps.LatLng(43.778503, -79.438529),
          new google.maps.LatLng(43.778607, -79.438549),
          new google.maps.LatLng(43.778670, -79.438644),
          new google.maps.LatLng(43.778847, -79.438706),
          new google.maps.LatLng(43.779240, -79.438744),
          new google.maps.LatLng(43.779738, -79.438822),
          new google.maps.LatLng(43.780201, -79.438882),
          new google.maps.LatLng(43.780400, -79.438905),
          new google.maps.LatLng(43.780501, -79.438921),
          new google.maps.LatLng(43.780892, -79.438986),
          new google.maps.LatLng(43.781446, -79.439087),
          new google.maps.LatLng(43.781985, -79.439199),
          new google.maps.LatLng(43.782239, -79.439249),
          new google.maps.LatLng(43.782286, -79.439266),
          new google.maps.LatLng(43.797847, -79.429388),
          new google.maps.LatLng(43.797874, -79.429180),
          new google.maps.LatLng(43.797885, -79.429069),
          new google.maps.LatLng(43.797887, -79.429050),
          new google.maps.LatLng(43.797933, -79.428954),
          new google.maps.LatLng(43.798242, -79.428990),
          new google.maps.LatLng(43.798617, -79.429075),
          new google.maps.LatLng(43.798719, -79.429092),
          new google.maps.LatLng(43.798944, -79.429145),
          new google.maps.LatLng(43.799320, -79.429251),
          new google.maps.LatLng(43.799590, -79.429309),
          new google.maps.LatLng(43.799677, -79.429324),
          new google.maps.LatLng(43.799966, -79.429360),
          new google.maps.LatLng(43.800288, -79.429430),
          new google.maps.LatLng(43.800443, -79.429461),
          new google.maps.LatLng(43.800465, -79.429474),
          new google.maps.LatLng(43.800644, -79.429540),
          new google.maps.LatLng(43.800948, -79.429620),
          new google.maps.LatLng(43.801242, -79.429685),
          new google.maps.LatLng(43.801375, -79.429702),
          new google.maps.LatLng(43.801400, -79.429703),
          new google.maps.LatLng(43.801453, -79.429707),
          new google.maps.LatLng(43.801473, -79.429709),
          new google.maps.LatLng(43.801532, -79.429707),
          new google.maps.LatLng(43.801852, -79.429729),
          new google.maps.LatLng(43.802173, -79.429789),
          new google.maps.LatLng(43.802459, -79.429847),
          new google.maps.LatLng(43.802554, -79.429825),
          new google.maps.LatLng(43.802647, -79.429549),
          new google.maps.LatLng(43.802693, -79.429179),
          new google.maps.LatLng(43.802729, -79.428751),
          new google.maps.LatLng(43.766104, -79.409291),
          new google.maps.LatLng(43.766103, -79.409268),
          new google.maps.LatLng(43.766138, -79.409229),
          new google.maps.LatLng(43.766183, -79.409231),
          new google.maps.LatLng(43.766153, -79.409276),
          new google.maps.LatLng(43.766005, -79.409365),
          new google.maps.LatLng(43.765897, -79.409570),
          new google.maps.LatLng(43.765767, -79.409739),
          new google.maps.LatLng(43.765693, -79.410389),
          new google.maps.LatLng(43.765615, -79.411201),
          new google.maps.LatLng(43.765533, -79.412121),
          new google.maps.LatLng(43.765467, -79.412939),
          new google.maps.LatLng(43.765444, -79.414821),
          new google.maps.LatLng(43.765444, -79.414964),
          new google.maps.LatLng(43.765318, -79.415424),
          new google.maps.LatLng(43.763961, -79.415296),
          new google.maps.LatLng(43.763115, -79.415196),
          new google.maps.LatLng(43.762967, -79.415183),
          new google.maps.LatLng(43.762278, -79.415127),
          new google.maps.LatLng(43.761675, -79.415055),
          new google.maps.LatLng(43.760932, -79.414988),
          new google.maps.LatLng(43.759337, -79.414862),
          new google.maps.LatLng(43.773187, -79.421922),
          new google.maps.LatLng(43.773043, -79.422118),
          new google.maps.LatLng(43.773007, -79.422165),
          new google.maps.LatLng(43.772979, -79.422219),
          new google.maps.LatLng(43.772865, -79.422394),
          new google.maps.LatLng(43.772779, -79.422503),
          new google.maps.LatLng(43.772676, -79.422701),
          new google.maps.LatLng(43.772606, -79.422806),
          new google.maps.LatLng(43.772566, -79.422840),
          new google.maps.LatLng(43.772508, -79.422852),
          new google.maps.LatLng(43.772387, -79.423011),
          new google.maps.LatLng(43.772099, -79.423328),
          new google.maps.LatLng(43.771704, -79.423783),
          new google.maps.LatLng(43.771481, -79.424081),
          new google.maps.LatLng(43.771400, -79.424179),
          new google.maps.LatLng(43.771352, -79.424220),
          new google.maps.LatLng(43.771248, -79.424327),
          new google.maps.LatLng(43.770904, -79.424781),
          new google.maps.LatLng(43.770520, -79.425283),
          new google.maps.LatLng(43.770337, -79.425553),
          new google.maps.LatLng(43.770128, -79.425832),
          new google.maps.LatLng(43.769756, -79.426331),
          new google.maps.LatLng(43.769300, -79.426902),
          new google.maps.LatLng(43.769132, -79.427065),
          new google.maps.LatLng(43.769092, -79.427103),
          new google.maps.LatLng(43.768979, -79.427172),
          new google.maps.LatLng(43.768595, -79.427634),
          new google.maps.LatLng(43.768372, -79.427913),
          new google.maps.LatLng(43.768337, -79.427961),
          new google.maps.LatLng(43.768244, -79.428138),
          new google.maps.LatLng(43.767942, -79.428581),
          new google.maps.LatLng(43.767482, -79.429094),
          new google.maps.LatLng(43.767031, -79.429606),
          new google.maps.LatLng(43.766732, -79.429986),
          new google.maps.LatLng(43.766680, -79.430058),
          new google.maps.LatLng(43.766633, -79.430109),
          new google.maps.LatLng(43.766580, -79.430211),
          new google.maps.LatLng(43.766367, -79.430594),
          new google.maps.LatLng(43.765910, -79.431137),
          new google.maps.LatLng(43.765353, -79.431806),
          new google.maps.LatLng(43.764962, -79.432298),
          new google.maps.LatLng(43.764868, -79.432486),
          new google.maps.LatLng(43.764518, -79.432913),
          new google.maps.LatLng(43.763435, -79.434173),
          new google.maps.LatLng(43.762847, -79.434953),
          new google.maps.LatLng(43.762291, -79.435935),
          new google.maps.LatLng(43.762224, -79.436074),
          new google.maps.LatLng(43.761957, -79.436892),
          new google.maps.LatLng(43.761652, -79.438886),
          new google.maps.LatLng(43.761284, -79.439955),
          new google.maps.LatLng(43.761210, -79.440068),
          new google.maps.LatLng(43.761064, -79.440720),
          new google.maps.LatLng(43.761040, -79.441411),
          new google.maps.LatLng(43.761048, -79.442324),
          new google.maps.LatLng(43.760851, -79.443118),
          new google.maps.LatLng(43.759977, -79.444591),
          new google.maps.LatLng(43.759913, -79.444698),
          new google.maps.LatLng(43.759623, -79.445065),
          new google.maps.LatLng(43.758902, -79.445158),
          new google.maps.LatLng(43.758428, -79.444570),
          new google.maps.LatLng(43.757687, -79.443340),
          new google.maps.LatLng(43.757583, -79.443240),
          new google.maps.LatLng(43.757019, -79.442787),
          new google.maps.LatLng(43.756603, -79.442322),
          new google.maps.LatLng(43.756380, -79.441602),
          new google.maps.LatLng(43.755790, -79.441382),
          new google.maps.LatLng(43.754493, -79.442133),
          new google.maps.LatLng(43.754361, -79.442206),
          new google.maps.LatLng(43.753719, -79.442650),
          new google.maps.LatLng(43.753096, -79.442915),
          new google.maps.LatLng(43.751617, -79.443211),
          new google.maps.LatLng(43.751496, -79.443246),
          new google.maps.LatLng(43.750733, -79.443428),
          new google.maps.LatLng(43.750126, -79.443536),
          new google.maps.LatLng(43.750103, -79.443784),
          new google.maps.LatLng(43.750390, -79.444010),
          new google.maps.LatLng(43.750448, -79.444013),
          new google.maps.LatLng(43.750536, -79.444040),
          new google.maps.LatLng(43.750493, -79.444141),
          new google.maps.LatLng(43.790859, -79.402808),
          new google.maps.LatLng(43.790864, -79.402768),
          new google.maps.LatLng(43.790995, -79.402539),
          new google.maps.LatLng(43.791148, -79.402172),
          new google.maps.LatLng(43.791385, -79.401312),
          new google.maps.LatLng(43.791405, -79.400776),
          new google.maps.LatLng(43.791288, -79.400528),
          new google.maps.LatLng(43.791113, -79.400441),
          new google.maps.LatLng(43.791027, -79.400395),
          new google.maps.LatLng(43.791094, -79.400311),
          new google.maps.LatLng(43.791211, -79.400183),
          new google.maps.LatLng(43.791060, -79.399334),
          new google.maps.LatLng(43.790538, -79.398718),
          new google.maps.LatLng(43.790095, -79.398086),
          new google.maps.LatLng(43.789644, -79.397360),
          new google.maps.LatLng(43.789254, -79.396844),
          new google.maps.LatLng(43.788855, -79.396397),
          new google.maps.LatLng(43.788483, -79.395963),
          new google.maps.LatLng(43.788015, -79.395365),
          new google.maps.LatLng(43.787558, -79.394735),
          new google.maps.LatLng(43.787472, -79.394323),
          new google.maps.LatLng(43.787630, -79.394025),
          new google.maps.LatLng(43.787767, -79.393987),
          new google.maps.LatLng(43.787486, -79.394452),
          new google.maps.LatLng(43.786977, -79.395043),
          new google.maps.LatLng(43.786583, -79.395552),
          new google.maps.LatLng(43.786540, -79.395610),
          new google.maps.LatLng(43.786516, -79.395659),
          new google.maps.LatLng(43.786378, -79.395707),
          new google.maps.LatLng(43.786044, -79.395362),
          new google.maps.LatLng(43.785598, -79.394715),
          new google.maps.LatLng(43.785321, -79.394361),
          new google.maps.LatLng(43.785207, -79.394236),
          new google.maps.LatLng(43.785751, -79.394062),
          new google.maps.LatLng(43.785996, -79.393881),
          new google.maps.LatLng(43.786092, -79.393830),
          new google.maps.LatLng(43.785998, -79.393899),
          new google.maps.LatLng(43.785114, -79.394365),
          new google.maps.LatLng(43.785022, -79.394441),
          new google.maps.LatLng(43.784823, -79.394635),
          new google.maps.LatLng(43.784719, -79.394629),
          new google.maps.LatLng(43.785069, -79.394176),
          new google.maps.LatLng(43.785500, -79.393650),
          new google.maps.LatLng(43.785770, -79.393291),
          new google.maps.LatLng(43.785839, -79.393159),
          new google.maps.LatLng(43.782651, -79.400628),
          new google.maps.LatLng(43.782616, -79.400599),
          new google.maps.LatLng(43.782702, -79.400470),
          new google.maps.LatLng(43.782915, -79.400192),
          new google.maps.LatLng(43.783137, -79.399887),
          new google.maps.LatLng(43.783414, -79.399519),
          new google.maps.LatLng(43.783629, -79.399237),
          new google.maps.LatLng(43.783688, -79.399157),
          new google.maps.LatLng(43.783716, -79.399106),
          new google.maps.LatLng(43.783798, -79.399072),
          new google.maps.LatLng(43.783997, -79.399186),
          new google.maps.LatLng(43.784271, -79.399538),
          new google.maps.LatLng(43.784577, -79.399948),
          new google.maps.LatLng(43.784828, -79.400260),
          new google.maps.LatLng(43.784999, -79.400477),
          new google.maps.LatLng(43.785113, -79.400651),
          new google.maps.LatLng(43.785155, -79.400703),
          new google.maps.LatLng(43.785192, -79.400749),
          new google.maps.LatLng(43.785278, -79.400839),
          new google.maps.LatLng(43.785387, -79.400857),
          new google.maps.LatLng(43.785478, -79.400890),
          new google.maps.LatLng(43.785526, -79.401022),
          new google.maps.LatLng(43.785598, -79.401148),
          new google.maps.LatLng(43.785631, -79.401202),
          new google.maps.LatLng(43.785660, -79.401267),
          new google.maps.LatLng(43.803986, -79.426035),
          new google.maps.LatLng(43.804102, -79.425089),
          new google.maps.LatLng(43.804211, -79.424156),
          new google.maps.LatLng(43.803861, -79.423385),
          new google.maps.LatLng(43.803151, -79.423214),
          new google.maps.LatLng(43.802439, -79.423077),
          new google.maps.LatLng(43.801740, -79.422905),
          new google.maps.LatLng(43.801069, -79.422785),
          new google.maps.LatLng(43.800345, -79.422649),
          new google.maps.LatLng(43.799633, -79.422603),
          new google.maps.LatLng(43.799750, -79.421700),
          new google.maps.LatLng(43.799885, -79.420854),
          new google.maps.LatLng(43.799209, -79.420607),
          new google.maps.LatLng(43.795656, -79.400395),
          new google.maps.LatLng(43.795203, -79.400304),
          new google.maps.LatLng(43.778738, -79.415584),
          new google.maps.LatLng(43.778812, -79.415189),
          new google.maps.LatLng(43.778824, -79.415092),
          new google.maps.LatLng(43.778833, -79.414932),
          new google.maps.LatLng(43.778834, -79.414898),
          new google.maps.LatLng(43.778740, -79.414757),
          new google.maps.LatLng(43.778501, -79.414433),
          new google.maps.LatLng(43.778182, -79.414026),
          new google.maps.LatLng(43.777851, -79.413623),
          new google.maps.LatLng(43.777486, -79.413166),
          new google.maps.LatLng(43.777109, -79.412674),
          new google.maps.LatLng(43.776743, -79.412186),
          new google.maps.LatLng(43.776440, -79.411800),
          new google.maps.LatLng(43.776295, -79.411614),
          new google.maps.LatLng(43.776158, -79.411440),
          new google.maps.LatLng(43.775806, -79.410997),
          new google.maps.LatLng(43.775422, -79.410484),
          new google.maps.LatLng(43.775126, -79.410087),
          new google.maps.LatLng(43.775012, -79.409854),
          new google.maps.LatLng(43.775164, -79.409573),
          new google.maps.LatLng(43.775498, -79.409180),
          new google.maps.LatLng(43.775868, -79.408730),
          new google.maps.LatLng(43.776256, -79.408240),
          new google.maps.LatLng(43.776519, -79.407928),
          new google.maps.LatLng(43.776539, -79.407904),
          new google.maps.LatLng(43.776595, -79.407854),
          new google.maps.LatLng(43.776853, -79.407547),
          new google.maps.LatLng(43.777234, -79.407087),
          new google.maps.LatLng(43.777644, -79.406558),
          new google.maps.LatLng(43.778066, -79.406017),
          new google.maps.LatLng(43.778468, -79.405499),
          new google.maps.LatLng(43.778866, -79.404995),
          new google.maps.LatLng(43.779295, -79.404455),
          new google.maps.LatLng(43.779695, -79.403950),
          new google.maps.LatLng(43.779982, -79.403584),
          new google.maps.LatLng(43.780295, -79.403223),
          new google.maps.LatLng(43.780664, -79.402766),
          new google.maps.LatLng(43.781043, -79.402288),
          new google.maps.LatLng(43.781399, -79.401823),
          new google.maps.LatLng(43.781727, -79.401407),
          new google.maps.LatLng(43.781853, -79.401247),
          new google.maps.LatLng(43.781894, -79.401195),
          new google.maps.LatLng(43.782076, -79.400977),
          new google.maps.LatLng(43.782338, -79.400603),
          new google.maps.LatLng(43.782666, -79.400133),
          new google.maps.LatLng(43.783048, -79.399634),
          new google.maps.LatLng(43.783450, -79.399198),
          new google.maps.LatLng(43.783791, -79.398998),
          new google.maps.LatLng(43.784177, -79.398959),
          new google.maps.LatLng(43.784388, -79.398971),
          new google.maps.LatLng(43.784404, -79.399128),
          new google.maps.LatLng(43.784586, -79.399524),
          new google.maps.LatLng(43.784835, -79.399927),
          new google.maps.LatLng(43.785116, -79.400307),
          new google.maps.LatLng(43.785282, -79.400539),
          new google.maps.LatLng(43.785346, -79.400692),
          new google.maps.LatLng(43.765769, -79.407201),
          new google.maps.LatLng(43.765790, -79.407414),
          new google.maps.LatLng(43.765802, -79.407755),
          new google.maps.LatLng(43.765791, -79.408219),
          new google.maps.LatLng(43.765763, -79.408759),
          new google.maps.LatLng(43.765726, -79.409348),
          new google.maps.LatLng(43.765716, -79.409882),
          new google.maps.LatLng(43.765708, -79.410202),
          new google.maps.LatLng(43.765705, -79.410253),
          new google.maps.LatLng(43.765707, -79.410369),
          new google.maps.LatLng(43.765692, -79.410720),
          new google.maps.LatLng(43.765699, -79.411215),
          new google.maps.LatLng(43.765687, -79.411789),
          new google.maps.LatLng(43.765666, -79.412373),
          new google.maps.LatLng(43.765598, -79.412883),
          new google.maps.LatLng(43.765543, -79.413039),
          new google.maps.LatLng(43.765532, -79.413125),
          new google.maps.LatLng(43.765500, -79.413553),
          new google.maps.LatLng(43.765448, -79.414053),
          new google.maps.LatLng(43.765388, -79.414645),
          new google.maps.LatLng(43.765323, -79.415250),
          new google.maps.LatLng(43.765303, -79.415847),
          new google.maps.LatLng(43.765251, -79.416439),
          new google.maps.LatLng(43.765204, -79.417020),
          new google.maps.LatLng(43.765172, -79.417556),
          new google.maps.LatLng(43.765164, -79.418075),
          new google.maps.LatLng(43.765153, -79.418618),
          new google.maps.LatLng(43.765136, -79.419112),
          new google.maps.LatLng(43.765129, -79.419378),
          new google.maps.LatLng(43.765119, -79.419481),
          new google.maps.LatLng(43.765100, -79.419852),
          new google.maps.LatLng(43.765083, -79.420349),
          new google.maps.LatLng(43.765045, -79.420930),
          new google.maps.LatLng(43.764992, -79.421481),
          new google.maps.LatLng(43.764980, -79.421695),
          new google.maps.LatLng(43.764993, -79.421843),
          new google.maps.LatLng(43.764986, -79.422255),
          new google.maps.LatLng(43.764975, -79.422823),
          new google.maps.LatLng(43.764939, -79.423411),
          new google.maps.LatLng(43.764902, -79.424014),
          new google.maps.LatLng(43.764853, -79.424576),
          new google.maps.LatLng(43.764826, -79.424922),
          new google.maps.LatLng(43.764796, -79.425375),
          new google.maps.LatLng(43.764782, -79.425869),
          new google.maps.LatLng(43.764768, -79.426089),
          new google.maps.LatLng(43.764766, -79.426117),
          new google.maps.LatLng(43.764723, -79.426276),
          new google.maps.LatLng(43.764681, -79.426649),
          new google.maps.LatLng(43.782012, -79.404200),
          new google.maps.LatLng(43.781574, -79.404911),
          new google.maps.LatLng(43.781055, -79.405597),
          new google.maps.LatLng(43.780479, -79.406341),
          new google.maps.LatLng(43.779996, -79.406939),
          new google.maps.LatLng(43.779459, -79.407613),
          new google.maps.LatLng(43.778953, -79.408228),
          new google.maps.LatLng(43.778409, -79.408839),
          new google.maps.LatLng(43.777842, -79.409501),
          new google.maps.LatLng(43.777334, -79.410181),
          new google.maps.LatLng(43.776809, -79.410836),
          new google.maps.LatLng(43.776240, -79.411514),
          new google.maps.LatLng(43.775725, -79.412145),
          new google.maps.LatLng(43.775190, -79.412805),
          new google.maps.LatLng(43.774672, -79.413464),
          new google.maps.LatLng(43.774084, -79.414186),
          new google.maps.LatLng(43.773533, -79.413636),
          new google.maps.LatLng(43.773021, -79.413009),
          new google.maps.LatLng(43.772501, -79.412371),
          new google.maps.LatLng(43.771964, -79.411681),
          new google.maps.LatLng(43.771479, -79.411078),
          new google.maps.LatLng(43.770992, -79.410477),
          new google.maps.LatLng(43.770467, -79.409801),
          new google.maps.LatLng(43.770090, -79.408904),
          new google.maps.LatLng(43.769657, -79.408103),
          new google.maps.LatLng(43.769132, -79.407276),
          new google.maps.LatLng(43.768564, -79.406469),
          new google.maps.LatLng(43.767980, -79.405745),
          new google.maps.LatLng(43.767380, -79.405299),
          new google.maps.LatLng(43.766604, -79.405297),
          new google.maps.LatLng(43.765838, -79.405200),
          new google.maps.LatLng(43.765139, -79.405139),
          new google.maps.LatLng(43.764457, -79.405094),
          new google.maps.LatLng(43.763716, -79.405142),
          new google.maps.LatLng(43.762932, -79.405398),
          new google.maps.LatLng(43.762126, -79.405813),
          new google.maps.LatLng(43.761344, -79.406215),
          new google.maps.LatLng(43.760556, -79.406495),
          new google.maps.LatLng(43.759732, -79.406484),
          new google.maps.LatLng(43.758910, -79.406228),
          new google.maps.LatLng(43.758182, -79.405695),
          new google.maps.LatLng(43.757676, -79.405118),
          new google.maps.LatLng(43.757039, -79.404346),
          new google.maps.LatLng(43.756335, -79.403719),
          new google.maps.LatLng(43.755503, -79.403406),
          new google.maps.LatLng(43.754665, -79.403242),
          new google.maps.LatLng(43.753837, -79.403172),
          new google.maps.LatLng(43.752986, -79.403112),
          new google.maps.LatLng(43.751266, -79.403355)
        ];
      }