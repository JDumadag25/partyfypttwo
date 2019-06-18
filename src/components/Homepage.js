import React from 'react'
import { Button } from 'semantic-ui-react'

class Homepage extends React.Component{
  render(){
    return(
      <div>
        <h2>Welcome to Party-fy</h2>
        <Button>Host a Party Room</Button>
        <Button>Join a Party Room</Button>
      </div>
    )
  }
}

export default Homepage
