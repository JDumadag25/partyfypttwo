import React from 'react'

class Songs extends React.Component{
  render(){
    console.log(this.props.song);
    return(
      <li>{this.props.song.name}</li>
    )
  }
}

export default Songs
