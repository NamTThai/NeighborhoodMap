document.addEventListener("WebComponentsReady", function() {
  var eventListener = document.querySelector("#eventListener");

  eventListener.eAnimateMarker = function(event) {
    if (!window.markers) {
      return;
    }

    var locationId = event.detail.item;

    var marker = window.markers[locationId];
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1400);

    var locationYelpId = window.allMarkers[locationId].yelpId;
    $.get(window.appPath + "yelp", {name: locationYelpId}, function(data) {
      eventListener.info = data;
      var infoDialog = document.querySelector("#infoDialog");
      var markerPosition = window.overlayMap.getProjection().fromLatLngToDivPixel(marker.getPosition());
      infoDialog.style.top = (window.overlayMap.offsetValues.top + markerPosition.y) + "px";
      infoDialog.style.left = (window.overlayMap.offsetValues.left + markerPosition.x) + "px";
      infoDialog.open();
    })
    .fail(function(error) {
      alert("Something is wrong. Please contact your administrator with the following error: " + error.responseJSON.data);
    });
  };

  eventListener.eFilterMarker = function(event) {
    if (!window.markers) {
      return;
    }

    var filteredItems = event.detail.filteredItems;
    for (var marker in window.markers) {
      window.markers[marker].setVisible(false);
    }

    for (var i = 0; i < filteredItems.length; i++) {
      window.markers[filteredItems[i].id].setVisible(true);
    }
  };
});
