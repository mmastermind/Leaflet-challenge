var myMap = L.map("map", {
  center: [-9, 21],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

d3.json(url, function(response) {

  console.log(response);

  var heatArray = [];
  var limits =[];

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i];

    if (location.properties.mag > 4) {
      heatArray.push([location.geometry.coordinates[0], location.geometry.coordinates[1], location.properties.mag*1500]);
      // if (i=0 & location.properties.mag > 0) {
      //   var max = location.properties.mag;
      //   var min = 0;
      //   limits.push([max,min]);
      // }
      // else {if (max[i]>limits[0]) {
      //   limits =[];
      //   limits.push([max[i],max[0]]);
      //   console.loge(limits);
      // }
        

      // }
      }
    }
  
  console.log(heatArray);

  var max = d3.max((heatArray)); 
  var min = d3.min((heatArray)); 
  console.log(max);
  console.log(min);
// // Create a control for our layers, add our overlay layers to it
  // L.control.layers(null, overlays).addTo(map);

  var heat = L.heatLayer(heatArray, {
    radius: 30,
    blur: 35
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [max[2],min[2]];
    // var colors = geojson.options.colors;
    // var labels = [];

    // Add min & max
    var legendInfo = "<h1>'Quakes Intensity</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[1][2] + "</div>" +
        // "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "<div class=\"max\">" + limits[0][2] + "</div>" +
       "</div>";

    div.innerHTML = legendInfo;

    // limits.forEach(function(limit, index) {
    //   labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    // });

    // div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    // return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
  
});
