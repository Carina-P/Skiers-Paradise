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
    let markerCluster = new MarkerClusterer(map, getMarkers(map), {imagePath: 'assets/img/m'});
    
}

function getResortsInfo(){
    /*
    let places = {
        valThorens : {
            name: "Val Thorens",
            info: "Europe's highest situated ski resort and part of the world's largest contiguous ski area, les Trois Vallées",
            position: {lat: 45.297309, lng: 6.579732},
            altitudeB: "2 300 m",
            altitudeT: "3 230 m",
            pists: "335 /600 km",
            nrLifts: 183
            },
        Verbier : {
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
    };
    */
    let resorts = [];
     
    $.getJSON("assets/data/resorts.json")
    .then( function (data){
            data.forEach( function(resort){
                if(resort.id == 333020){
                    $.when(
                        $.getJSON(`https://api.weatherunlocked.com/api/snowreport/${resort.id}?app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`),
                        $.getJSON(`https://api.weatherunlocked.com/api/resortforecast/${resort.id}?hourly_interval=6&app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`))
                    .then( function(snowreport, weather) {
                            resort.snowreport = snowreport[0];
                            resort.weather = weather[0];
                            resorts.push(
                                {
                                    positon : resort.position,
                                    infoHTML : resortInfoToHTML(resort)
                                }
                            );
                            console.log(resorts.length + "push Val Thorens")
                            /*places.ValThorens.snowreport = snowreport[0];
                            places.valThorens.weather = weather[0].forecast;
                            places.valThorens.newsnow = snowreport[0].newsnow_cm;
                            places.valThorens.lastsnow = snowreport[0].lastsnow;
                            places.conditions = snowreport[0].conditions;
                            places.valThorens.conditions = snowreport[0].conditions;
                            places.valThorens.runs_open = snowreport[0].pctopen;
                            places.valThorens.date = weather[0].forecast[1].date;
                            places.valThorens.time1 = weather[0].forecast[1].time;
                            places.valThorens.temp_avg1 = weather[0].forecast[1].upper.temp_avg_c;
                            places.valThorens.windspeed_avg1 = weather[0].forecast[1].upper.windspd_avg_ms;
                            places.valThorens.weather1 = weather[0].forecast[1].upper.wx_desc;
                            places.valThorens.weather_icon1 = weather[0].forecast[1].upper.wx_icon;
                            places.valThorens.time2 = weather[0].forecast[2].time;
                            places.valThorens.temp_avg2 = weather[0].forecast[2].upper.temp_avg_c;
                            places.valThorens.windspeed_avg2 = weather[0].forecast[2].upper.windspd_avg_ms;
                            places.valThorens.weather2 = weather[0].forecast[2].upper.wx_desc;
                            places.valThorens.weather_icon2 = weather[0].forecast[2].upper.wx_icon;
                            places.valThorens.time3 = weather[0].forecast[3].time;
                            places.valThorens.temp_avg3 = weather[0].forecast[3].upper.temp_avg_c;
                            places.valThorens.windspeed_avg3 = weather[0].forecast[3].upper.windspd_avg_ms;
                            places.valThorens.weather3 = weather[0].forecast[3].upper.wx_desc;
                            places.valThorens.weather_icon3 = weather[0].forecast[3].upper.wx_icon;
                            */
                        },
                        function(error){
                            console.log(error);
                        }
                    );
                }
                else{
                    resorts.push(
                        {
                            positon : resort.position,
                            infoHTML : resortInfoToHTML(resort)
                        }
                    );
                }
            });
        },
        function(error){
            console.log(error);
        }
    );

    return resorts;
}


function resortInfoToHTML(resort){
    
    return { windowContent : `<p><strong>${resort.name}</strong><br> Altitude base:
                ${resort.altitudeB}<br>Altitude top:${resort.altitudeT}<br>Slopes: ${resort.pists}
                <br>Number of lifts: ${resort.nrLifts} </p>`,
            txtContent :    `<h2>${resort.name}</h2>
                            <p>${resort.info}</p>`
            }; 
    /*
        <div>
            <h3>Forecast at top</h3>
            ${resort.date}
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
        */
}

function getMarkers(map){
    let markers = [];

    let resorts = getResortsInfo();
    console.log(resorts.length +"getMarkers");

    resorts.forEach(function(resort){
        var infoWindow = new google.maps.InfoWindow({content: resort.infoHTML.windowContent});
        console.log("windowContnet" + resort.infoHTML.windowContent);
        var marker = new google.maps.Marker({position: resort.position, map: map, icon:"assets/img/yellow-marker48.gif"});
   
        marker.addListener("click", function(){
            infoWindow.open(map, marker);
            $("#place-txt").css("background-color","#ffffff");
            $("#place-txt").html(resort.infoHTML.txtContent);
            console.log("txtContent" + resort.infoHTML.txtContent);
        });
    
        markers.push(marker);

    });
    /*
    Object.values(places).forEach(function(place){ 
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
    */
    return markers;
}