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
        <span>
          <button className="logout" onClick={this.endSession}>Log Out</button>
          <span className="welcome">Welcome {this.getUserName()}</span>
        </span>
        <br/><br/>
        <div className="softipy">
        <h2>SoftiPy</h2>
        </div>
      </div>
    );
  }
}

export default Nav;
