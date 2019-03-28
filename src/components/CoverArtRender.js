import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';


class CoverArtRender extends Component {

  render() {
    return (
      <ul>
        <div
          draggable="true"
          onDrag={(song)=>this.props.handleDraggedSong(this.props.result)}
          className="cover-art-div"
        >
          <div>
            <img className="song-img" src={this.props.result.album.cover} />
          </div>
          <div className="artistAndTitle">
            <p className="artist">{this.props.result.artist.name}</p>
            <p className="title">{this.props.result.title}</p>
            <ReactAudioPlayer className="audio" src={this.props.result.preview} controls />
         </div>
        </div>
      </ul>
    );
  }
}

export default CoverArtRender;
