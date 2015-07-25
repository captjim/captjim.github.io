---
---

var array = [
  "My policy on cake is pro having it and pro eating it.","I'm a one-nation Tory.",
  "Too full of drugs, obesity,  underachievement and Labour MPs.","He's a rather engaging geezer",
  "I've slept with far fewer than 1,000","No one obeys the speed limit except a motorised rickshaw.",
  "What has the BBC come to? Toilets, that's what","Exams work because they're scary",
  "A horse is a safer bet than the trains","Face it: it's all your own fat fault"
];

var number;
var type;
var xml;
var autoUpdateBool = false;

$(document).ready(function(){
  document.title = '"' + array[Math.floor(Math.random()*array.length)] + '"';
})

function indexOfSmallest(a) {
  var lowest = 0;
  for (var i = 1; i < a.length; i++) {
    if (a[i][0] < a[lowest][0]) { lowest = i; }
  }
  return a[lowest][1];
}

function error(error) {
  alert("Unable to retrieve your location due to " + error.code + " : " + error.message);
};

function getBoris(event) {
  $('#spinner').addClass('spin');
  number = event.target.dataset.number || 0
  type = event.target.className

  $.ajax({
    type: "GET",
    dataType: "XML",
    url: "https://tfl.gov.uk/tfl/syndication/feeds/cycle-hire/livecyclehireupdates.xml",
  }).success(function(res) {
    xml = res;
    geoFindMe();
  });
}

function autoUpdate () {
  if (number && type && !autoUpdateBool) {
    autoUpdateBool = true;
    $('.auto-update').html('Turn auto update off')
    autoInterval = setInterval(function(){
      geoFindMe();
    }, 30000)
  }
  else {
    clearInterval(autoInterval);
    autoUpdateBool = false;
    $('.auto-update').html('Auto update my selection')
  }
}

function geoFindMe(){
  navigator.geolocation.getCurrentPosition(success, error, geo_options);

  function success(position) {
    console.log('found me')
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var altitude = position.coords.altitude;
    var accuracy = position.coords.accuracy;

    getClosest(latitude, longitude);
  }

  function getClosest(latitude, longitude){
    var stations = xml.getElementsByTagName('station');
    var length   = stations.length;
    var array    = [];

    for (i=0; i<length; i++){

      var nbBikes      = parseInt(stations[i].getElementsByTagName('nbBikes')[0].childNodes[0].textContent);
      var nbEmptyDocks = parseInt(stations[i].getElementsByTagName('nbEmptyDocks')[0].childNodes[0].textContent);
      var lat          = parseFloat(stations[i].getElementsByTagName('lat')[0].childNodes[0].textContent);
      var long         = parseFloat(stations[i].getElementsByTagName('long')[0].childNodes[0].textContent);
      var dSquared     = Math.pow((latitude - lat), 2) + Math.pow((longitude - long), 2);
      var id           = i;

      if ((type == "bikes") && (nbBikes > number)){ array.push([dSquared,id]); }
      else if ((type == "spaces") && (nbEmptyDocks > number)){ array.push([dSquared,id]); }

    }

    if (type == "random") {
      for (i=0; i<length; i++){ array.push(i) }
      id = array[Math.floor(Math.random()*array.length)];
      lat  = parseFloat(stations[id].getElementsByTagName('lat')[0].childNodes[0].textContent);
      long = parseFloat(stations[id].getElementsByTagName('long')[0].childNodes[0].textContent);
      initialize(latitude, longitude, lat, long);
      return
    }

    id   = indexOfSmallest(array);
    lat  = parseFloat(stations[id].getElementsByTagName('lat')[0].childNodes[0].textContent);
    long = parseFloat(stations[id].getElementsByTagName('long')[0].childNodes[0].textContent);
    initialize(latitude, longitude, lat, long);
  }

  var geo_options = {
    enableHighAccuracy: true,
    maximumAge : 30000,
    timeout : 27000
  };
}

var map;
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = [];

function initialize(latitude, longitude, lat, long) {
  directionsService = new google.maps.DirectionsService();
  var manhattan = new google.maps.LatLng(latitude, longitude);
  var mapOptions = {
    zoom: 15,
    center: manhattan
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var rendererOptions = {
    map: map
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
  stepDisplay = new google.maps.InfoWindow();
  calcRoute(latitude, longitude, lat, long);
}

function calcRoute(latitude, longitude, lat, long) {
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  markerArray = [];
  var start = latitude + "," + longitude;
  var end = lat + "," + long;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      var warnings = document.getElementById('warnings_panel');
      warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response);
    }
  });
}

function showSteps(directionResult) {
  var myRoute = directionResult.routes[0].legs[0];

  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = new google.maps.Marker({
      position: myRoute.steps[i].start_location,
      map: map
    });
    attachInstructionText(marker, myRoute.steps[i].instructions);
    markerArray[i] = marker;
  }
  $('#spinner').removeClass('spin')
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}
