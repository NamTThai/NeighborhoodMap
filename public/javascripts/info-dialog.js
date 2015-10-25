(function() {
  // Initialize a default infoDialog View Model for data binding
  window.infoDialogVm = {
    name: ko.observable("Leadbetter Beach"),
    displayPhone: ko.observable("+1-805-564-5418"),
    ratingImgUrl: ko.observable("http://s3-media4.fl.yelpcdn.com/bphoto/rrgP9fhz8YSpysQ1XBIQ4Q/ms.jpg"),
    url: ko.observable("http://www.yelp.com/biz/leadbetter-beach-santa-barbara-2"),
    snippetText: ko.observable("I like this beach. The sand is good, but there is a by of seaweed due to high tide. It doesn't smell bad, but the water is a bit murky at times. Parking...")
  };

  // Apply binding to info dialog
  document.addEventListener("WebComponentsReady", function() {
    var infoDialog = document.querySelector("#infoDialog");
    ko.applyBindings(window.infoDialogVm, infoDialog);
  });
})();
