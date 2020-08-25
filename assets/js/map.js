let map;

function infoWindowToHTML(resort){
    return `<p><strong>${resort.name}</strong><br> Altitude base:
                    ${resort.altitudeB}<br>Altitude top:${resort.altitudeT}<br>Slopes: ${resort.pists}
                    <br>Number of lifts: ${resort.nrLifts} </p>`;
}
function txtToHTML(resort){
    return `<h2>${resort.name}</h2>
            <p>${resort.info}</p>`;
}
 
function buildMarker(resort){  
     
    let infoWindow = new google.maps.InfoWindow({content: infoWindowToHTML(resort)});
            
    let marker = new google.maps.Marker({position: resort.position, icon:"assets/img/yellow-marker48.gif"});
            
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
        $("#place-txt").css("background-color","#ffffff");
        $("#place-txt").html(txtToHTML(resort));
    });
    return marker;
}

function getResortInfo(resort) {
    
    if(resort.id == 333020){
        fetch(`https://api.weatherunlocked.com/api/snowreport/${resort.id}?app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`)
        .then((snowRes) => {
            if (!snowRes.ok){
                throw new Error("Something is wrong fetching snowreport");
            }
            return snowRes.json();
        })
        .then ((snowReport) => {
            resort.snowReport = snowReport;
            return (fetch(`https://api.weatherunlocked.com/api/resortforecast/${resort.id}?hourly_interval=6&app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`))
        })
        .then( (weatherRes) => {
            if (!weatherRes.ok){
                throw new Error("Something is wrong fetching weather forecast");
            }
            return weatherRes.json();
        })
        .then ((weather) => {
            resort.forecast = weather.forecast;
        })
        .catch((error) => {console.error("error: ", error) });
    }
    
    return buildMarker(resort);
} 

function makeMarkersCluster(){ 
    fetch("assets/data/resorts.json")
    .then((res) => {
        if (!res.ok){
            throw new Error("Something went wrong when fetching resorts");
        }
        return res.json();
    })
    .then((resorts) => {
        return Promise.all( resorts.map( getResortInfo));
    }) 
    .then ((markers) => {
        new MarkerClusterer(map, markers, {imagePath: 'assets/img/m'});
    }) 
    .catch((error) => console.error("Error:", error))
}


function initMap(){
    
    map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
        }
    );
    makeMarkersCluster();
}