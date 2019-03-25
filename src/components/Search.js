import React, { Component } from 'react';

//***** STYLING *****//

const searchBar = {
  marginTop: '10px',
  height: '25px',
  width: '100%'
}
//***** STYLING *****//


class Search extends Component {

  render() {
    return (
      <form onSubmit={this.props.searchHandler}>
        <input
          style={searchBar}
          placeholder="Search"
          onChange={this.props.updateSearchTerm}
          value={this.props.search}
        />
      </form>
    );
  }
}

export default Search;
