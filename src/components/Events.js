import React, { Component } from 'react';

class Events extends Component {
  filterSongs = () => {
    if (this.props.songs !== []) {
      let filteredSongs = this.props.songs.filter(song => song.playlist_id === this.props.playlist.id)
      return filteredSongs
    }
  }

  renderThumbnail = () => {
    let song = this.filterSongs()
    if (song[0]) {
      return song[0].cover_art
    }
  }

  render() {
    return (
      <div
        draggable="false"
      >
        <div>
          <img src={this.renderThumbnail()}/>
          <h4>{this.props.playlist.name}</h4>
          <button
            onClick={() => {
              this.props.addPlaylist(this.props.playlist)
            }}
          >+</button>
        </div>
      </div>
    );
  }
}

export default Events;
