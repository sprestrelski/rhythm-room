import React from "react";
import YouTube from "react-youtube";
import { Container, Button, Form, Row, Col, InputGroup} from 'react-bootstrap';
var search = require('youtube-search');
var queueList = [];

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

// reference for connecting react and youtube https://www.freecodecamp.org/news/use-the-youtube-iframe-api-in-react/
// Render function for Prismic headless CMS pages
function Dashboard() {
  var [videoUrl, setVideoUrl] = React.useState("");
  var [videoSearch, searchVideoUrl] = React.useState("")

  let videoCode;
  if (videoUrl) {
    try{
      videoCode = videoUrl.split("v=")[1].split("&")[0];
      //queueList.push(videoUrl.split("v=")[1].split("&")[0]);
    }
    catch (error){
    }
    
  }

  
  /*if (queueList.length != 0){
    setVideoUrl("https://www.youtube.com/watch?v=" + queueList[0]);
    console.log(queueList);
  }*/

  function searchYT(){
    var searchOpts = {
      maxResults: 1,
      key: "AIzaSyAMmBzTJ-bqXErNLBuIU6TbSrvYV7RjRrs"
    };

    search(videoSearch, searchOpts, function(err, results, pgInfo) {
      if(err) return console.log(err);

      var videoID = String(results[0].id);
      
      if (queueList.length == 0){
        setVideoUrl("https://www.youtube.com/watch?v=" + videoID);
        queueList.push(videoID);
        console.log("queueLength:" + queueList.length);
      }else{
        queueList.push(videoID);
      }
      //return videoID;

    });
    //console.log("video id: " + videoCode + "\nvideoUrl: " + videoUrl);
    console.log("queueLength: OUTSIDE " + queueList.length);
  }

  const checkElapsedTime = (e) => {
    console.log("playerState: " + e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (e.target.getPlayerState() == 0){
      console.log("song ended");
      queueList.shift()
      try {
        videoSearch = queueList[0];
        console.log(videoSearch);
        setVideoUrl("https://www.youtube.com/watch?v=" + videoSearch);
      } catch (error){
        console.log("yikes bro");
      }
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
                    <Button variant="primary" type="submit" >Add to Queue</Button>
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
