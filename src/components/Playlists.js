import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'


class Playlists extends Component {
  state = {
    playSong: null
  }

  persistSongToPlaylist = () => {
    let data = {
      title: this.props.draggedSong.title,
      artist: this.props.draggedSong.artist.name,
      cover_art: this.props.draggedSong.album.cover,
      playlist_id: this.props.playlist.id,
      preview: this.props.draggedSong.preview
    }

    fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(song => {
      this.props.addSong(song)
    })
  }

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

  playSong = (song) => {
    console.log(song);
    this.setState({
      playSong: song
    })
  }

  deleteSong = (song) => {
    let newSongs = this.props.songs.filter(s => {
      return s.id !== song.id;
    })

    fetch(`http://localhost:3000/songs/${song.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      this.props.deleteSong(newSongs)
    })
  }

  renderSongs = () => {
    let mySongs = this.filterSongs()
    return (
      <div>
        <button onClick={this.props.goBack}>Back To My Playlists</button>
        <button onClick={() => this.props.deletePlaylist(this.props.playlist)}>Delete Playlist</button>
        <img src={this.renderThumbnail()}/>
        <h4>{this.props.playlist.name}</h4>
        <ul>
        {mySongs.map(song => {
          return (
            <li
              onClick={() => this.playSong(song)}
              key={song.id}
            >
              {song.title}: {song.artist}
              <button onClick={() => this.deleteSong(song)}>Delete</button>
            </li>
          );
        })}
        </ul>
      </div>
    )
  }

  render() {
    const filterSongs = this.filterSongs();
    return (
      <div
        onDragOver={(e)=>e.preventDefault()}
        onDragEnter={(e)=>e.preventDefault()}
        onDrop={this.persistSongToPlaylist}
        onClick={() => this.props.handleClick(this.props.playlist)}
      >
        {
          this.props.expandPlaylist ?
          this.renderSongs() :
          <div>
            <img src={this.renderThumbnail()}/>
            <h4>{this.props.playlist.name}</h4>
          </div>
        }
        {
          this.props.expandPlaylist ?
          <ReactAudioPlayer
            src={this.state.playSong ? this.state.playSong.preview : filterSongs[0].preview}
            controls
            autoPlay
          /> :
          null
        }
      </div>
    );
  }
}

export default Playlists;
