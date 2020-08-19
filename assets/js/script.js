function initMap(){
    let map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 46.619261, lng: -33.134766}
        }
    );
/*
    var locations = [
        {lat: 45.297309, lng: 6.579732},
        {lat: 45.448034, lng: 6.980226},
        {lat: 45.923697, lng: 6.869433},
        {lat: 47.129635, lng: 10.268179},
        {lat: 47.114089, lng: 13.132661},
        {lat: 46.020713, lng: 7.749117},
        {lat: 46.096081, lng: 7.228551},
        {lat: 47.421066, lng: 10.985365},
        {lat: 46.410212, lng: 11.844035},
        {lat: 63.399043, lng: 13.081506}
    ]

    let markers = locations.map(function(location, i) {
          return new google.maps.Marker({ position: location, icon:"assets/img/yellow-marker48.gif"});
        });
  */      
    let markerCluster = new MarkerClusterer(map, buildMarkers(map), {imagePath: 'assets/img/m'});
    
}

function buildPlaces(){
    let places =[
        {
            name: "Val Thorens",
            position : {lat: 45.297309, lng: 6.579732},
            altitudeB: "2 300 m",
            altitudeT: "3 230 m",
            pists: "335 /600 km",
            nrLifts: 183
        },
        {
            name: "Verbier",
            position : {lat: 46.096081, lng: 7.228551},
            altitudeB: 1503,
            altitudeT: 3330 ,
            pists: "412 km",
            nrLifts: 67
        }
    ];

    return places;
}

function fetchInfo(place){
    return `<h2>Val Thorens</h2>
        <p>Europe's highest situated ski resort and part of the world's largest contiguous ski area, "les Trois Vallées".</p>
        <h3>Snow Report</h3>
        <p><small>New snow:</small> 4 cm<br>
        <small>Last snow:</small> 19/05/2020<br>
        <small>Runs open:</small> 50%<br>
        <small>Snow report:</small> Closed for snowsports </p>
        <h3>Forecast at top</h3>
        <div class = "flex-container">
            <div class = "forecast"> 
                10:00<br>
                <img src="assets/img/weather/Sunny.gif"> <br>
                -3&#8451<br>
                3 m/s
            </div>   
            <div class ="forecast"> 
                14:00<br>
                <img src="assets/img/weather/Sunny.gif"> <br>
                0&#8451<br>
                6 m/s
            </div>   
        </div>
        <div><br><a href="https://www.valthorens.com/en/ target=_blank"">More info</a></div>`;
}

function buildMarkers(map){
    let markers = [];

    let places = buildPlaces();

    places.forEach(function(place){
        var windowContent = "<p><strong>" + place.name + "</strong><br> Altitude base: " +
        place.altitudeB + "<br>Altitude top: " + place.altitudeT +"<br>Slopes: " + place.pists +
        "<br>Number of lifts: " + place.nrLifts + "</p>";

        var infoWindow = new google.maps.InfoWindow({content: windowContent});
    
        var marker = new google.maps.Marker({position: place.position ,icon:"assets/img/yellow-marker48.gif"});
        marker.addListener("click", function(){
            infoWindow.open(map, marker);
            $("#place-txt").css("background-color","#ffffff");
            $("#place-txt").html(fetchInfo(place));
        });
    
        markers.push(marker);
    })
    

    return markers;
}