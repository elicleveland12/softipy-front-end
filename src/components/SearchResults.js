import React, { Component } from 'react';

import CoverArtRender from './CoverArtRender'

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
      <div className="results-container" >
        {this.renderSearchResult()}
      </div>
    );
  }
}

export default SearchResults;
