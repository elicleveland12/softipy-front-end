import React, { Component } from 'react';
import { Redirect } from 'react-router'

class Nav extends Component {

  endSession = () => {
    localStorage.removeItem("user")
    return <Redirect to="/login" />
  }

  render() {
    return (
      <div className="nav">
        <span><button class="playlistButton logout" onClick={this.endSession}>Log Out</button></span>
        <span><h2>SoftiPy</h2></span>
      </div>
    );
  }
}

export default Nav;
