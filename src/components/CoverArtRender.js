import React, { Component } from 'react';

//***** STYLING *****//
const resultCard = {
  display: 'inline',
  marginTop: '15px',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  height: '100px',
  width: '100px',
  borderRadius: '1em',
  boxShadow: '1px 2px 2px rgba(0, 0, 0, .5)',
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

class CoverArtRender extends Component {

  render() {
    return (
      <div draggable="true" onDrag={(song)=>this.props.handleDraggedSong(this.props.result)} style={resultCard}>
        <img src={this.props.result.album.cover} />
        <p>{this.props.result.artist.name}</p>
        <p>{this.props.result.title}</p>
      </div>
    );
  }
}

export default CoverArtRender;

// <audio controls>
//   <source src={this.props.result.preview}
//     type='audio/mp3'>
//   </source>
//   </audio>
