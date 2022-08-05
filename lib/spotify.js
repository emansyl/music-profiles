const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks'
const TOP_ENDPOINT = 'https://api.spotify.com/v1/me/top/';
const TRACK_ENDPOINT = 'https://api.spotify.com/v1/tracks/'

const getAccessToken = async (refresh_token) => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });
  
    return response.json();
  };

  export const getUsersPlaylists = async (refresh_token) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(PLAYLISTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  export const getUsersTopTracks = async (refresh_token) => {
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };

  export const getUsersTop = async (refresh_token,slug) => {
    const [limit, offset, time_range,type] = slug;
    const {access_token} = await getAccessToken(refresh_token);
    return fetch(`${TOP_ENDPOINT}${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,

      },
    });
  };


  export const getTrack = async (refresh_token,id) => {
    const {access_token} = await getAccessToken(refresh_token);
    console.log(TRACK_ENDPOINT + id);
    return fetch(TRACK_ENDPOINT + id, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };