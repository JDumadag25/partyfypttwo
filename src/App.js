import React from 'react';
import logo from './logo.svg';
import './App.css';
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'


class App extends React.Component {
  render(){
    return (
      <div className='App'>
        <TopBar/>
        <MusicPlayer/>
      </div>
    )
  }
}

export default App;
