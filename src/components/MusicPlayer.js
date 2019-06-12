import React from 'react';

class MusicPlayer extends React.Component{
  constructor(props) {
    super(props);
    
    const params = this.getHashParams();
    console.log(params);

    this.state = {
      refreshToken: params.refresh_token,
      token: params.access_token,
      deviceId: "",
      loggedIn: params.access_token ? true : false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
    };
     this.playerCheckInterval = null;
  }

  handleLogin() {
  if (this.state.token !== "") {
    this.setState({ loggedIn: true });
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams
  }

  checkForPlayer() {
  const { token } = this.state;

  if (window.Spotify !== null) {
    clearInterval(this.playerCheckInterval);
    this.player = new window.Spotify.Player({
      name: "Justin's Spotify Player",
      getOAuthToken: cb => { cb(token); },
    });
    this.createEventHandlers();

    // finally, connect!
    this.player.connect();
    }
  }

  onStateChanged(state) {
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration,
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });
    }
  }


  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });
    this.player.on('account_error', e => { console.error(e); });
    this.player.on('playback_error', e => { console.error(e); });

    // Playback status updates
    this.player.on('player_state_changed', state => this.onStateChanged(state));

    // Ready
    this.player.on('ready', async data => {
      let { device_id } = data;
      console.log("Let the music play on!");
      await this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
   });
  }

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }

  transferPlaybackHere() {
  const { deviceId, token } = this.state;
  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "device_ids": [ deviceId ],
      "play": true,
    }),
  });
}

  render() {
  const {
    token,
    loggedIn,
    artistName,
    trackName,
    albumName,
    error,
    position,
    duration,
    playing, } = this.state;

  return (
    <div className="MusicPlayer">

         {error && <p>Error: {error}</p>}

         {loggedIn ?
         (<div>
           <p>Artist: {artistName}</p>
           <p>Track: {trackName}</p>
           <p>Album: {albumName}</p>
           <p>
             <button onClick={() => this.onPrevClick()}>Previous</button>
             <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
             <button onClick={() => this.onNextClick()}>Next</button>
           </p>
         </div>)
         :
         (<div>
           <p className="App-intro">
             Enter your Spotify access token. Get it from{" "}
             <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify">
               here
             </a>.
           </p>
           <p>
             <input type="text" value={token} onChange={e => this.setState({ token: e.target.value })} />
           </p>
           <p>
             <button onClick={() => this.handleLogin()}>Go</button>
           </p>
         </div>)
         }
       </div>
  );
  }
}

export default MusicPlayer
