var url = "http://10.3.121.243:3333/api/v1/geolocation";

async function fetch_data_api(url) {
  var data_json = (await fetch(url)).json();
  var coords = await data_json;
  return coords;
}

async function initMap() {
  // DOM envs
  var map = tema_map(-34.397, 80.644, 10, natural_theme, "map");
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

  // Passa o obj map e dados com latitude e longitude a serem mapeados e realiza a plotagem
  func_heatmap(map, data_coordinates);

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

// Mapei pontos e plota no mapa
function func_heatmap(map, data_coordinates) {
  // Função que vasculha latitude e longitude
  data_coordinates = map_point(data_coordinates);
  // heatmap
  var heatmap = new google.maps.visualization.HeatmapLayer({
    // data: [new google.maps.LatLng(37.782, -122.447)]
    data: data_coordinates
  });
  heatmap.setMap(map);
}
function map_point(point) {
  var wind_point = [];
  for (let i = 0; i < 100; i++) {
    wind_point.push(
      new google.maps.LatLng(point[i].latitude, point[i].longitude)
    );
  }
  return wind_point;
}

function tema_map(lat, long, zoom, style, idElement) {
  let map = new google.maps.Map(document.getElementById(idElement), {
    center: { lat: lat, lng: long },
    zoom: zoom,
    // mapTypeId: "satellite",
    styles: style
  });
  return map;
}
function refresh_map(name_tema) {
  var map = tema_map(-34.397, 80.644, 10, natural_theme, "map");

  var input = document.getElementById("search-box");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
}
$(document).ready(function() {
  $("#filtro_btn").hover(function() {
    $("#filtro").fadeIn();
  });
  $("#filtro").on("click", function() {
    $("#filtro").fadeOut();
  });
  $("#dark_tema").on("click", function() {
    refresh_map(dark_tema);
    map.setOptions({ styles: myStyle });
  });
});
