var url = "http://10.3.121.243:3333/api/v1/geolocation";
var marker_colors = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red",
  4: "purple",
  5: "blue"
};

async function fetch_data_api(url) {
  var data_json = (await fetch(url)).json();
  var coords = await data_json;
  return coords;
}

async function initMap() {
  // DOM envs
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
    // mapTypeId: "satellite",
    styles: black_theme
  });
  var infoWindow = new google.maps.InfoWindow();
  var geocoder = new google.maps.Geocoder();
  var heatmap_data = [];
  var input = document.getElementById("search-box");
  var search_box = new google.maps.places.SearchBox(input);
  var data_coordinates;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // DEBUG      =============
        geocoder.geocode({ latLng: pos }, function(results, status) {
          json_address_info = results[0].address_components;
        });
        // END DEBUG  =============

        infoWindow.setPosition(pos);
        var marker = new google.maps.Marker({
          position: pos,
          map: map
        });
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var data_coordinates = await fetch_data_api(url);
  var markers = [],
    info_windows = [];
  for (let i = 0; i < 100; i++) {
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += marker_colors[i % 6] + "-dot.png";
    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(
        data_coordinates[i].latitude,
        data_coordinates[i].longitude
      ),
      map: map,
      icon: {
        url: url
      }
      // label: atributo_tabela
    });
    info_windows[i] = new google.maps.InfoWindow({
      content:
        '<div class="container">\
      <div class="title center-align">Titulo</div>\
      <hr />\
      <div class="row">\
        <div class="col-s12">BLA1: ...</div>\
        <div class="col-s12">BLA2: ...</div>\
        <div class="col-s12">BLA3: ...</div>\
      </div>\
    </div>'
    });

    markers[i].addListener("click", function() {
      info_windows[i].open(map, markers[i]);
    });
  }

  // heatmap
  // var heatmap = new google.maps.visualization.HeatmapLayer({
  //   data: wind_points
  // });
  // heatmap.setMap(map);

  // listeners
  map.addListener("click", function() {});
  map.addListener("bounds_changed", function() {
    search_box.setBounds(map.getBounds());
  });
  google.maps.event.addListener(search_box, "places_changed", function() {
    search_box.set("map", null);
    var places = search_box.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;
    for (i = 0; (place = places[i]); i++) {
      (function(place) {
        var marker = new google.maps.Marker({
          position: place.geometry.location
        });
        marker.bindTo("map", search_box, "map");
        google.maps.event.addListener(marker, "map_changed", function() {
          if (!this.getMap()) {
            this.unbindAll();
          }
        });
        bounds.extend(place.geometry.location);
      })(place);
    }
    map.fitBounds(bounds);
    search_box.set("map", map);
    map.setZoom(Math.min(map.getZoom(), 12));
    google.maps.event.addListener(marker, "click", function() {
      if (infoWindow) {
        infoWindow.close();
      }
      infoWindow = new google.maps.InfoWindow({ content: "dasdasd" });
      infoWindow.open(map, marker);
    });
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}
