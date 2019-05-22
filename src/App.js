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
  }
  render() {
    /* ... */
    return(
      <MusicPlayer/>
    )
  }

}

export default App;
