var NatlPark = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(data){
    NatlPark.Collections.Parks = new Parks(data.parks);
    NatlPark.Views.SearchIndex = new SearchIndex({el : $('.overlay')});
    $('#search-button').click( function (){
      NatlPark.Views.SearchIndex.render();
    })
  }
}