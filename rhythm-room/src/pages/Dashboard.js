import React from 'react';
import YouTube from 'react-youtube';

class Dashboard extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        disablekb: 1,
      },
    };

    const videoId = "2g811Eo7K8U"

    return (
      <div>
        <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
  }
}

export default Dashboard;


/*
import React from 'react';
import { Container, Button} from 'react-bootstrap';

import styles from "./Dashboard.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      playerVars: {
      'playsinline': 1
      },
      events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
      }
  });
}

function Dashboard() {

  return (
    <div>
      <Container>
        Dashboard

        <br></br>
        <div id="player"></div> hi
        <script></script>

      </Container>
    </div>

  );
}

export default Dashboard;

        <iframe id="player" type="text/html" width="640" height="390"
          src="http://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
          frameborder="0">
        </iframe>
*/