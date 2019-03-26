import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'


class Playlists extends Component {
  state = {
    playSong: null
  }

  persistSongToPlaylist = () => {
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
    console.log(song);
    this.setState({
      playSong: song
    }, () => console.log("new state", this.state.playSong))
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
    return (
      <div onDragOver={(e)=>e.preventDefault()} onDrop={this.persistSongToPlaylist}
      onDragEnter={(e)=>e.preventDefault()} onClick={() => this.props.handleClick(this.props.playlist)}>
        {this.props.expandPlaylist ? this.renderSongs() :
          <div>
            <img src={this.renderThumbnail()}/>
            <h4>{this.props.playlist.name}</h4>
          </div>
        }
        <ReactAudioPlayer
          src={this.state.playSong ? this.state.playSong.preview : null}
          controls
        />
      </div>
    );
  }
}

export default Playlists;
