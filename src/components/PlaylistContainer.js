import React, { Component } from 'react';

import Playlists from './Playlists'

class PlaylistContainer extends Component {

  state = {
    playlists: []
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

  renderPlaylists = () => {
    return this.state.playlists.map(playlist => {
      return <Playlists key={playlist.id} playlist={playlist} draggedSong={this.props.draggedSong}/>
    })
  }

  render() {
    return (
      <div>
        <h3>PlaylistContainer</h3>
        {this.renderPlaylists()}
      </div>
    );
  }
}

export default PlaylistContainer;
