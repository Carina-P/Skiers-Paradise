function initMap(){
    let map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
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
    let places = [
        {
            name: "Val Thorens",
            info: "Europe's highest situated ski resort and part of the world's largest contiguous ski area, les Trois Vallées",
            position: {lat: 45.297309, lng: 6.579732},
            altitudeB: "2 300 m",
            altitudeT: "3 230 m",
            pists: "335 /600 km",
            nrLifts: 183
        },
        {
            name: "Verbier",
            info: "A giant ski area that delivers some of the world's best off-piste skiing in combination with luxury and flair in a cosmopolitan mountain village.",
            position: {lat: 46.096081, lng: 7.228551},
            altitudeB: "1 503 m",
            altitudeT: "3 330 m" ,
            pists: "412 km",
            nrLifts: 67,
            newsnow: "20 cm",
            lastsnow: "19/05/2020",
            conditions: "Great ski conditions",
            runs_open: 25,
            date: "19/08/2020",
            time1: "07:00",
            temp_avg1: 10,
            windspeed_avg1: 3,
            weather1: "Partly cloudy",
            weather_icon1: "PartlyCloudyDay.gif",
            time2: "13:00",
            temp_avg2: 10,
            windspeed_avg2: 3,
            weather2: "Sunny",
            weather_icon2: "Sunny.gif",
            time3: "19:00",
            temp_avg3: 10,
            windspeed_avg3: 3,
            weather3: "Partly cloudy",
            weather_icon3: "PartlyCloudyNight.gif"
        }
    ];
    
    /* Val Thorens */
    $.when(
        $.getJSON("https://api.weatherunlocked.com/api/snowreport/333020?app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859"),
        $.getJSON("https://api.weatherunlocked.com/api/resortforecast/333020?hourly_interval=6&app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859")
    ).then( function(snowreport, weather){
            places[0].newsnow = snowreport[0].newsnow_cm;
            places[0].lastsnow = snowreport[0].lastsnow;
            places[0].conditions = snowreport[0].conditions;
            places[0].runs_open = snowreport[0].pctopen;
            places[0].date = weather[0].forecast[1].date;
            places[0].time1 = weather[0].forecast[1].time;
            places[0].temp_avg1 = weather[0].forecast[1].upper.temp_avg_c;
            places[0].windspeed_avg1 = weather[0].forecast[1].upper.windspd_avg_ms;
            places[0].weather1 = weather[0].forecast[1].upper.wx_desc;
            places[0].weather_icon1 = weather[0].forecast[1].upper.wx_icon;
            places[0].time2 = weather[0].forecast[2].time;
            places[0].temp_avg2 = weather[0].forecast[2].upper.temp_avg_c;
            places[0].windspeed_avg2 = weather[0].forecast[2].upper.windspd_avg_ms;
            places[0].weather2 = weather[0].forecast[2].upper.wx_desc;
            places[0].weather_icon2 = weather[0].forecast[2].upper.wx_icon;
            places[0].time3 = weather[0].forecast[3].time;
            places[0].temp_avg3 = weather[0].forecast[3].upper.temp_avg_c;
            places[0].windspeed_avg3 = weather[0].forecast[3].upper.windspd_avg_ms;
            places[0].weather3 = weather[0].forecast[3].upper.wx_desc;
            places[0].weather_icon3 = weather[0].forecast[3].upper.wx_icon;
            console.log(weather);
        },
        function(error){
            console.log(error);
        }
    );

    return places;
}

function fetchInfo(place){
    return `<h2>${place.name}</h2>
        <p>${place.info}</p>
        <div>
            <h3>Forecast at top</h3>
            ${place.date}
            <div class = "flex-container">
                <div class = "forecast"> 
                    ${place.time1}<br>
                    <img src="assets/img/weather/${place.weather_icon1}"> <br>
                    ${place.temp_avg1}&#8451<br>
                    ${place.windspeed_avg1}m/s
                </div>   
                <div class ="forecast"> 
                    ${place.time2}<br>
                    <img src="assets/img/weather/${place.weather_icon2}"> <br>
                    ${place.temp_avg2}&#8451<br>
                    ${place.windspeed_avg2}m/s    
                </div> 
                <div class = "forecast"> 
                    ${place.time3}<br>
                    <img src="assets/img/weather/${place.weather_icon3}"> <br>
                    ${place.temp_avg3}&#8451<br>
                    ${place.windspeed_avg3}m/s
                </div>   
            </div>
        </div>
        <div>
            <h3>Snow Report</h3>
            <p><small>New snow:</small> ${place.newsnow}<br>
            <small>Last snow:</small> ${place.lastsnow}<br>
            <small>Runs open:</small> ${place.runs_open}%<br>
            <small>Snow report:</small> ${place.conditions} </p>
        </div>
        <div><br><a href="https://www.valthorens.com/en/" target="_blank">More info</a></div>`;
}

function buildMarkers(map){
    let markers = [];

    let places = buildPlaces();

    places.forEach(function(place){
        console.log(place.position);
        var windowContent = "<p><strong>" + place.name + "</strong><br> Altitude base: " +
        place.altitudeB + "<br>Altitude top: " + place.altitudeT +"<br>Slopes: " + place.pists +
        "<br>Number of lifts: " + place.nrLifts + "</p>";

        var infoWindow = new google.maps.InfoWindow({content: windowContent});
    
        var marker = new google.maps.Marker({position: place.position, map: map, icon:"assets/img/yellow-marker48.gif"});
        marker.addListener("click", function(){
            infoWindow.open(map, marker);
            $("#place-txt").css("background-color","#ffffff");
            $("#place-txt").html(fetchInfo(place));
        });
    
        markers.push(marker);
    })
    

    return markers;
}