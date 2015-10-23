(function() {
  'use strict';

  document.addEventListener("WebComponentsReady", function() {
    // Create a map object and specify the DOM element for display.
    var map = new window.google.maps.Map(document.querySelector("#map"), {
      center: {lat: 34.41, lng: -119.69},
      scrollWheel: false,
      zoom: 14
    });

    $.get(window.appPath + "markers", function(data) {
      var eventListener = document.querySelector("#eventListener");
      var locations = [];
      for (var locationId in data) {
        locations.push(data[locationId]);
      }
      eventListener.locations = locations;
    });
  });
})();
