import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Redirect } from 'react-router'

import Nav from './components/Nav'
import Dashboard from './components/Dashboard'

import './App.css'

class App extends Component {
  render() {
    let localUser = localStorage.getItem('user');

    return (
      <Fragment>
        {
          localUser
          ? (
            <Grid>
              <Row className="Nav">
                <Col xs={12}>
                  <Nav />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Dashboard />
                </Col>
              </Row>
            </Grid>
          )
          : <Redirect to='/login' />
        }
      </Fragment>
    )
  }
}

export default App;
