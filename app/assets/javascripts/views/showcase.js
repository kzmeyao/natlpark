var Showcase = Backbone.View.extend({

  isDev: false,
  displayed: false,
  consumer_key: 'LmN5st3fctmDacYkERur14LtgW3kSM5Se604YWZM',
  sdk_key: '6499e89a8370e4640c99e7b37d72e8e910d976ba',
  term: '',

  initialize: function(data){
    this.el = data.el;
    this.isDev = data.isDev;
    if(this.isDev){
      this.consumer_key = 'vNrohR8wYlxiKOzJC4fcW27kOabgx879bgEOT5Wa';
      this.sdk_key = '90fbc81d19595dd594c7dfa1e61f5b75129f7a5c';
    }
    _500px.init({
      sdk_key: this.sdk_key
    });
  },

  render: function(name, state){
    if(!this.displayed){
      this.term = name + " National Park ";
      if(name === "Hot Springs" || name === "Badlands" || name === "Grand Canyon"){
        //search term modified to avoid confusion
        this.term = this.term + " " + state;
      }
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
    _500px.api('/photos/search', { term: this.term, consumer_key: this.consumer_key, image_size: 4, rpp : 20, sort: 'votes_count'}, function (response) {
      if (response.success) {
        NatlPark.Views.Showcase.initShow(response.data.photos);
      }
    });
  },

  initShow: function(photos){

    $('#wrapper').css('height', .75 * $('#glass').height() + "px");
    var pich = $('#wrapper').height();
    var picw = $('#wrapper').width() - 300;

    if(photos.length > 0){
      var slides = [];
      for(i in photos){
        var photo = photos[i];
        if(photo.height == null || photo.width == null){
          continue;
        }
        var pichwratio = pich/picw;
        var phohwratio = photo.height/photo.width;
        var frac = 1;
        if(phohwratio > pichwratio){
          if(photo.height > pich){
            frac = photo.height/pich;
          }
        } else {
          if(photo.width > picw){
            frac = photo.width/picw;
          }
        }
        var galwidth = "style= \"width : '" + (photo.width/frac + 300) + "px'\"";
        var height = "height = '" + (photo.height/frac - 12) + "px'";
        var width = "width = '" + (photo.width/frac - 12) + "px'";
        slides.push(
          '<div class="gallery"' + galwidth +
            '><div class="beach">' +
              '<img src="' + photo.image_url + '" ' + height + ' ' + width +'/>' +
            '</div>' +
            '<div class="ocean">' +
              '<div class="wave">' + photo.name +
                '<br /><small>' + photo.user.fullname.toUpperCase() + '</small>' +
              '</div>' +
              '<a class="gallery-button">VIEW ON 500PX</a>' +
              '<a class="gallery-button">BACK TO MAP</a>' +
            '</div>' +
          '</div>'
        );
      }

      var	carousel,
        el,
        i,
        page;

      carousel = new SwipeView('#wrapper', {
        numberOfPages: slides.length,
        hastyPageFlip: true
      });

      // Load initial data
      for (i=0; i<3; i++) {
        page = i==0 ? slides.length-1 : i-1;

        el = document.createElement('span');
        el.innerHTML = slides[page];
        carousel.masterPages[i].appendChild(el)
      }

      carousel.onFlip(function () {
        var el,
          upcoming,
          i;

        for (i=0; i<3; i++) {
          upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;

          if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
            el = carousel.masterPages[i].querySelector('span');
            el.innerHTML = slides[upcoming];
          }
        }
      });



//      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//
//      var	gallery,
//        el,
//        i,
//        page,
//        dots = document.querySelectorAll('#nav li');
//
//      gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });
//
//      for (i=0; i<3; i++) {
//        page = i==0 ? slides.length-1 : i-1;
//        el = document.createElement('img');
//        el.className = 'loading';
//        el.src = slides[page].img;
//        el.width = slides[page].width;
//        el.height = slides[page].height;
//        el.onload = function () { this.className = ''; }
//        gallery.masterPages[i].appendChild(el);
//        gallery.masterPages[i].appendChild(el)
//      }
//
//      gallery.onFlip(function () {
//        var el,
//          upcoming,
//          i;
//
//        for (i=0; i<3; i++) {
//          upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;
//
//          if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
//            el = gallery.masterPages[i].querySelector('img');
//            el.className = 'loading';
//            el.src = slides[upcoming].img;
//            el.width = slides[upcoming].width;
//            el.height = slides[upcoming].height;
//
//            el = gallery.masterPages[i].querySelector('span');
//            el.innerHTML = slides[upcoming].desc;
//          }
//        }
//
//        document.querySelector('#nav .selected').className = '';
//        dots[gallery.pageIndex+1].className = 'selected';
//      });
//
//      gallery.onMoveOut(function () {
//        gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
//      });
//
//      gallery.onMoveIn(function () {
//        var className = gallery.masterPages[gallery.currentMasterPage].className;
//        /(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
//      });
    }
  }
})