var MapView = Backbone.View.extend({

  map: false,

  initialize: function(){
    _.bindAll(this, 'render');
    this.render();
  },

  render: function(){
    var mapOptions = {
      center: new google.maps.LatLng(36.5, -98.5),
      zoom: 4,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    this.placeMarkers();
  },

  placeMarkers: function(){

    var names = NatlPark.Collections.Parks.pluck('name');
    var lats = NatlPark.Collections.Parks.pluck('lat');
    var lons = NatlPark.Collections.Parks.pluck('lon');

    for( var i in lats ){
      var latlon = new google.maps.LatLng(lats[i], -lons[i]);
      var marker = new google.maps.Marker({
        position: latlon,
        map: this.map,
        title: names[i]
      });
    }
  },

  moveCenter: function(pid){
    //Close overlay first
    NatlPark.Views.SearchIndex.render();
    var index = pid - 1;
    var park = NatlPark.Collections.Parks.at(index);
    var parkLoc = new google.maps.LatLng(park.lat, -park.lon);
    NatlPark.Views.MapView.map.setCenter(parkLoc);
    NatlPark.Views.MapView.map.setZoom(10);
  }
})