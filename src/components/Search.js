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
      <form>
        <input
          style={searchBar}
          placeholder="Search"
          onChange={() => console.log("~YeEt~")}
        />
      </form>
    );
  }
}

export default Search;
