import React, { Component } from 'react';

import Playlists from './Playlists'

class PlaylistContainer extends Component {

  state = {
    playlists: [],
    expandPlaylist: false,
    clickedPlaylist: null,
    playlistForm: false,
    newPlaylistName: "",
    myPlaylists: []
  }

  setMyPlaylists = () => {
    let userId = parseInt(localStorage.getItem("user"));
    let currentUser;
    let myPlaylists = []

    this.state.playlists.forEach(playlist => {
      playlist.users.forEach(user => {
        if (user.id === userId) {
          return currentUser = user;
        }
      })
    })

    this.state.playlists.forEach(playlist => {
      playlist.users.forEach(user => {
        if (user.id === userId) {
          myPlaylists.push(playlist);
        }
      })
    })
    this.setState({ myPlaylists })
  }

  componentDidMount() {
    fetch('http://localhost:3000/playlists')
    .then(r=>r.json())
    .then(playlists => {
      this.setState({
        playlists
      })
    })
    .then(this.setMyPlaylists)
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
    return (
      <Playlists
        playlist={this.state.clickedPlaylist}
        handleClick={this.handleClick}
        songs={this.props.songs}
        expandPlaylist={this.state.expandPlaylist}
        draggedSong={this.props.draggedSong}
        addSong={this.props.addSong}
        deleteSong={this.props.deleteSong}
        goBack={this.goBack}
        deletePlaylist={this.deletePlaylist}
      />
    )
  }

  renderPlaylists = () => {
    //lets figure out how to many-to-many the playlist and user, creating a playlist and having your playlists render while logged inspect
    //logout functionality
    //friends

      // also you need to refresh before they render
      if (this.state.myPlaylists !== []) {
        return (
          this.state.myPlaylists.map(playlist => {
          return (
            <div class="playlist-cards">
              <Playlists
                key={playlist.id}
                playlist={playlist}
                handleClick={this.handleClick}
                songs={this.props.songs}
                expandPlaylist={this.state.expandPlaylist}
                draggedSong={this.props.draggedSong}
                addSong={this.props.addSong}
              />
            </div>
          )
        })
      )
    } else {
      return null;
    }
  }

  newPlaylistName = (e) => {
    this.setState({
      newPlaylistName: e.target.value
    })
  }

  createPlaylist = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/playlists', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newPlaylistName
      })
    })
    .then(res => res.json())
    .then(newPlaylist => {
      this.setState({
        myPlaylists: [...this.state.myPlaylists, newPlaylist],
        playlists: [...this.state.playlists, newPlaylist],
        playlistForm: false
      })
      this.createUserPlaylist(newPlaylist)
    })
  }

  createUserPlaylist = (playlist) => {
    let data = {
      user_id: localStorage.getItem("user"),
      playlist_id: playlist.id
    }
    fetch('http://localhost:3000/user_playlists' , {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
  }

  goBack = () => {
   this.setState({
     expandPlaylist: !this.state.expandPlaylist,
     clickedPlaylist: null
   })
  }

  deletePlaylist = (deletePlaylist) => {
    let foundPlaylist = this.state.myPlaylists.find(playlist => playlist.id === deletePlaylist.id)
    let newPlaylists = this.state.myPlaylists.filter(playlist => playlist.id !== deletePlaylist.id)
    fetch(`http://localhost:3000/playlists/${deletePlaylist.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      this.setState({
        myPlaylists: newPlaylists,
        expandPlaylist: false,
        clickedPlaylist: null
      })
    })
  }

  addNewPlaylist = () => {
    return (
      <div className="playlist-form">
        <h2>Playlist Name:</h2>
        <form onSubmit={this.createPlaylist}>
          <input className="playlist-form-input" onChange={this.newPlaylistName} type="text" name="newPlaylistName"/>
          <br/><br/>
          <input className="playlistButton" type="submit" value="Create Playlist" />
          <br/><br/>
        </form>
      </div>
    )
  }

  changePlaylistFormState = () => {
    this.setState({ playlistForm: !this.state.playlistForm})
  }

  render() {
    return (
      <div>
        {this.state.expandPlaylist === false ?
          <div>
            <button class="new-playlist" onClick={this.changePlaylistFormState}> + </button>
            <br/>
            <h1 className="header">MY PLAYLISTS:</h1>
            {this.state.playlistForm ? this.addNewPlaylist() : null}
            {this.renderPlaylists()}

          </div> :
          <div>
            {this.renderSinglePlaylist()}
          </div>
        }
      </div>
    );
  }
}

export default PlaylistContainer;
