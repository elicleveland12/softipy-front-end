import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import Search from './Search'
import SearchResults from './SearchResults'

class LookupContainer extends Component {

  state = {
    search: "",
    searchResults: []
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

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <Search searchHandler={(e)=>this.searchHandler(e)} updateSearchTerm={(e)=>this.updateSearchTerm(e)}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchResults results={this.state.searchResults}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LookupContainer;
