var SearchIndex = Backbone.View.extend({

  displayed: false,

  initialize: function(){
    this.$el.html(
//      "<div class='box'></div>"
    )
  },

  render: function(){
    if(!this.displayed){
      this.$el.css("display", "block");
      this.$el.attr("class", "overlay slide-in");
      this.displayed = true;
    } else {
      this.$el.attr("class", "overlay slide-out");
      this.displayed = false;
    }
  }
})
