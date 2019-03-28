import React, { Component, Fragment } from 'react';

import Friends from './Friends'

class FriendsContainer extends Component {
  state = {
    displayFriends: false,
    users: [],
    friends: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(users => {
      this.setState({
        users
      })
    })
  };

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <Friends user={user} handleClick={this.props.handleClick} />
      )
    })
  };

  render() {
    return (
      <div>
        {
          this.state.displayFriends
            ?
          <Fragment>
            <h3>Friends</h3>
            <Friends />
          </Fragment>
            :
          <Fragment>
            <h1 className="friends-header">ALL USERS</h1>
            {this.renderUsers()}
          </Fragment>
        }
      </div>
    );
  }
}

export default FriendsContainer;
