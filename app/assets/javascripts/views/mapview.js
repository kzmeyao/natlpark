var MapView = Backbone.View.extend({

  map: null,
  markers: [],
  infoboxes: [],
  homezoom: 4,
  clickzoom: 9,
  homelat: 37,
  infowinsize: 30,
  offset: 90,

  initialize: function(){
    if(screen.width <= 480){
      this.homezoom = 3;
      this.clickzoom = 7;
      this.homelat = 42;
      this.infowinsize = 18;
      this.offset = 0;
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
    $.getScript("/infobox.js", function(){
      NatlPark.Views.MapView.placeMarkers();
    });
  },

  placeMarkers: function(){
    var names = NatlPark.Collections.Parks.pluck('name');
    var descripts = NatlPark.Collections.Parks.pluck('description');
    var states = NatlPark.Collections.Parks.pluck('state');
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
      var contentString = "<div class='info-title'>&nbsp&nbsp&nbsp&nbsp&nbsp" + names[i].toUpperCase() +
        "</div><div class='info-button' onclick=\"NatlPark.Views.MapView.openShowcase('" + names[i] + "'," + i + ",'" + states[i] + "')\">ENTER SHOWCASE</div>" +
        "<div class='info-content'>" + descripts[i] + "</div>";
      var infowindow = new InfoBox({
        content: contentString,
        disableAutoPan: false,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-145 - this.offset, 20),
        zIndex: null,
        boxStyle: {
          width: this.infowinsize + "em"
        },
        closeBoxMargin: "2px 2px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1),
        isHidden: false,
        pane: "floatPane",
        enableEventPropagation: false
      });
      var adjlatlon = new google.maps.LatLng(lats[i], -lons[i]);
      this.addMarkerClickBehavior(marker, adjlatlon, infowindow, this.clickzoom);
      this.markers.push(marker);
      this.infoboxes.push(infowindow);
    }
  },

  addMarkerClickBehavior: function(marker, pos, infowindow, zoom){
    google.maps.event.addListener(marker, 'click', function() {
      this.map.setZoom(zoom);
      this.map.setCenter(pos);
      infowindow.open(this.map, marker);
    });
  },

  moveCenter: function(pid){
    //Close overlay first
    NatlPark.Views.SearchIndex.render();
    //Close showcase if open
    NatlPark.Views.Showcase.destroyShow();
    var index = pid - 1;
    google.maps.event.trigger(this.markers[index], 'click');
  },

  openShowcase: function(name, pid, state){
    NatlPark.Views.Showcase.render(name, state);
    this.infoboxes[pid].close();
  }
})