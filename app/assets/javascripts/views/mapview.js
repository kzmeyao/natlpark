var MapView = Backbone.View.extend({

  map: null,
  markers: [],
  homezoom: 4,
  clickzoom: 9,
  homelat: 39,

  initialize: function(){
    _.bindAll(this, 'render');
    if(screen.width <= 480){
      this.homezoom = 3;
      this.clickzoom = 7;
      this.homelat = 42;
    }
    this.render();
  },

  render: function(){
    var mapOptions = {
      center: new google.maps.LatLng(this.homelat, -98.5),
      zoom: this.homezoom,
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
      if(names[i] == "American Samoa"){
        lats[i] = -lats[i];
      }
      var latlon = new google.maps.LatLng(lats[i], -lons[i]);
      var marker = new google.maps.Marker({
        position: latlon,
        map: this.map,
        title: names[i],
        draggable: false,
        clickable: true,
        animation: google.maps.Animation.DROP
      });
      var adjlatlon = new google.maps.LatLng(lats[i] -.4, -lons[i]);
      this.addMarkerClickBehavior(marker, adjlatlon, this.clickzoom);
      this.markers.push(marker);
    }
  },

  addMarkerClickBehavior: function(marker, pos, zoom){
    google.maps.event.addListener(marker, 'click', function() {
      this.map.setZoom(zoom);
      this.map.setCenter(pos);
    });
  },

  moveCenter: function(pid){
    //Close overlay first
    NatlPark.Views.SearchIndex.render();
    var index = pid - 1;
    var park = NatlPark.Collections.Parks.at(index);
    var parkLoc = new google.maps.LatLng(park.lat, -park.lon);
    this.map.setCenter(parkLoc);
    this.map.setZoom(this.clickzoom);
  }
})