import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi


class Playlist extends React.Component{
  constructor(props){
    super(props)
      spotifyApi.setAccessToken(this.props.token)

      this.state = {
        user:'',
        usersPlaylists: []
      }
  }

  componentDidMount = () => {
    this.getUser()
    this.getUserPlaylists()
  }

  getUser = () => {
    spotifyApi.getMe()
    .then(res => console.log(res.id))
  }

  getUserPlaylists = () => {
  spotifyApi.getUserPlaylists()
  .then(res => this.setState({usersPlaylists: res.items}))
}

  render(){
    console.log(this.state.usersPlaylists);
    return(
      <h2>Playlist</h2>
    )
  }
}

export default Playlist
