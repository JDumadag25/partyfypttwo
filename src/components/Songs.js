import React from 'react'
import { Button } from 'semantic-ui-react'

class Songs extends React.Component{
  render(){
  
    return(
      <li>{this.props.song.name}</li>
    )
  }
}

export default Songs
