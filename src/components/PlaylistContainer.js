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

  componentDidMount() {
    fetch('http://localhost:3000/playlists')
    .then(r=>r.json())
    .then(playlists => {
      this.setState({
        playlists
      })
    })
  }

  filterMyPlaylists = () => {
    // debugger

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
    let myPlaylists = this.state.playlists.filter(playlist => playlist.id === localStorage.getItem("user"))
    this.setState({ myPlaylists })
    if (this.state.myPlaylists !== []) {
      return this.state.myPlaylists.map(playlist => {
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
    let foundPlaylist = this.state.playlists.find(playlist => playlist.id === deletePlaylist.id)
    let newPlaylists = this.state.playlists.filter(playlist => playlist.id !== deletePlaylist.id)
    fetch(`http://localhost:3000/playlists/${deletePlaylist.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      this.setState({
        playlists: newPlaylists,
        expandPlaylist: false,
        clickedPlaylist: null
      })
    })
  }

  addNewPlaylist = () => {
    return (
      <div>
        <h2>Playlist Name:</h2>
        <form onSubmit={this.createPlaylist}>
          <input onChange={this.newPlaylistName} type="text" name="newPlaylistName"/>
          <input type="submit" value="Submit" />
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
            <button onClick={this.changePlaylistFormState}>+</button>
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
