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

  render() {
    return (
      <div onDragOver={(e)=>e.preventDefault()} onDrop={this.persistSongToPlaylist}
      onDragEnter={(e)=>e.preventDefault()}>
        <p>{this.props.playlist.name}</p>
      </div>
    );
  }
}

export default Playlists;
