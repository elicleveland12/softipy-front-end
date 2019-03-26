import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';


//***** STYLING *****//
const resultCard = {
  minHeight: '60px',
  minWidth: '380px',
  borderRadius: '1em',
  boxShadow: '1px 2px 2px rgba(0, 0, 0, .5)',
  overflow: 'scroll'
}

const songImg = {
  borderRadius: '1em',
  height: '95%',
  paddingLeft: '5px',
  paddingTop: '5px',
  paddingBottom: '5px',
  float: 'left',
}

const audioPlayer = {
  height: '30px',
  width: '200px'
}

const artistAndTitle = {
  display: 'inline',
}

const artist = {
  marginTop: '2px',
  fontSize: '120%'
}

const title = {
  fontSize: '90%'
}
//***** STYLING *****//

class CoverArtRender extends Component {

  render() {
    return (
      <ul>
        <div
          draggable="true" onDrag={(song)=>this.props.handleDraggedSong(this.props.result)} onClick={() => console.log("song", this.props.result)} style={resultCard}
        >
          <div>
            <img style={songImg} src={this.props.result.album.cover} />
          </div>
          <div style={artistAndTitle}>
            <p style={artist}>{this.props.result.artist.name}</p>
            <p style={title}>{this.props.result.title}</p>
            <ReactAudioPlayer style={audioPlayer} src={this.props.result.preview} controls />
         </div>
        </div>

      </ul>
    );
  }
}

export default CoverArtRender;
