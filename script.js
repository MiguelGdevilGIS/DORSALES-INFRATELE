var map = L.map('map').setView([0, 0], 2);

// Mapa Base
var openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var googleMaps = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: '© Google Maps'
});

// Capa para la búsqueda
var searchLayer = L.layerGroup().addTo(map);

// Evento de búsqueda
document.getElementById('searchButton').addEventListener('click', function() {
  var searchTerm = document.getElementById('searchInput').value;
  // Realizar aquí la lógica de búsqueda y agregar resultados a 'searchLayer'
});

// Evento para cambiar el mapa base
document.getElementById('changeBaseMapButton').addEventListener('click', function() {
  if (map.hasLayer(openStreetMap)) {
    map.removeLayer(openStreetMap);
    googleMaps.addTo(map);
  } else {
    map.removeLayer(googleMaps);
    openStreetMap.addTo(map);
  }
});

// Evento de subida de documentos locales
var fileInput = document.getElementById('fileInput');
var fileUploadButton = document.getElementById('fileUploadButton');
fileUploadButton.addEventListener('click', function() {
  fileInput.click();
});
fileInput.addEventListener('change', function(event) {
  var file = event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var content = e.target.result;
      try {
        var geojsonLayer = L.geoJSON(JSON.parse(content)).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
      } catch (error) {
        console.error('Error parsing GeoJSON:', error);
      }
    };
    reader.readAsText(file);
  }
});