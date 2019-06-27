import React from 'react'
import { Button, Checkbox, Form, List } from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js'
import Results from './Results'

const spotifyApi = new SpotifyWebApi

class SearchBar extends React.Component{

  state = {
  query:'',
  results:[]
}

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ results: [], query: '' })

  handleSearchChange = (e) => {
    this.setState({query: e.target.value})

    setTimeout(() => {
    if (this.state.query.length < 1) return this.resetComponent()

    spotifyApi.search(this.state.query, ['track'], {limit: 10})
    .then(res => this.setState({results: res.tracks.items}))
      }, 500)
   }

  render(){

    const songSearch = this.state.results.map(result => {
      return <Results results={result} handleClick={this.props.handleClick}/>
    })

    return(
    <div>
      <Form>
        <Form.Field style={{marginRight:45}}>
          <label>Add a song to the Playlist</label>
          <input placeholder='Search for Song Title' onChange={this.handleSearchChange}  />
        </Form.Field>
      </Form>
      <div class="eight wide column" style={{overflow: 'auto', maxHeight: 440, padding: 50}}>{songSearch}</div>
    </div>
    )
  }
}

export default SearchBar
