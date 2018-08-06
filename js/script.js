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
    // syntax to apply key is 'access_token'
    url: 'https://api.spotify.com/v1/artists/5ZsFI1h6hIdQRw2ti0hz81/albums?include_groups=album%2Csingle&market=NZ&limit=10&access_token=' + key,
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
        // for loop for creating elements
        for(var i = 0; i < data.items.length; i++){

          if (inputVal === data.items[i].name) {

            var albumArtwork = document.createElement('div');
            var nameOfAlbum = document.createElement('div');
            var totalTracks = document.createElement('div');

            // Adding class to the created elements to add styling
            albumArtwork.setAttribute('class', 'albumArtwork');
            nameOfAlbum.setAttribute('class', 'nameOfAlbum');
            totalTracks.setAttribute('class', 'totalTracks');

            totalTracks.innerHTML = 'Amount of Tracks: ' + data.items[i].total_tracks
            albumArtwork.innerHTML = '<img src="' + data.items[i].images[1].url + '" width="200" height="200">';
            nameOfAlbum.textContent = 'Album: ' + data.items[i].name;

            // Adding content after the submit button
            submitBtn.after(nameOfAlbum, totalTracks, albumArtwork);
            console.dir(totalTracks);
            console.log(data.items);
          } else {
            var errorMessage = document.createElement('div');
            errorMessage.textContent = 'Hmmm... It looks like that search doesn\'t exists';
            submitBtn.after(errorMessage);
          }
          // if inputVal = mind of mine show it
        }
      })


    }, // success ends
    error: function(error) {
      console.log(error);
      console.log('There is an error loading the API');
    }
  })
}

  // Create a search
  // if Still Got Tme is searched then show that value inputs option. else 'oops thsi doesnt exist'

}()); // IIFE ends
