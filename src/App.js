import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import Nav from './components/Nav'
import Dashboard from './components/Dashboard'

const colStyle = {
  height: '50px',
  textAlign: 'center',
  border: '2px solid green',
}

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="Nav">
          <Col style={colStyle} xs={12}>
            <Nav />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Dashboard />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
