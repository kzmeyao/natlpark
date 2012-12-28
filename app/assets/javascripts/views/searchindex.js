var SearchIndex = Backbone.View.extend({

  displayed: false,

  initialize: function(parks){
    _.bindAll(this, 'render', 'appendParksList');
    this.$el.html(
      "<div id='table-of-contents'>" + "</div>"
    )
    this.appendParksList();
    window.onresize = function(){
      var winW = window.innerWidth;
      var tableW = Math.floor(winW/240) * 240;
      $('#table-of-contents').css("width", tableW + "px");
    };
  },

  render: function(){
    if(!this.displayed){
      this.$el.css("display", "block");
      this.$el.attr("class", "overlay slide-in");
      $('#search-button').text("BACK TO MAP");
      this.displayed = true;
      var winW = window.innerWidth;
      var tableW = Math.floor(winW/240) * 240;
      $('#table-of-contents').css("width", tableW + "px");
      $('#table-of-contents').masonry({
        itemSelector : '.state-list'
      });
    } else {
      this.$el.attr("class", "overlay slide-out");
      $('#search-button').text("SEARCH PARKS");
      this.displayed = false;
    }
  },

  appendParksList: function(){
    var parks = NatlPark.Collections.Parks;
    var states = _.uniq(NatlPark.Collections.Parks.pluck('state').sort());
    var toAppend = "";
    for( var i in states ){
      toAppend += "<div class='state-list'><div class='state'>" + states[i] + "</div><ul>";
      var stateParks = NatlPark.Collections.Parks.where({'state':states[i]});
      for( var j in stateParks ){
        toAppend += "<li>" + stateParks[j].name + "</li>";
      }
      toAppend += "</ul></div>";
    }
    this.$('#table-of-contents').html(toAppend);
  }
})
