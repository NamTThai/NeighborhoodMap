(function() {
  'use strict';

  document.addEventListener("WebComponentsReady", function() {
    // Create a map object and specify the DOM element for display.
    window.map = new google.maps.Map(document.querySelector("#map"), {
      center: {lat: 34.41, lng: -119.69},
      scrollWheel: false,
      zoom: 14
    });

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

    // Initialize info dialog object
    window.generateInfoDialogContent = function(header, phone, imgUrl, snippet, url) {
      header = header ? header : "";
      phone = phone ? phone : "";
      imgUrl = imgUrl ? imgUrl : "";
      snippet = snippet ? snippet : "";
      url = url ? url : "";
      return '<div id="infoDialog">' +
        '<h4 id="infoHeader">' + header + '</h4>' +
        '<p>' + phone + '</p>' +
        '<img alt="Review stars" src="' + imgUrl + '">' +
        '<p id="reviewSnippet"><a id="infoUrl" target="_blank" href="' + url + '">' + snippet + '</a></p>' +
        '</div>';
    };

    window.infoDialog = new google.maps.InfoWindow({
      content: null
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
