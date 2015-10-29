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

    // Center map around marker's position
    infoDialog.close();
    window.map.panTo(marker.getPosition());
    openInfoDialog(locationId);
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

  // Get information from Yelp about the location and display it
  function openInfoDialog(locationId) {
    // Get Yelp review of the selected location and display as a dialog
    var locationYelpId = allMarkers[locationId].yelpId;
    $.get(appPath + "yelp", {name: locationYelpId}, function(data) {
      var infoDialogContent = generateInfoDialogContent(data.name, data.display_phone,
        data.rating_img_url, data.snippet_text, data.url);
      infoDialog.setContent(infoDialogContent);

      var marker = markers[locationId];
      infoDialog.open(map, marker);
    })
    .fail(function(error) {
      alert("Got an error from Yelp. It's likely that no API key was provided: " + error.responseJSON.data);
    });
  }
});
