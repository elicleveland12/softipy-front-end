import React, { Component, Fragment } from 'react';
import Events from './Events'

class EventContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      friendsPlaylists: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/playlists')
    .then(r=>r.json())
    .then(playlists => {
      this.setState({
        playlists
      })
    })
  }

  renderFriendsPlaylists = () => {
    let friendsPlaylists = [];

    if (this.props.user) {
      let userId = this.props.user.id;

      this.state.playlists.forEach(playlist => {
        playlist.users.forEach(user => {
          if (user.id === userId) {
            friendsPlaylists.push(playlist);
          }
        })
      })

      return friendsPlaylists.map(playlist => {
        return (
          <Events
            playlist={playlist}
            songs={this.props.songs}
            addPlaylist={this.props.addPlaylist}
          />
        )
      })
    }
  }

  render() {
    return (
      <div>
        {
          this.props.user
            ?
          <div className="friend-playlist-list">
            <h3>{this.props.user.username}'s Playlists</h3>
            {this.renderFriendsPlaylists()}
          </div>
            :
          null
        }
      </div>
    );
  }
}

export default EventContainer;
