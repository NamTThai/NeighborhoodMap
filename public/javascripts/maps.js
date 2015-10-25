(function() {
  'use strict';

  document.addEventListener("WebComponentsReady", function() {
    // Create a map object and specify the DOM element for display.
    window.map = new google.maps.Map(document.querySelector("#map"), {
      center: {lat: 34.41, lng: -119.69},
      scrollWheel: false,
      zoom: 14
    });

    // Create an OverlapView over the map object to retrieve marker location
    window.overlayMap = new google.maps.OverlayView();
    window.overlayMap.draw = function() {};
    window.overlayMap.setMap(window.map);

    // Retrieve the absolute position of the map div in relation to top left corner
    var offsetValues = {
      top: 0,
      left: 0
    };
    var currentLayout = document.querySelector("#map");
    while (currentLayout.offsetParent) {
      offsetValues.top += currentLayout.offsetTop;
      offsetValues.left += currentLayout.offsetLeft;
      currentLayout = currentLayout.offsetParent;
    }
    window.overlayMap.offsetValues = offsetValues;

    // Send a request to the server to retrieve all preset locations and then
    // display them on the map and left hand list.
    $.get(window.appPath + "markers", function(data) {
      window.allMarkers = data;

      var locations = [];
      for (var locationId in data) {
        locations.push(data[locationId]);
        addLocationMarker(data[locationId]);
      }

      setLocationList(locations);
    });
  });

  // Add a marker to the map. Add listener to that marker, responding to click event
  function addLocationMarker(location) {
    var lat = parseFloat(location.lat);
    var lng = parseFloat(location.lng);
    if (isNaN(lat) || isNaN(lng) || !location.id) {
      return;
    }

    var marker = new google.maps.Marker({
      map: window.map,
      position: {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      },
      title: location.name
    });

    marker.addListener("click", function() {
      var eventListener = document.querySelector("#eventListener");
      eventListener.eAnimateMarker({detail: {item: location.id}});
    });

    // Store all the markers in an array
    if (!window.markers) {
      window.markers = {};
    }

    window.markers[location.id] = marker;
  }

  // Set available data to the search filter list on the left drawer panel
  function setLocationList(locations) {
    document.querySelector('search-filter').setData(locations);
  }
})();
