// set authorization as header for API call
function get_auth_header(token) {
    return {
        Authorization: `Bearer ${token}`,
        //test
    };
}

// API call for tracks
function search_for_track(token, track_name) {
  return fetch(
    `https://api.spotify.com/v1/search?q=${track_name}&type=track&limit=1`,
    {
      headers: get_auth_header(token),
    }
  );
}

// API call for albums
function search_for_album(token, album_name) {
  return fetch(
    `https://api.spotify.com/v1/search?q=${album_name}&type=album&limit=1`,
    {
      headers: get_auth_header(token),
    }
  );
}

// API call for artists
function search_for_artist(token, artist_name) {
  return fetch(
    `https://api.spotify.com/v1/search?q=${artist_name}&type=artist&limit=1`,
    {
      headers: get_auth_header(token),
    }
  );
}

<<<<<<< HEAD
function retrieve_lyrics(track, artist) {
  // documentation: https://developer.musixmatch.com/documentation
  return fetch(
    `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=${track}&q_artist=${artist}&apikey=${musixmatch_api_key}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

=======
>>>>>>> origin/noah-branch
// colors to easily differentiate terminal:
const colors = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  bgBlack: "\x1b[40m",
  bgMagenta: "\x1b[45m",
};

module.exports = {
<<<<<<< HEAD
  get_auth_header,
  search_for_track,
  search_for_album,
  search_for_artist,
  retrieve_lyrics,
  colors,
=======
    get_auth_header,
    search_for_track,
    search_for_album,
    search_for_artist,
    colors,
>>>>>>> origin/noah-branch
};
