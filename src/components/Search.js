import React, { Component } from 'react';
import '../App.css'

class Search extends Component {

  render() {
    return (
      <div className="search-div">
        <h1 className="header">SEARCH:</h1>
        <form onSubmit={this.props.searchHandler}>
          <input
            className="search-input"
            placeholder="Search"
            onChange={this.props.updateSearchTerm}
            value={this.props.search}
          />
        </form>
      </div>
    );
  }
}

export default Search;
