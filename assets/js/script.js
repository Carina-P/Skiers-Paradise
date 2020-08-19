function initMap(){
    let map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 46.619261, lng: -33.134766}
        }
    );

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
        
    let markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/img/m'});
    
}