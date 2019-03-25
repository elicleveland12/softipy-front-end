import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import FriendsContainer from './FriendsContainer'
import LookupContainer from './LookupContainer'
import PlaylistContainer from './PlaylistContainer'
import EventContainer from './EventContainer'

const colStyle = {
  height: '90px',
  textAlign: 'center',
  border: '2px solid green',
}

const centerCols = {
  marginTop: '10px',
  marginLeft: '32px',
  height: '500px',
  textAlign: 'center',
  border: '2px solid green',
}

const eventsRow = {
  width: '100%',
  paddingTop: '20px',
  paddingLeft: '17%'
}


class Dashboard extends Component {

  state = {
    draggedSong: []
  }

  handleDraggedSong = (song) => {
    this.setState({
      draggedSong: song
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col style={centerCols} xs={2}>
            <FriendsContainer />
          </Col>
          <Col style={centerCols} xs={5}>
            <LookupContainer handleDraggedSong={this.handleDraggedSong} />
          </Col>
          <Col style={centerCols} xs={4}>
            <PlaylistContainer draggedSong={this.state.draggedSong}/>
          </Col>
        </Row>
        <Row style={eventsRow}>
          <Col style={colStyle} xs={10}>
            <EventContainer />
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default Dashboard;
