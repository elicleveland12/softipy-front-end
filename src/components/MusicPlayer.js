import React from "react";

class MusicPlayer extends React.Component {

  render() {
    return (
      <div>
        <audio controls>
          <source src={this.props.playSong.preview}
            type='audio/mp3' key={this.props.playSong.id}>
          </source>
        </audio>
      </div>
    )
  }
}
export default MusicPlayer
