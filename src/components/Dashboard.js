import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import FriendsContainer from './FriendsContainer'
import LookupContainer from './LookupContainer'
import PlaylistContainer from './PlaylistContainer'
import EventContainer from './EventContainer'

class Dashboard extends Component {

  state = {
    draggedSong: [],
    search: "",
    searchResults: [],
    allSongs: [],
    searchTerm: null,
    friend: null,
    friendPlaylists: [],
    addNewPlaylist: null,
  }

  componentDidMount() {
    fetch('http://localhost:3000/songs')
    .then(r=>r.json())
    .then(songs => {
      this.setState({ allSongs: songs })
    })
  }

  addPlaylist = (playlist) => {
    this.setState({ addNewPlaylist: playlist });
  }

  addSong = song => {
    let allSongs = this.state.allSongs
    this.setState({
      allSongs: [...allSongs, song]
    })
  }

  deleteSong = newSongs => {
    this.setState({
      allSongs: newSongs
    })
  }

  searchHandler = (e) => {
    e.preventDefault()
    fetch(`https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=${this.state.search}`)
    .then(r=>r.json())
    .then(searchResults => {
      let searchTerm = [...this.state.search]
      this.setState({ searchResults, search: "", searchTerm: searchTerm})
    })
    }

  updateSearchTerm = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleDraggedSong = (song) => {
    this.setState({
      draggedSong: song
    })
  }

  handleClick = (friend) => {
    this.setState({
      friend
    })
  }

  render() {
    return (
      <Grid className="grid">
        <Row>
          <Col className="playlist-container" xs={1.5}>
            <FriendsContainer handleClick={this.handleClick}/>
          </Col>
          <Col className="playlist-container" xs={4}>
            <LookupContainer handleDraggedSong={this.handleDraggedSong} searchHandler={this.searchHandler} search={this.state.search} updateSearchTerm={this.updateSearchTerm} searchResults={this.state.searchResults}
            searchTerm={this.state.searchTerm}/>
          </Col>
          <Col className="playlist-container" xs={4}>
            <PlaylistContainer
              draggedSong={this.state.draggedSong}
              songs={this.state.allSongs}
              addSong={this.addSong}
              deleteSong={this.deleteSong}
              newUserPlaylist={this.state.newUserPlaylist}
              addNewPlaylist={this.state.addNewPlaylist}
            />
          </Col>
        </Row>
        <Row className="events-row">
          <Col xs={11.5}>
            <EventContainer
              songs={this.state.allSongs}
              user={this.state.friend}
              addPlaylist={this.addPlaylist}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default Dashboard;
