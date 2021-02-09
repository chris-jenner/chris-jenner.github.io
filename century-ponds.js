import fisheries_point from './data/fisheries_point.js';

var map = L.map("map", {
  center: [51.413795 , -2.5179358],
  zoom: 17,
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

var fsControl = L.control.fullscreen();
map.addControl(fsControl);

map.on('enterFullscreen', function() {
  if (window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function() {
  if (window.console) window.console.log('exitFullscreen');
});

var fisheryicon = L.icon({
  iconUrl: 'images/fisheries_50px.png',
  iconSize: [40, 49],
  iconAnchor: [20,20],
  popupAnchor: [3,-20]
  });

  const lakes = L.geoJSON(fisheries_point, {
    pointToLayer: function(geoJsonPoint, latlng) {
      return L.marker(latlng, {icon: fisheryicon});
       },
    }).bindPopup(function(layer) {
    let cap_name = layer.feature.properties.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return `<p>${cap_name}</p><a href="http://${layer.feature.properties.fishery_url}" target="_blank">View<a>`;
  }).addTo(map);
