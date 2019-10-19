// This example creates circles on the map, representing populations in North
// America.

// First, create an object containing LatLng and population for each city.

/**
 * Creating circles on the map
 * This is necessary to alert the people to risks in this space
 */
var risk_points = {
  chicago: {
    center: { lat: 41.878, lng: -87.629 },
    population: 2714856
  },
  newyork: {
    center: { lat: 40.714, lng: -74.005 },
    population: 8405837
  },
  losangeles: {
    center: { lat: 34.052, lng: -118.243 },
    population: 3857799
  },
  vancouver: {
    center: { lat: 49.25, lng: -123.1 },
    population: 603502
  }
};

var fire_points = [
  [67.65984, 60.50636, 0],
  [64.64563000000001, 24.42389, 1],
  [64.64875, 24.42684, 2],
  [65.56, 22.221320000000002, 3],
  [65.56195, 22.23214, 4]
];

function initMap() {
  // default position
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 37.09, lng: -95.712 },
    mapTypeId: "satellite"
  });
  var infowindow = new google.maps.InfoWindow({});

  // centering map based in the actual location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infowindow.setPosition(pos);
        infowindow.setContent("Location here!");
        infowindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infowindow, map.getCenter());
      }
    );
  } else {
    // the browser not support geolocation
    handleLocationError(false, infowindow, map.getCenter());
  }

  var marker, i;

  for (i = 0; i < fire_points.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(fire_points[i][1], fire_points[i][2]),
      map: map
    });

    google.maps.event.addListener(
      marker,
      "click",
      (function(marker, i) {
        return function() {
          infowindow.setContent(fire_points[i][0]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }

  // Construct the circle for each value in risk_points.
  // Note: We scale the area of the circle based on the population.
  for (var city in risk_points) {
    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map,
      center: risk_points[city].center,
      radius: Math.sqrt(risk_points[city].population) * 100
    });
  }
}

/**
 * Function to handle location
 * @param {*} browserHasGeolocation
 * @param {*} infoWindow
 * @param {*} pos
 */
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
