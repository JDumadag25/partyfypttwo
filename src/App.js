import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
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
  }
}

checkForPlayer() {
  const { token } = this.state;

  if (window.Spotify !== null) {
    this.player = new window.Spotify.Player({
      name: "Matt's Spotify Player",
      getOAuthToken: cb => { cb(token); },
    });
    // this.createEventHandlers();

    // finally, connect!
    this.player.connect();
  }
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
    <div className="App">
         <div className="App-header">
           <h2>Now Playing</h2>
           <p>A Spotify Web Playback API Demo.</p>
         </div>

         {error && <p>Error: {error}</p>}

         {loggedIn ?
         (<div>
           <p>Artist: {artistName}</p>
           <p>Track: {trackName}</p>
           <p>Album: {albumName}</p>
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

export default App;
