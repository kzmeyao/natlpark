var Showcase = Backbone.View.extend({

  isDev: false,
  displayed: false,
  consumer_key: '',
  sdk_key: '',
  term: '',

  initialize: function(data){
    this.el = data.el;
    this.isDev = data.isDev;
    if(this.isDev){
      this.consumer_key = 'vNrohR8wYlxiKOzJC4fcW27kOabgx879bgEOT5Wa';
      this.sdk_key = '90fbc81d19595dd594c7dfa1e61f5b75129f7a5c';
    } else {
      this.consumer_key = 'LmN5st3fctmDacYkERur14LtgW3kSM5Se604YWZM';
      this.sdk_key = '6499e89a8370e4640c99e7b37d72e8e910d976ba';
    }
    _500px.init({
      sdk_key: this.sdk_key
    });
  },

  render: function(name){
    if(!this.displayed){
      this.term = name + " National Park";
      this.term.replace(" ", "%20");
      this.$el.css("display", "block");
      this.$el.attr("class", "slide-in-bot");
      this.displayed = true;
      this.fetchPics();
    } else {
      this.$el.attr("class", "slide-out-bot");
      this.$el.css("display", "none");
      this.displayed = false;
    }
  },

  fetchPics: function(){
    console.log(this.term);
    _500px.api('/photos/search', { term: this.term, consumer_key: this.consumer_key, image_size: 4, rpp : 100}, function (response) {
      if (response.success) {
        this.initShow(response.data.photos);
      }
    });
  },

  initShow: function(photos){
    if(photos.length != 0){

    }
  }
})