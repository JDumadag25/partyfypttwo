import React from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import Songs from './Songs'

const spotifyApi = new SpotifyWebApi


class Playlist extends React.Component{
  constructor(props){
    super(props)
      spotifyApi.setAccessToken(this.props.token)

      this.state = {
        user:'',
        usersPlaylists: [],
        collabplaylist: '64W5bbmXSTUxg6negfo96k',
        playlist:[]
      }
  }

  componentDidMount = () => {
    //this.getUser()
    this.getUserPlaylists()
    //this.getPlaylists()
  }

  // getUser = () => {
  //   spotifyApi.getMe()
  //   .then(res => this.setState({user: res.id}))
  // }

  getUserPlaylists = () => {
  spotifyApi.getUserPlaylists()
  .then(res => console.log(res))
}

// getPlaylists = () => {
//     spotifyApi.getPlaylist(this.state.collabplaylist)
//     .then(res => res.tracks.items.map(item => {
//       this.setState({playlist:[...this.state.playlist, item.track]})
//     }) )
//   }


  render(){
    const songs = this.props.playlist.map(song => {
    return <Songs song={song}/>
  })

    return(
      <div>
      <h2>Playlist</h2>
      {songs}
      </div>
    )
  }
}

export default Playlist
