import React, { Component } from 'react';

import CoverArtRender from './CoverArtRender'

//***** STYLING *****//
//***** STYLING *****//

class SearchResults extends Component {

  renderSearchResult = () => {
    if (this.props.results.data) {
      return this.props.results.data.map(result => {
        return <CoverArtRender result={result}/>
      })
    }
  }

  render() {
    return (
      <div>
        {this.renderSearchResult()}
      </div>
    );
  }
}

export default SearchResults;
