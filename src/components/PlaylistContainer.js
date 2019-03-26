import React, { Component } from 'react';

import Playlists from './Playlists'

class PlaylistContainer extends Component {

  state = {
    playlists: [],
    expandPlaylist: false,
    clickedPlaylist: null,
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

  handleClick = (playlist) => {
    if (this.state.expandPlaylist === false) {
      this.setState({
        expandPlaylist: !this.state.expandPlaylist,
        clickedPlaylist: playlist
      })
    }
  }

  renderSinglePlaylist = () => {
    // hey friends, please implement a back button tomorrow, and you know, if you're feeling it, maybe have the songs display and stuff
    return (
      <Playlists
        playlist={this.state.clickedPlaylist}
        handleClick={this.handleClick}
        songs={this.props.songs}
        expandPlaylist={this.state.expandPlaylist}
        addSong={this.props.addSong}
      />
    )
  }

  renderPlaylists = () => {
    return this.state.playlists.map(playlist => {
      return (
        <Playlists
          key={playlist.id}
          playlist={playlist}
          handleClick={this.handleClick}
          songs={this.props.songs}
          expandPlaylist={this.state.expandPlaylist}
          draggedSong={this.props.draggedSong}
          addSong={this.props.addSong}
        />
      )
    })
  }

  render() {
    return (
      <div>
        {this.state.expandPlaylist === false ?
          this.renderPlaylists() :
          this.renderSinglePlaylist()
        }
      </div>
    );
  }
}

export default PlaylistContainer;
