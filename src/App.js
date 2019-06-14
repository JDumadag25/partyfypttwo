import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'
import SearchBar from './components/SearchBar'
import Playlist from './components/Playlist'


class App extends React.Component {
  render(){
    return (
      <div className='App'>
        <TopBar/>
        <MusicPlayer/>
        <SearchBar/>
        <Playlist/>
      </div>
    )
  }
}

export default App;
