import React, { Component } from 'react';


class Friends extends Component {
  render() {
    return (
      <div className="friend-card" onClick={() => this.props.handleClick(this.props.user)}>
        <span className="friendImgCard" >
          <img className="friendImg" src={`https://loremflickr.com/320/24${Math.floor(Math.random() * Math.floor(10))}`} />
        </span><br/>
        <span className="username">{this.props.user.username}</span>
      </div>
    );
  }
}

export default Friends;
