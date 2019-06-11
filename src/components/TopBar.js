import React from 'react'
import { Button } from 'semantic-ui-react'

class TopBar extends React.Component{
  render(){
    return(
      <div className='TopBar'>
        <Button href='http://localhost:8888'>Log Into Spotify</Button>
      </div>


    )
  }
}

export default TopBar
