import React, { Component } from 'react';

//***** STYLING *****//
const resultCard = {
  marginTop: '15px',
  backgroundImage: 'url("https://cdn-images-1.medium.com/max/1600/1*8FkvzbSdSJ4HNxtuZo5kLg.jpeg")',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  height: '100px',
  width: '100px',
  borderRadius: '1em',
  boxShadow: '1px 2px 2px rgba(0, 0, 0, .5)'
}

const imageTextOverlay = {
  color: 'white',
  paddingTop: ''
}

const resultImg = {
  height: '100%',
  width: '100%',
}
//***** STYLING *****//

class SearchResults extends Component {
  render() {
    return (
      <div style={resultCard}>
        <a href="/"><div style={null}>

        </div></a>
        <p style={imageTextOverlay}>Pink Floyd</p>
      </div>
    );
  }
}

export default SearchResults;
