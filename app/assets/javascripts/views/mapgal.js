var MapGallery = Backbone.View.extend({

  displayed: false,

  initialize: function(){
    _.bindAll(this, 'render');

  },

  render: function(pid){
    //Close overlay first
    NatlPark.Views.SearchIndex.render();
    var index = pid - 1;
    var park = NatlPark.Collections.Parks.at(index);
    var parkLoc = new google.maps.LatLng(park.lat, -park.lon);
    map.setCenter(parkLoc);
    map.setZoom(12);
  }
})