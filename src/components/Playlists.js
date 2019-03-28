import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'
import '../App.css'

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
    this.setState({
      playSong: song
    })
  }

  playFirstSong = () => {
    const filterSongs = this.filterSongs();
    if (filterSongs[0]) {
      this.setState({
        playSong: filterSongs[0]
      }, () => {
        return filterSongs[0].preview
      })
    }
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
        {
          mySongs.map(song => {
            return (
              <div
                className={
                  this.state.playSong === song
                  ? 'playing resultCard'
                  : 'resultCard'
                }
                onClick={() => this.playSong(song)}
                key={song.id}
              >
                <img className='song-img' src={song.cover_art} />
                <button className="right" onClick={() => this.deleteSong(song)}>x</button>
                <div className="song-card">
                  <h3>{song.title}</h3>
                  <h5>{song.artist}</h5>
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }

  render() {
    const filterSongs = this.filterSongs();
    return (
      <div
        draggable="false"
        onDragOver={(e)=>e.preventDefault()}
        onDragEnter={(e)=>e.preventDefault()}
        onDrop={this.persistSongToPlaylist}
        onClick={() => this.props.handleClick(this.props.playlist)}
      >
        {
          (this.props.expandPlaylist) ?
          (
            <div className="sticky">
              <img src={this.renderThumbnail()}/>
              <h4>{this.props.playlist.name}</h4>
              <div>
                <button
                  className="playlistButton"
                  onClick={this.props.goBack}
                >Back To My Playlists</button>
                <button
                  className="playlistButton"
                  onClick={() => this.props.deletePlaylist(this.props.playlist)}
                >Delete Playlist</button>
              </div>
              <ReactAudioPlayer
                src={this.state.playSong ? this.state.playSong.preview :
                this.playFirstSong()}
                controls
                autoPlay
              />
              {
                filterSongs[0]
                ? this.renderSongs()
                : <h3>No songs friendo</h3>
              }
            </div>
          ) :
          <div>
            <img src={this.renderThumbnail()}/>
            <h4>{this.props.playlist.name}</h4>
          </div>
        }
      </div>
    );
  }
}

export default Playlists;
