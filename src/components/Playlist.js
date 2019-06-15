import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi


class Playlist extends React.Component{
  constructor(props){
    super(props)
      spotifyApi.setAccessToken(this.props.token)

      this.state = {
        user:''
      }
  }

  componentDidMount = () => {
    this.getUser()
  }

  getUser = () => {
    spotifyApi.getMe()
    .then(res => console.log(res.id))
  }

  render(){
    return(
      <h2>Playlist</h2>
    )
  }
}

export default Playlist
