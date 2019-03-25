import React, { Component } from 'react';



class Playlists extends Component {

  persistSongToPlaylist = () => {
    let data = {
      title: this.props.draggedSong.title,
      artist: this.props.draggedSong.artist.name,
      cover_art: this.props.draggedSong.album.cover,
      playlist_id: this.props.playlist.id
    }
    fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(console.log)
  }

  filterSongs = () => {
    // debugger
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
      <div onDragOver={(e)=>e.preventDefault()} onDrop={this.persistSongToPlaylist}
      onDragEnter={(e)=>e.preventDefault()} onClick={() => this.props.handleClick(this.props.playlist)}>
        <img src={this.renderThumbnail()}/>

      </div>
    );
  }
}

export default Playlists;
