import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import Search from './Search'
import SearchResults from './SearchResults'

class LookupContainer extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <Search />
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchResults />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LookupContainer;
