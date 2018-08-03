(function() {

  var key;

  var searchInput = document.getElementById('searchInput');
  var submitBtn = document.getElementById('searchBtn');

  // Init key to get ajax in the console
  $.ajax({
    url: 'config.json',
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      // console.log(data);

      key = data['0'].API_KEY;
      // console.log(key);

      getData(1);
    },
    error: function(error) {
      console.log('ERROR');
      console.log(error);
    }
  });

// -----------------------------------------------------------------------------

function getData() {
  $.ajax({
    url: 'https://api.spotify.com/v1/artists/5ZsFI1h6hIdQRw2ti0hz81/albums?include_groups=album%2Csingle&market=NZ&limit=10',
    headers: {
      'Authorization': 'Bearer ' + key
    },
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      console.log(data);
      console.log('Data has loaded');

      console.log(data.items[1].name);
      console.log(data.items[1].total_tracks);
      console.log(data.items[1].images[1].url);


      $('#searchForm').submit(function() {
        event.preventDefault();
        var inputVal = $('#searchInput').val();
      })


      for(var i = 0; i < data.items.length; i++){
        var nameOfAlbum = document.createElement('div');
        var totalTracks = document.createElement('div');
        var albumArtwork = document.createElement('div');

        nameOfAlbum.textContent = data.items[i].name;
        totalTracks.textContent = data.items[i].total_tracks;
        albumArtwork.innerHTML = '<img src="' + data.items[i].images[1].url + '">';

        // submitBtn.after(nameOfAlbum, totalTracks, albumArtwork);

        console.dir(albumArtwork);

      }
    },
    error: function(error) {
      console.log(error);
      console.log('There is an error loading the API');
    }
  })
}




  // Create a search
  // if ____ is searched then show that value inputs option. for loop?

}()); // IIFE ends
