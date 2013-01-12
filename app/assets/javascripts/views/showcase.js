var Showcase = Backbone.View.extend({

  isDev: false,
  displayed: false,
  consumer_key: 'LmN5st3fctmDacYkERur14LtgW3kSM5Se604YWZM',
  sdk_key: '6499e89a8370e4640c99e7b37d72e8e910d976ba',
  term: '',
  gallery: null,
  isOn: false,

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
      if(name === "Hot Springs" || name === "Badlands" || name === "Grand Canyon" || name === "Glacier"){
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
    _500px.api('/photos/search', { term: this.term, consumer_key: this.consumer_key, image_size: 4, rpp : 50, sort: 'votes_count'}, function (response) {
      if (response.success) {
        NatlPark.Views.Showcase.initShow(response.data.photos);
      }
    });
  },

  initShow: function(photos){

    $('#wrapper').css('height', .8 * $('#glass').height() + "px");
    var pich = $('#wrapper').height();
    var picw = $('#wrapper').width() - 300;
    var slides = [];
    if(photos.length > 0){
      for(i in photos){
        var photo = photos[i];
        if(photo.height == null || photo.width == null){
          continue;
        }
        if(screen.width <= 480){
          var pichwratio = pich/(picw + 300);
        } else {
          var pichwratio = pich/picw;
        }
        var phohwratio = photo.height/photo.width;
        var frac = 1;
        if(phohwratio > pichwratio){
          if(photo.height > pich){
            frac = photo.height/pich;
          }
        } else {
          if(photo.width > picw){
            if(screen.width <= 480){
              frac = photo.width/(picw + 300);
            } else {
              frac = photo.width/picw;
            }
          }
        }
        var galwidth = "style= \"width : '" + (photo.width/frac + 300) + "px'\"";
        var vertcentering = "style= \"margin-top : " + (photo.height/(2*frac) - 125) + "px\"";
        var height = "height = '" + (photo.height/frac - 12) + "px'";
        var width = "width = '" + (photo.width/frac - 12) + "px'";

        if(screen.width <= 480){
          slides.push(
            '<div class="gallery"' + galwidth +
              '><div class="beach">' +
                '<img src="' + photo.image_url + '" ' + height + ' ' + width +'/>' +
              '</div>' +
            '</div>'
          );
        } else {
          slides.push(
            '<div class="gallery"' + galwidth +
              '><div class="beach">' +
                '<img src="' + photo.image_url + '" ' + height + ' ' + width +'/>' +
              '</div>' +
              '<div class="ocean">' +
                '<div class="wave"' + vertcentering + '>' + photo.name +
                  '<br /><small>' + photo.user.fullname.toUpperCase() + '</small>' +
                '</div>' +
              '<a class="gallery-button" href="http://500px.com/photo/' + photo.id +'" target="_blank">VIEW ON 500PX</a>' +
              '<a class="gallery-button" onclick="NatlPark.Views.Showcase.destroyShow()">BACK TO MAP</a>' +
              '</div>' +
            '</div>'
          );
        }
      }

      this.toggleNavigation();

      var	carousel,
        el,
        i,
        page;

      carousel = new SwipeView('#wrapper', {
        numberOfPages: slides.length,
        hastyPageFlip: true
      });
      this.gallery = carousel;
      this.isOn = true;

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
            el.className = 'loading';
            el.width = slides[upcoming].width;
            el.height = slides[upcoming].height;

            el = carousel.masterPages[i].querySelector('span');
          }
        }

//        document.querySelector('#nav .selected').className = '';
//        dots[carousel.pageIndex+1].className = 'selected';
      });

      carousel.onMoveOut(function () {
        carousel.masterPages[carousel.currentMasterPage].className = carousel.masterPages[carousel.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
      });

      carousel.onMoveIn(function () {
        var className = carousel.masterPages[carousel.currentMasterPage].className;
        /(^|\s)swipeview-active(\s|$)/.test(className) || (carousel.masterPages[carousel.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
      });

    }
  },

  destroyShow: function(){
    if(this.isOn){
      this.toggleNavigation();
      this.gallery.destroy();
      $('#wrapper').empty();
      this.isOn = false;
      this.render("", "");
    }
  },

  toggleNavigation: function(){
    if(this.isOn){
      $('.prev').remove();
      $('.next').remove();
    } else {
      $('#wrapper').append('<div class="nav prev" onclick="NatlPark.Views.Showcase.gallery.prev()"><</div>');
      $('#wrapper').append('<div class="nav next" onclick="NatlPark.Views.Showcase.gallery.next()">></div>');
    }
  }
})