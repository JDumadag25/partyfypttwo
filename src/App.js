import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'


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

  render(){
    return (
      <div className='App'>
        <TopBar/>
        <MusicPlayer/>
        <SearchBar/>
        <Playlist token={this.state.token}/>
      </div>
    )
  }
}

export default App;
