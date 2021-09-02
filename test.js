
import React from "react";
import YouTube from "react-youtube";
import { Container, Button, Form, Row, Col, InputGroup} from 'react-bootstrap';
var search = require('youtube-search');

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Render function for Prismic headless CMS pages
function Dashboard() {
  var [videoUrl, setVideoUrl] = React.useState("");
  var [videoSearch, searchVideoUrl] = React.useState("")
  var queueList = [];
  
  let videoCode;
  if (videoUrl) {
    try{
      videoCode = videoUrl.split("v=")[1].split("&")[0];
    }
    catch (error){
    }
    
  }

  function searchYT(){
    if (videoSearch){

      var searchOpts = {
        maxResults: 5,
        key: "AIzaSyDCylwwLB9f5u6qNSbiTTheE-FPdSB2FVc"
      };

      search(videoSearch, searchOpts, function(err, results, pgInfo) {
        if(err) return console.log(err);

        var videoID = String(results[0].id);

        setVideoUrl("https://www.youtube.com/watch?v=" + videoID);
        return videoID;

      });
    }
    // console.log("video id: " + videoCode + "\nvideoUrl: " + videoUrl);
  }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  return (
    <div>
      <Container>
        <div>
          <h1>Dashboard</h1>
          <div></div>
        </div>
        <div>
        <Row className="mb-5">
            <Col sm={5} >
              <Form.Label htmlFor="songURL">Enter Song URL: </Form.Label>
              <Form.Control id="songURL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
            </Col>
            <Col sm={5}>
              <form action="#" onSubmit={(e) => { searchYT(); e.preventDefault(); }}>
                <Form.Group>
                  <Form.Label htmlFor="songSearch">Search for a song: </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control type="text" value={videoSearch} onChange={(e) => searchVideoUrl(e.target.value)} />
                    <Button variant="primary" type="submit" >Submit</Button>
                  </InputGroup>
                </Form.Group>
              </form>
            </Col>
          </Row>

          
          <div>
            <YouTube
              videoId={videoCode}
              containerClassName="embed embed-youtube"
              onStateChange={(e) => checkElapsedTime(e)}
              opts={opts}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;



import React from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";
import { Container, Button} from 'react-bootstrap';

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Render function for Prismic headless CMS pages
function Dashboard() {
  var [videoUrl, setVideoUrl] = React.useState("");
  var [videoSearch, searchVideoUrl] = React.useState("")
  let videoCode;
  if (videoUrl) {
    try{
      videoCode = videoUrl.split("v=")[1].split("&")[0];
      console.log("videoURL: " + videoCode);
    }
    catch (error){
      console.log("ur BAD");
    }
    
  }

  function searchYT(){
    if (videoSearch){
      videoCode = videoSearch;
      setVideoUrl("https://www.youtube.com/watch?v=" + videoCode);
    }
    console.log("video id: " + videoCode + "\nvideoUrl: " + videoUrl);
    // ckiaNqOrG5U
  }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  return (
    <div>
      <Container>
        <div>
          <h1>Dashboard</h1>
          <div></div>
        </div>
        <div>
        <label htmlFor="songURL">Enter Song URL: </label>
        <input id="songURL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <form action="#" onSubmit={(e) => {searchYT(); e.preventDefault();}}>
          <label htmlFor="songSearch">Search for a song: </label>
          <input type="text" value={videoSearch} onChange={(e) => searchVideoUrl(e.target.value)}/>
          <input type="submit"/>
        </form>
          
          <div>
            <YouTube
              videoId={videoCode}
              containerClassName="embed embed-youtube"
              onStateChange={(e) => checkElapsedTime(e)}
              opts={opts}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;





import React from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";
import { Container, Button} from 'react-bootstrap';

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Render function for Prismic headless CMS pages
function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  let videoCode;
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.95) {
      setModalIsOpen(true);
    }
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  return (
    <div>
      <Container>
        <div>
          <h1>Dashboard</h1>
          <div></div>
        </div>
        <div>
          <label htmlFor="songQ">Search for a Song:</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <div>
            <YouTube
              videoId={videoCode}
              containerClassName="embed embed-youtube"
              onStateChange={(e) => checkElapsedTime(e)}
              opts={opts}
            />
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Exercise Completed"
          style={modalStyles}
        >
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;











import React, { useState } from "react";
import YouTube from 'react-youtube';
import { Container, Button} from 'react-bootstrap';
var search = require('youtube-search');
var videoId = "dQw4w9WgXcQ";

/*
var youtubeSuggest = require('youtube-suggest')
var assert = require('assert')

youtubeSuggest('rick roll').then(function (results) {
  assert(Array.isArray(results))
  assert(typeof results[0] === 'string')

  results.forEach((entry) => {
    console.log(entry);
  });
})
*/

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

    var searchOpts = {
      maxResults: 5,
      key: "AIzaSyDCylwwLB9f5u6qNSbiTTheE-FPdSB2FVc"
    };

    /*
    let videoId = "";

    var promise1 = new Promise(function(resolve, reject){
      resolve(searchYT("wave of you surfaces lyrics")){
      };
    });

    promise1.then(function(){

    });

    function searchYT(searchQuery) {
      var result = search(searchQuery, searchOpts, function(err, results){
        if(err) return console.log(err);

        var videoID = String(results[0].id);
        console.log("in function: " + videoID);
        return videoID;
      });

      return result;
    }
    
    /*
    function searchYT(searchQuery) {
      search(searchQuery, searchOpts, function(err, results) {
        if(err) return console.log(err);
      
      videoId = String(results[0].id);
      console.log("in function: " + videoId);
      //return callback(videoID);
    
      });
    }
    */
    //videoId = searchYT("wave of you surfaces lyrics")
    /*
    searchYT("wave of you surfaces lyrics", function(id){
      console.log("hello id: " + id);
      videoId = id;
    });*/
    /*
    var videoId = "test";

    async function searchYT(searchQuery) {
      search(searchQuery, searchOpts, function(err, results) {
        if(err) return console.log(err);
      
      var videoID = String(results[0].id);
      console.log("in function: " + videoID);
      return videoID;
      
    });
    }

    searchYT("wave of you surfaces lyrics").then(function(value){
        videoId = value;
      }
    );*/
    /*function searchYT(searchQuery) {
      return search(searchQuery, searchOpts, function(err, results) {
        if(err) return console.log(err);
        return results[0].id
      
    });
    }*/
    
        /*searchYT("wave of you surfaces lyrics").then(x => {
      console.log("hello: " + x);
      videoId = x;
    });*/


    

    console.log("video ID: " + videoId);

    return (
      <div>
        <Container>
          Dashboard
        <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />

        <form id="songSearch">
          <label for="songQ">Search for a Song:</label>
          <input type="text" id="songQ" name="songQ"></input>
          <input type="submit" value="Submit"></input>
        </form>
        <script>
          
        </script>
        </Container>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
  }
}

export default Dashboard;


/*

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
*/












import React, { useState } from "react";
import PropTypes from "prop-types";
import YouTube from 'react-youtube';
import { Container, Button} from 'react-bootstrap';
var search = require('youtube-search');
var videoId = "dQw4w9WgXcQ";

class Dashboard extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  loadVideo = () => {
    const { id } = this.props;

    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onReady: this.onPlayerReady,
      },
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render = () => {
    const {id} = this.props;

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi:1,
      },
    };

    var searchOpts = {
      maxResults: 5,
      key: "AIzaSyDCylwwLB9f5u6qNSbiTTheE-FPdSB2FVc"
    };

    /*
    async function searchYT(searchQuery) {
      return search(searchQuery, searchOpts, function(err, results, pgInfo) {
        if(err) return console.log(err);
    
      var videoID = String(results[0].id);
      console.log("in function: " + videoID);
      return videoID;
    
    });
    }
    try{
      var form = document.getElementById("songSearch").elements["songQ"];
      //searchYT(form).then(value => console.log("hello: " + value));
      searchYT(form).then(function(videoId){
        return (
          <div>
        <Container>
          Dashboard
        <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />

        <form id="songSearch">
          <label htmlFor="songQ">Search for a Song:</label>
          <input type="text" id="songQ" name="songQ"></input>
          <input type="submit" value="Submit"></input>
        </form>
        <script>
          
        </script>
        </Container>
      </div>
        );
        
      });
    }
    catch (error){
      console.log(error);
    }*/

    async function searchYT(searchQuery) {
      return search(searchQuery, searchOpts, function(err, results, pgInfo) {
        if(err) return console.log(err);

        var videoID = String(results[0].link);
        //console.log("in function: " + videoID);
        
        return videoID;
    
    });
    }
  
    /*searchYT("wave of you surfaces lyrics").then( function(){
      var videoLink = "https://www.youtube.com/embed/" + videoId +  "?enablejsapi=1";
      console.log(videoLink);
      return (
        <div>
          <Container>
            Dashboard
          <iframe id="iframe"
            width="640" height="360"
            src={videoLink}
          ></iframe>

          <form id="songSearch">
            <label htmlFor="songQ">Search for a Song:</label>
            <input type="text" id="songQ" name="songQ"></input>
            <input type="submit" value="Submit"></input>
          </form>
          <script>
            
          </script>
          </Container>
        </div>
      )
    }


    );*/

    
    console.log("video ID: " + videoId);
    function returnPage(){
      return (
        <div>
          <Container>
            Dashboard
          
          <br></br>
          <div id={`youtube-player-${id}`}/>
          
          <form id="songSearch">
            <label htmlFor="songQ">Search for a Song:</label>
            <input type="text" id="songQ" name="songQ"></input>
            <input type="submit" value="Submit"></input>
          </form>
          <script>
            
          </script>
          </Container>
        </div>
      );
    }
    
    return returnPage();
  }

  
}

export default Dashboard;

/*
<iframe id="iframe"
            width="640" height="360"
            src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
          ></iframe>
          
          _onReady(event) {
    // access to player in all event handlers via event.target
  }
          */















import React, { useState } from "react";
import PropTypes from "prop-types";
import YouTube from 'react-youtube';
import { Container, Button} from 'react-bootstrap';
var search = require('youtube-search');
var videoId = "dQw4w9WgXcQ";
var id = 'M7lc1UVf-VE';

class Dashboard extends React.PureComponent {
  
  /*static propTypes = {
    id: PropTypes.string.isRequired,
  };*/
  
  componentDidMount = () => {
    // On mount, check to see if the API script is already loaded

    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  loadVideo = () => {
    //var { id } = this.props;
    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
      events: {
        onReady: this.onPlayerReady,
      },
    });
  };

  onPlayerReady = event => {
    event.target.playVideo();
  };

  render = () => {

    //var { id } = this.props;
    console.log("props:" + id);
    try{
      id = document.getElementById("songSearch").elements["songQ"];
    }
    catch (error){
      console.log(error);
    }


    return (
      
      <div>
        <Container>
          
          <div id={`youtube-player-${id}`}/>

          <form id="songSearch">
            <label htmlFor="songQ">Search for a Song:</label>
            <input type="text" id="songQ" name="songQ"></input>
            <input type="submit" value="Submit"></input>
          </form>
        </Container>
      </div>

      
    );
  };
}

export default Dashboard;