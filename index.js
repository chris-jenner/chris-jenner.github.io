
// *********************
// Put these two lines at the very top of you 'index.js' file (or whatever you'd like to name it).
// This is where we'll import the external data and store them into variables for this file
//***********************************
import fisheries_point from './data/fisheries_point.js';
import fisheries_polyline from './data/fisheries_polyline.js'

let checkboxStates = [];

var map = L.map('map', {
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

// const search = new GeoSearch.GeoSearchControl({
//   provider: new GeoSearch.OpenStreetMapProvider(),
//   animateZoom: true,
//   searchLabel: 'Search by location',
//   updateMap: true,
//   style: 'bar',
//   autoClose: true,
// });
// map.addControl(search);

L.control.zoom({
  position: 'topright'
}).addTo(map);

const lakes = L.geoJSON(null, {
  style: function(feature) {
    return {
      color: feature.properties.color
    };
  },
  filter: (feature) => {
    if (checkboxStates.length == 0) return true;
    return checkboxStates.every(function(element) {
      return feature.properties[element.name];
    });
  }
}).bindPopup(function(layer) {
  let cap_name = layer.feature.properties.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return `<p>${cap_name}</p><a href="https://${layer.feature.properties.link}" target="_blank">View<a>`;
}).addTo(map);

const rivers = L.geoJSON(null, {
  filter: (feature) => {
    if (checkboxStates.length == 0) return true;
    return checkboxStates.every(function(element) {
      return feature.properties[element.name];
    });
  },
}).bindPopup(function(layer) {
	let cap_name = layer.feature.properties.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return `<p>${cap_name}</p><a href="https://${layer.feature.properties.link}" target="_blank">View<a>`;
}).addTo(map);

function updateCheckboxStates() {
  //first reset your object that holds the input checked states
  checkboxStates = [];
  for (let input of document.querySelectorAll('input')) {
    if (input.checked) {
      let inputState = {}
      inputState.name = input.name;
      inputState.checked = input.checked;
      checkboxStates.push(inputState)
    }
  }
}

// for (let input of document.querySelectorAll('input')) {
//   //Listen to 'change' event of all inputs
//   input.onchange = (e) => {
//     lakes.clearLayers();
//     rivers.clearLayers();
//     updateCheckboxStates();
//     lakes.addData(fisheries_point);
//     rivers.addData(fisheries_polyline);
//   }
// }

//this is the filtering logic - whenever you click 'filter', it reads over all chekced boxes and removes then re-adds the newly filtered data to the screen
document.querySelector('.filterBtn').addEventListener('click', () => {
    lakes.clearLayers();
    rivers.clearLayers();
    updateCheckboxStates();
    lakes.addData(fisheries_point);
    rivers.addData(fisheries_polyline);
})


/****** INITT ******/
updateCheckboxStates()
lakes.addData(fisheries_point);
rivers.addData(fisheries_polyline);

//NOW setup the filter checkboxes and their states
//these variables hold the state of whether they're expanded or not
//first is species, then facilities, then tickets.  To add more filters, just add more 'false's
const checkState = [false, false, false]

//now variables to hold the expanding objects
var checkBoxes = document.querySelectorAll('.inputContainer')
  
function showCheckboxes(idx) { 
    if (checkState[idx]) { 
        checkBoxes[idx].style.display = "none"; 
        checkState[idx] = false; 
    } else { 
        checkBoxes[idx].style.display = "flex"; 
        checkState[idx] = true; 
    } 
} 

//add event handlers for clicking on the filtering buttons (the individual checkbox)
document.querySelectorAll('.overSelect').forEach((box, idx) => {
  box.addEventListener('click', () => showCheckboxes(idx))
});


/****** INITT ******/
updateCheckboxStates()
lakes.addData(fisheries_point);
rivers.addData(fisheries_polyline);


