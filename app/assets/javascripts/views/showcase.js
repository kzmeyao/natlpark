var Showcase = Backbone.View.extend({

  displayed: false,

  initialize: function(){

  },

  render: function(name){
    if(!this.displayed){
      this.$el.css("display", "block");
      this.$el.attr("class", "slide-in-bot");
      this.displayed = true;
    } else {
      this.$el.attr("class", "slide-out-bot");
      this.$el.css("display", "none");
      this.displayed = false;
    }
  }
})