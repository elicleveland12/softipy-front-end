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
            <Search search={this.props.search} searchHandler={(e)=>this.props.searchHandler(e)} updateSearchTerm={(e)=>this.props.updateSearchTerm(e)}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchResults results={this.props.searchResults} handleDraggedSong={this.props.handleDraggedSong} searchTerm={this.props.searchTerm}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}



export default LookupContainer;
