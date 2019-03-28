import React, { Component } from 'react';

import Playlists from './Playlists'

class PlaylistContainer extends Component {

  state = {
    playlists: [],
    expandPlaylist: false,
    clickedPlaylist: null,
    playlistForm: false,
    newPlaylistName: "",
    myPlaylists: [],
    addNewPlaylist: [],
    followPlaylist: false,
    users: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.addNewPlaylist && prevState.addNewPlaylist) {
      // so this is getting set back to true when you click on that playlist for some reason and that's sad
       if (nextProps.addNewPlaylist.id !== prevState.addNewPlaylist.id && prevState.followPlaylist === false) {
         return {
           followPlaylist: true,
           addNewPlaylist: [...prevState.addNewPlaylist, nextProps.addNewPlaylist],
           myPlaylists: [...prevState.myPlaylists, nextProps.addNewPlaylist],
           playlists: [...prevState.playlists, nextProps.addNewPlaylist],
         }
      }
    }

    if (nextProps.users.length !== prevState.users.length) {
      let userId = parseInt(localStorage.getItem("user"));
      let currentUser = nextProps.users.find(user => user.id === userId)
      let myPlaylists = currentUser.playlists
      return ({ myPlaylists, users: nextProps.users })
    }
  }

  followPlaylist = () => {
    if (this.props.toggleFollow) {
      console.log("i am true apparently");
      let newPlaylistId = this.props.addNewPlaylist.id
      let songs = this.props.songs.filter(song => song.playlist_id === newPlaylistId)
      let data = {
        user_id: localStorage.getItem("user"),
        name: this.props.addNewPlaylist.name
      };
      console.log("do u even hit");
      fetch('http://localhost:3000/playlists' , {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(playlist => {
        this.postSongsToNewPlaylist(songs, playlist)
      })
    }
  }

  postSongsToNewPlaylist = (songs, playlist) => {
    let data = [];

    songs.forEach(song => {
      // debugger
      let songData = {
        title: song.title,
        artist: song.artist,
        cover_art: song.cover_art,
        playlist_id: playlist.id,
        preview: song.preview
      }

      data = [...data, songData]
    })

    data.forEach(datum => {
      this.postSongs(datum);
    })
  }

  postSongs = (datum) => {
    fetch('http://localhost:3000/songs' , {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(datum)
    })
    .then(res => res.json())

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

  handleClick = (playlist) => {
    if (this.state.expandPlaylist === false) {
      this.setState({
        expandPlaylist: !this.state.expandPlaylist,
        clickedPlaylist: playlist
      })
      this.props.toggleFollowToFalse()
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

    let data = {
      name: this.state.newPlaylistName,
      user_id: parseInt(localStorage.getItem("user"))
    }
    fetch('http://localhost:3000/playlists', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(newPlaylist => {
      this.setState({
        myPlaylists: [...this.state.myPlaylists, newPlaylist],
        playlists: [...this.state.playlists, newPlaylist],
        playlistForm: false
      })
    })
  }

  // createUserPlaylist = (playlist) => {
  //   let data = {
  //     user_id: localStorage.getItem("user"),
  //     playlist_id: playlist.id
  //   }
  //
  //   fetch('http://localhost:3000/user_playlists' , {
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(res => res.json())
  // }

  goBack = () => {
   this.setState({
     expandPlaylist: !this.state.expandPlaylist,
     clickedPlaylist: null,
     toggleFollow: false
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
    console.log(this.props.toggleFollow, this.state.followPlaylist);
    return (
      <div>
        {this.props.toggleFollow && this.state.followPlaylist ? this.followPlaylist() : null}
        {this.state.expandPlaylist === false ?
          <div>
            <h1 className="header">MY PLAYLISTS</h1>
            <div >
              <button className="playlistButton" onClick={this.changePlaylistFormState}>New Playlist</button>
            </div>
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
