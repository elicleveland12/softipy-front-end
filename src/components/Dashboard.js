import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import FriendsContainer from './FriendsContainer'
import LookupContainer from './LookupContainer'
import PlaylistContainer from './PlaylistContainer'
import EventContainer from './EventContainer'

// const colStyle = {
//   backgroundColor: 'rgb(224, 224, 209, 0.1)',
//   height: '90px',
//   textAlign: 'center',
//   boxShadow: '4px 4px 4px rgba(0, 0, 0, .5)',
//   borderRadius: '1em'
// }
// //
// const eventsRow = {
//   width: '100%',
//   paddingTop: '20px',
//   paddingLeft: '17%'
// }

class Dashboard extends Component {

  state = {
    draggedSong: [],
    search: "",
    searchResults: [],
    allSongs: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/songs')
    .then(r=>r.json())
    .then(songs => {
      this.setState({ allSongs: songs })
    })
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
      this.setState({ searchResults, search: "" })
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

  render() {
    console.log(this.state.draggedSong);
    return (
      <Grid>
        <Row>
          <Col className="playlist-container" xs={2}>
            <FriendsContainer />
          </Col>
          <Col className="playlist-container" xs={5}>
            <LookupContainer handleDraggedSong={this.handleDraggedSong} searchHandler={this.searchHandler} search={this.state.search} updateSearchTerm={this.updateSearchTerm} searchResults={this.state.searchResults}/>
          </Col>
          <Col className="playlist-container" xs={4}>
            <PlaylistContainer draggedSong={this.state.draggedSong} songs={this.state.allSongs} addSong={this.addSong} deleteSong={this.deleteSong}/>
          </Col>
        </Row>
        {/*<Row style={eventsRow}>
          <Col style={colStyle} xs={10}>
            <EventContainer />
          </Col>
        </Row>*/}
      </Grid>
    );
  }
}


export default Dashboard;
