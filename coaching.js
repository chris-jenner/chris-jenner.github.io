import coaching_points from './data/coaching_points.js';

var map = L.map("map", {
  center: [51.396145, -2.5015016],
  zoom: 11,
  zoomControl: false,
  gestureHandling: true
});

var basemap = L.tileLayer('https://api.maptiler.com/maps/uk-openzoomstack-light/{z}/{x}/{y}.png?key=JRDKWZ623VwZMdOklau8', {
  tileSize: 512,
  zoomOffset: -1,
  minZoom: 8,
  attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e, Contains OS data \u00a9 Crown copyright and database right 2021",
  crossOrigin: true
}).addTo(map);

L.control.zoom({
  position: 'topright'
}).addTo(map);

const search = new GeoSearch.GeoSearchControl({
  provider: new GeoSearch.OpenStreetMapProvider(),
  animateZoom: true,
  searchLabel: 'Search by location',
  updateMap: true,
  style: 'bar',
  autoClose: true,
  position: 'topleft'
});
map.addControl(search);

var fsControl = L.control.fullscreen();
map.addControl(fsControl);

map.on('enterFullscreen', function() {
  if (window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function() {
  if (window.console) window.console.log('exitFullscreen');
});

function onLocationFound(e) {
  var radius = e.accuracy / 4;

  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({
  setView: true,
  maxZoom: 12,
  timeout: 10000
});

var shopicon = L.icon({
  iconUrl: 'images/coaching_50px.png',
  iconSize: [40, 49],
  iconAnchor: [20,20],
  popupAnchor: [3,-20]
  });

  const coaching = L.geoJSON(coaching_points, {
    pointToLayer: function(geoJsonPoint, latlng) {
      return L.marker(latlng, {icon: shopicon});
       },
    }).bindPopup(function(layer) {
    let cap_name = layer.feature.properties.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return `<p>${cap_name}</p><a href="http://${layer.feature.properties.url}" target="_blank">View<a>`;
  }).addTo(map);
