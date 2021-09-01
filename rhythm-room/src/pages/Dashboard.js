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
  let videoCode;
  if (videoUrl) {
    try {
      videoCode = videoUrl.split("v=")[1].split("&")[0];
    }
    catch (error) {
    }

  }

  function searchYT() {
    if (videoSearch) {

      var searchOpts = {
        maxResults: 5,
        key: "AIzaSyDCylwwLB9f5u6qNSbiTTheE-FPdSB2FVc"
      };

      search(videoSearch, searchOpts, function (err, results, pgInfo) {
        if (err) return console.log(err);

        var videoID = String(results[0].id);
        //console.log("in function: " + videoID);

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
