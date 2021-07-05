// this variable will collect the html which will eventually be placed in the side_bar
var side_bar_html = "";

// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there
var gmarkers = [];
var map = null;
var delay = 100;
var markerclusterer = null;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var currentFeature_or_Features = null;

let geojson_Polygon = {
  "type": "FeatureCollection",
  "features": []
};

// call Map Styles
// Create a new StyledMapType object, passing it an array of styles,
// and the name to be displayed on the map type control.
const styledMapType = new google.maps.StyledMapType(
  [{
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#393939"
      }]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#f2f2f2"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [{
        "saturation": "-100"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [{
          "visibility": "on"
        },
        {
          "lightness": "5"
        },
        {
          "gamma": "1.00"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [{
          "saturation": "-100"
        },
        {
          "gamma": "0.90"
        },
        {
          "lightness": "0"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "geometry.fill",
      "stylers": [{
          "visibility": "on"
        },
        {
          "saturation": "-100"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
          "saturation": "-100"
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
          "saturation": "0"
        },
        {
          "lightness": "-15"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [{
          "gamma": "0.63"
        },
        {
          "saturation": "40"
        },
        {
          "hue": "#97ff00"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [{
        "visibility": "simplified"
      }]
    },
    {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [{
          "saturation": "-100"
        },
        {
          "gamma": "0.90"
        },
        {
          "lightness": "0"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
          "color": "#9cd2dc"
        },
        {
          "visibility": "on"
        }
      ]
    }
  ], {
    name: 'Essentiel'
  });

var infowindow = new google.maps.InfoWindow({
  size: new google.maps.Size(150, 50)
});

// This function picks up the click and opens the corresponding info window
function myclick(i) {
  google.maps.event.trigger(gmarkers[i], "click");
}

// Pin Symbol for map
function pinSymbol(color, colorstroke, pin) {
  if (pin == "shield") {
    path = 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z'
  } else if (pin == "pause") {
    path = 'M0,17.43397c0.278,-3.428 1.271,-6.574 3.023,-9.458l-6.719,-6.723c-2.123,1.828 -4.539,2.84 -7.279,3.019c-2.509,0.227 -4.891,-0.25 -7.127,-1.434c-2.301,1.146 -4.671,1.625 -7.142,1.434c-2.556,-0.229 -4.862,-1.135 -6.928,-2.741l-6.738,6.72c1.657,2.925 2.58,5.987 2.762,9.183c0.086,1.472 -0.334,3.498 -1.276,6.117c-0.493,1.452 -0.866,2.712 -1.12,3.764c-0.235,1.045 -0.382,1.895 -0.431,2.531c-0.035,2.791 0.748,5.311 2.353,7.55c1.254,1.635 3.322,3.44 6.194,5.415c3.142,1.6 5.574,2.639 7.277,3.081l1.412,0.656c0.444,0.214 0.92,0.421 1.417,0.647c1.071,0.642 1.824,1.339 2.22,2.057c0.486,-0.777 1.255,-1.456 2.277,-2.057c0.722,-0.314 1.333,-0.588 1.823,-0.828c0.49,-0.215 0.855,-0.377 1.067,-0.476c0.363,-0.181 0.84,-0.387 1.417,-0.615c0.583,-0.229 1.302,-0.51 2.161,-0.82c1.66,-0.589 2.868,-1.144 3.636,-1.646c2.785,-1.975 4.821,-3.75 6.117,-5.339c1.662,-2.249 2.469,-4.78 2.432,-7.626c-0.098,-1.274 -0.637,-3.313 -1.616,-6.091c-0.934,-2.704 -1.348,-4.804 -1.212,-6.32zm-24.20038,10.07602c-5.1359,-3.3628 -6.10641,-10.00079 -0.20765,-12.65168l12.86469,-0.15137c5.56533,2.7339 4.9407,9.95019 -0.16632,12.79082l-12.49072,0.01223z'
  } else if (pin == "fire") {
    path = 'M22-48h-44v43h16l6 5 6-5h16z'
  } else {
    path = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
  }
  return {
    path: path,
    fillColor: color,
    fillOpacity: 1,
    strokeColor: colorstroke,
    strokeWeight: 2,
    scale: 0.3,
    labelOrigin: new google.maps.Point(0, 15),
  };
}

// A function to create the marker and set up the event window function
function createMarker(latlng, name, id, html, label, color, pin, colorstroke) {
  var contentString = html;
  var marker = new google.maps.Marker({
    position: latlng,
    label: label,
    map: map,
    zIndex: Math.round(latlng.lat() * -100000) << 5,
    icon: pinSymbol(color, colorstroke, pin),
    scaledSize: new google.maps.Size(50, 50)
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
  // save the info we need to use later for the side_bar
  gmarkers.push(marker);
  // add a line to the side_bar html
  side_bar_html += '<div class="side-bar_element"><a href="javascript:myclick(' + (gmarkers.length - 1) + ')">' + name + '<\/a></div>';
}
