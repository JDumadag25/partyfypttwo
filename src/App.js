import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'
import Homepage from './components/Homepage'
import SpotifyWebApi from 'spotify-web-api-js';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';

const spotifyApi = new SpotifyWebApi

const partyplaylist = '64W5bbmXSTUxg6negfo96k'

class App extends React.Component {
  constructor(props){
    super(props)

  const params = this.getHashParams()

  this.state = {
    token: params.access_token,
    refreshToken: params.refresh_token,
    loggedIn: params.access_token ? true : false,
    collabplaylist: '64W5bbmXSTUxg6negfo96k',
    playlist: [],

  }
}

componentDidMount = () => {
  this.getUser()
  // this.getUserPlaylists()
  this.getPlaylists()
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

  getUser = () => {
    spotifyApi.getMe()
    .then(res => this.setState({user: res.id}))
  }

  getPlaylists = () => {
      spotifyApi.getPlaylist(this.state.collabplaylist)
      .then(res => res.tracks.items.map(item => {
        this.setState({playlist:[...this.state.playlist, item.track]})
      }) )
    }


  getSong = async(e) => {
    console.log(e.target.value);
    const res = await spotifyApi.getTrack(e.target.value)
    await this.setState({
      chosenSong: res,
      selectedSong: {
      name: res.name,
      uri: res.uri,
      artist: res.album.artists[0].name,
      image: res.album.images[0].url,
      trackid: res.id
    }
   }
  )
  await this.addSong()
 }

 addSong = async() => {
    let uri = this.state.selectedSong.uri
    const newSong = await spotifyApi.getTrack(this.state.selectedSong.trackid )
    spotifyApi.addTracksToPlaylist(partyplaylist, [uri])
    await this.setState({playlist: [...this.state.playlist, newSong]})
  }



  render(){
    console.log(this.state);
    return (
      <Router>
        <Switch>
          <div className='App'>
            <Homepage/>
            <TopBar/>
            <MusicPlayer token={this.state.token} refreshToken={this.state.refreshToken} loggedIn={this.state.loggedIn}/>
            <SearchBar handleClick={this.getSong}/>
            <Playlist token={this.state.token} playlist={this.state.playlist}/>
          </div>
        </Switch>
      </Router>
    )
  }
}

export default App;
