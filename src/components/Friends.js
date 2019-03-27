import React, { Component } from 'react';


//***** STYLING *****//
const friendCard = {
  border: '1px solid green',
  borderRadius: '1em',
  boxShadow: '1px 2px 4px rgba(0, 0, 0, .5)'
}

const friendImgCard = {
  marginTop: '5px',
  paddingLeft: '45px',
  height: '70px',
  width: '80px',
}

const friendImg = {
  height: '100%',
  width: '100%',
}
//***** STYLING *****//


class Friends extends Component {
  render() {
    return (
      <div style={friendCard} onClick={() => this.props.handleClick(this.props.user)}>
        <div style={friendImgCard}>
          <img style ={friendImg} src={`https://loremflickr.com/320/24${this.props.user.id}`} />
        </div>
        <p>{this.props.user.username}</p>
      </div>
    );
  }
}

export default Friends;
