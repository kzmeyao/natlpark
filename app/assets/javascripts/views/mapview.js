var MapView = Backbone.View.extend({

  map: false,

  initialize: function(){
    _.bindAll(this, 'render');
    this.render();
  },

  render: function(pid){
    var map;
    var mapOptions = {
      center: new google.maps.LatLng(36.5, -98.5),
      zoom: 4,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  }
})