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

  // renderFreinds = () => {
  //
  // }

  render() {
    return (
      <div style={friendCard}>
        <a href="/"><div style={friendImgCard}>
          <img style ={friendImg} src='https://cdn.newsapi.com.au/image/v1/5c2055a978a393124521bb577b07a10c'/>
        </div></a>
        <p>Johnny Mac</p>
      </div>
    );
  }
}

export default Friends;
