var map = L.map('map').setView([47.2529, -122.4443], 12);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaC13YXJyZW4iLCJhIjoiY2tpbmV2aHl5MDYxcjJzcGNqaGJzNWwyNSJ9.8Iik9-Klh7z3K-zMi-m_yg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaC13YXJyZW4iLCJhIjoiY2tpbmV2aHl5MDYxcjJzcGNqaGJzNWwyNSJ9.8Iik9-Klh7z3K-zMi-m_yg'
}).addTo(map);

var drawnItems = L.featureGroup().addTo(map);

new L.Control.Draw({
    draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: true
    },
    edit: {
        featureGroup: drawnItems
    }
}).addTo(map);

function createFormPopup() {
    var popupContent =
      '<form>' +
      'Location name:<br><input type="text" id="input_name"><br>' +
      'Description:<br><input type="text" id="input_desc"><br>' +
      '<input type="button" value="Submit" id="submit">' +
      '</form>'
    drawnItems.bindPopup(popupContent).openPopup();
}

map.addEventListener("draw:created", function(e) {
    e.layer.addTo(drawnItems);
    createFormPopup();
    });

function setData(e) {
    if(e.target && e.target.id == 'submit') {
      var enteredLocName = document.getElementById("input_name").value;
      var enteredDescription = document.getElementById("input_desc").value;

      console.log(enteredLocName);
      console.log(enteredDescription);

      drawnItems.eachLayer(function(layer) {
          var drawing = JSON.stringify(layer.toGeoJSON().geometry);
          console.log(drawing);
      });

      drawnItems.closePopup();
      drawnItems.clearLayers();

    }
}
  document.addEventListener('click', setData);

  map.addEventListener('draw:editstart', function(e) {
      drawnItems.closePopup();
  });
  map.addEventListener('draw:deletestart', function(e) {
      drawnItems.closePopup();
  });
  map.addEventListener('draw:editstop', function(e) {
      drawnItems.openPopup();
  });
  map.addEventListener('draw:deletestop', function(e) {
      if(drawnItems.getLayers().length > 0) {
          drawnItems.openPopup();
      }
  });
//adapted from example from W3Schools
  //get the modal element
  var modal = document.getElementById("myModal");
  //get the button that opens the modal
  var btn = document.getElementById("myBtn");
  //get the <span> element that closes the modal
  var span =document.getElementsByClassName("close")[0];
  //create function that opens the modal when button clicked
    btn.onclick = function() {
        modal.style.display = "block";
    }
    //close modal when clicked
    span.onclick = function() {
        modal.style.display = "none";
    }
    //close window when clicked outside modal
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
    }
  }
