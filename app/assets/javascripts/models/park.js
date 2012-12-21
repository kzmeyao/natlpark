Park = Backbone.Model.extend({

  initialize: function(model){
    this.name = model["name"];
    this.date_formed = model["date_formed"];
    this.state = model["state"];
    this.description = model["description"];
    this.lat = model["lat"];
    this.lon = model["lon"];
  }

});
