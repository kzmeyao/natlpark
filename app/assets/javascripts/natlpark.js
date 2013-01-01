var NatlPark = {
  Collections: {},
  Views: {},
  initialize: function(data){
    NatlPark.Collections.Parks = new Parks(data.parks);
    NatlPark.Views.MapView = new MapView();
    NatlPark.Views.SearchIndex = new SearchIndex({el : $('#overlay')});
    $('#search-button').click( function (){
      NatlPark.Views.SearchIndex.render();
    })
    NatlPark.Views.Showcase = new Showcase({el : $('#overlay-bot')});
  }
}