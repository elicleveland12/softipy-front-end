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
      <span className="border">
        <span className="friend-playlist-card" draggable="false">
          <button
            onClick={() => {
              this.props.addPlaylist(this.props.playlist)
            }}
            className="move-title-and-button right"
          >+</button>
          <img className="image"src={this.renderThumbnail()}/>
          <h4 className="move-title-and-button">{this.props.playlist.name}</h4>

        </span>
      </span>
    );
  }
}

export default Events;
