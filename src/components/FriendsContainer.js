import React, { Component } from 'react';

import Friends from './Friends'

class FriendsContainer extends Component {
  render() {
    return (
      <div>
        <h3>Friends</h3>
        <Friends />
      </div>
    );
  }
}

export default FriendsContainer;
