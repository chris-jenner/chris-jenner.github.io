import fishery_points from './data/fishery_points.js';
import fishery_polylines from './data/fishery_polylines.js';

var map = L.map("map", {
  center: [51.07092963, 0.42184403],
  zoom: 16,
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

var lakeicon = L.icon({
  iconUrl: 'images/fisheries_50px.png',
  iconSize: [40, 49],
  iconAnchor: [20,20],
  popupAnchor: [3,-20]
  });

var riverstyle = {
    stroke: true,
    fillColor: "#2D558C",
    color: "#2D558C",
    weight: 5,
    opacity: 0.8,
    fillOpacity: 0.6
  };

const lakes = L.geoJSON(fishery_points, {
  pointToLayer: function(geoJsonPoint, latlng) {
    return L.marker(latlng, {icon: lakeicon});
     },
}).bindPopup(function(layer) {
  let cap_name = layer.feature.properties.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return `<p>${cap_name}</p><a href="http://${layer.feature.properties.tfi_url}" target="_blank">View<a>`;
}).addTo(map);

const rivers = L.geoJSON(fishery_polylines, {
  style: riverstyle,
}).bindPopup(function(layer) {
	let cap_name = layer.feature.properties.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return `<p>${cap_name}</p><a href="https://${layer.feature.properties.tfi_url}" target="_blank">View<a>`;
}).addTo(map);
