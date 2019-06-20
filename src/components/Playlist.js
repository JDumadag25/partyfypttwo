import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi


class Playlist extends React.Component{
  constructor(props){
    super(props)
      spotifyApi.setAccessToken(this.props.token)

      this.state = {
        user:'',
        usersPlaylists: [],
        collabplaylist: '64W5bbmXSTUxg6negfo96k'
      }
  }

  componentDidMount = () => {
    this.getUser()
    this.getUserPlaylists()
  }

  getUser = () => {
    spotifyApi.getMe()
    .then(res => this.setState({user: res.id})
  }

  getUserPlaylists = () => {
  spotifyApi.getUserPlaylists()
  .then(res => this.setState({usersPlaylists: res.items}))
}

getPlaylists = () => {
    console.log('playlist rendered');
    spotifyApi.getPlaylist(this.state.user, this.state.collabplaylist)
    .then(res => res.tracks.items.map(item => {
      this.setState({playlist:[...this.state.playlist, item.track]})
    }) )
  }

  render(){
    console.log(this.state.usersPlaylists);
    return(
      <h2>Playlist</h2>
    )
  }
}

export default Playlist
