import React, { Component } from 'react';

import CoverArtRender from './CoverArtRender'

//***** STYLING *****//
const resultContainer = {
  textAlign: 'center',
  marginLeft: '10px'
}
//***** STYLING *****//

class SearchResults extends Component {

  renderSearchResult = () => {
    if (this.props.results.data) {
      return this.props.results.data.map(result => {
        return <CoverArtRender key={result.id} result={result} handleDraggedSong={this.props.handleDraggedSong}/>
      })
    }
  }

  render() {
    return (
      <div style={resultContainer}>
        {this.renderSearchResult()}
      </div>
    );
  }
}

export default SearchResults;
