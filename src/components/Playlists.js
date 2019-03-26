import React, { Component } from 'react';
import MusicPlayer from './MusicPlayer'


class Playlists extends Component {
  state = {
    playSong: null
  }

  persistSongToPlaylist = () => {
    console.log(this.props.draggedSong);
    //preview, don't lie... you do work.
    let data = {
      title: this.props.draggedSong.title,
      artist: this.props.draggedSong.artist.name,
      cover_art: this.props.draggedSong.album.cover,
      playlist_id: this.props.playlist.id,
      preview: this.props.draggedSong.preview
    }
    console.log(data);
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
    debugger
    console.log(song);
    this.setState({
      playSong: song
    }, () => console.log(this.state.playSong))
  }

  renderSongs = () => {
    let mySongs = this.filterSongs()
    return (
      <div>
        <img src={this.renderThumbnail()}/>
        <h4>{this.props.playlist.name}</h4>
        <ul>
        {mySongs.map(song => <li onClick={() => this.playSong(song)} key={song.id}>{song.title}: {song.artist}</li>)}
        </ul>
      </div>
    )
  }

  render() {
    console.log(this.props);
    return (
      <div onDragOver={(e)=>e.preventDefault()} onDrop={this.persistSongToPlaylist}
      onDragEnter={(e)=>e.preventDefault()} onClick={() => this.props.handleClick(this.props.playlist)}>
      {this.props.expandPlaylist ? this.renderSongs() :
        <div>
          <img src={this.renderThumbnail()}/>
          <h4>{this.props.playlist.name}</h4>
        </div>
      }
      {this.state.playSong ? <MusicPlayer playSong={this.state.playSong}/> : null}
      </div>
    );
  }
}

export default Playlists;
