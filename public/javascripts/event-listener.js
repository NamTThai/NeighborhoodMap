document.addEventListener("WebComponentsReady", function() {
  var eventListener = document.querySelector("#eventListener");

  eventListener.eDrawerItemClick = function(event) {
    var drawer = document.querySelector(".drawer-panel");
    if (drawer.narrow) {
      drawer.closeDrawer();
    }

    var route = event.target.getAttribute("data-route");
    window.history.pushState("", "", appPath + route);
  };
});
