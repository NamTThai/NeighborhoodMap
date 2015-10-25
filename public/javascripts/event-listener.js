document.addEventListener("WebComponentsReady", function() {
  var eventListener = document.querySelector("#eventListener");

  // Trigger whenever a marker or a list item is clicked on
  eventListener.eAnimateMarker = function(event) {
    if (!window.markers) {
      return;
    }

    // Responsive design: close the drawer if in mobile mode
    var drawerPanel = document.querySelector("paper-drawer-panel");
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }

    // Id of the selected location clicked on
    var locationId = event.detail.item;

    // Add a bounce animation on corresponding marker for 1.4s
    var marker = window.markers[locationId];
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1400);

    // Get Yelp review of the selected location and display as a dialog
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

  // Set visibility of the markers based what items are visible in the left drawer panel
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
