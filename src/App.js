import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'
import Homepage from './components/Homepage'
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi


class App extends React.Component {
  constructor(props){
    super(props)

  const params = this.getHashParams()

  this.state = {
    token: params.access_token
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

  getSong = (e) => {
    console.log(e.target.value);
    spotifyApi.getTrack(e.target.value)
    .then(res => console.log(res))

  }

  render(){
    return (
      <div className='App'>
        <Homepage/>
        <TopBar/>
        <MusicPlayer/>
        <SearchBar handleClick={this.getSong}/>
        <Playlist token={this.state.token}/>
      </div>
    )
  }
}

export default App;
