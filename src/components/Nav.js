import React, { Component } from 'react';
import { Redirect } from 'react-router'

class Nav extends Component {
  state = {
    users: []
  }

  endSession = () => {
    localStorage.removeItem("user")
    return <Redirect to="/login" />
  }

  getUserName = () => {
    if (this.state.users.length !== 0) {
      let user = this.state.users.find(user => user.id === parseInt(localStorage.getItem("user")))
      return user.username
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(users => {
      this.setState({
        users
      })
    })
  }

  render() {
    return (
      <div className="nav">
        <span><button className="playlistButton logout" onClick={this.endSession}>Log Out</button></span>
        <span><h6>Welcome {this.getUserName()}</h6></span>
        <span><h2>SoftiPy</h2></span>
      </div>
    );
  }
}

export default Nav;
