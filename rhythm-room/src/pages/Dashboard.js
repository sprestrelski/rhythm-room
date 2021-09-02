import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

import styles from './Dashboard.module.css'
import YouTube from "react-youtube";
import { Container, Button, Form, Row, Col, InputGroup, Card, ListGroup } from 'react-bootstrap';
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

let socket;

// reference for connecting react and youtube https://www.freecodecamp.org/news/use-the-youtube-iframe-api-in-react/
// Render function for Prismic headless CMS pages
function Dashboard() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);


  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { name, room } = queryString.parse(location.search)
    console.log(name, room);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {

    });

    return () => {
      socket.off();
    }
    // eslint-disable-next-line no-restricted-globals
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    socket.on("videoUrl", (videoUrl) => {
      setVideoUrl(videoUrl);
    });
  }, []);

  console.log(users)

  const sendMessage = (event) => {
    if (message) {
      event.preventDefault();
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  var [videoUrl, setVideoUrl] = React.useState("");
  var [videoSearch, searchVideoUrl] = React.useState("")
  let videoCode;
  if (videoUrl) {
    try {
      videoCode = videoUrl.split("v=")[1].split("&")[0];
      //queueList.push(videoUrl.split("v=")[1].split("&")[0]);
    }
    catch (error) {
    }

  }

  function searchYT() {
    var searchOpts = {
      maxResults: 1,
      key: "AIzaSyAMmBzTJ-bqXErNLBuIU6TbSrvYV7RjRrs"
    };

    search(videoSearch, searchOpts, function (err, results, pgInfo) {
      if (err) return console.log(err);

      var videoID = String(results[0].id);

      if (queueList.length == 0) {
        setVideoUrl("https://www.youtube.com/watch?v=" + videoID);
        socket.emit('videoUrl', "https://www.youtube.com/watch?v=" + videoID, () => setVideoUrl("https://www.youtube.com/watch?v=" + videoID))
        queueList.push(videoID);
        console.log("queueLength:" + queueList.length);
      } else {
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
    if (e.target.getPlayerState() == 0) {
      console.log("song ended");
      queueList.shift()
      try {
        videoSearch = queueList[0];
        console.log(videoSearch);
        setVideoUrl("https://www.youtube.com/watch?v=" + videoSearch);
        socket.emit('videoUrl', "https://www.youtube.com/watch?v=" + videoSearch, () => setVideoUrl("https://www.youtube.com/watch?v=" + videoSearch))
        console.log('hi im here')
      } catch (error) {
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
          <h1>Rhythm Room: #{room}</h1>
        </div>

        <Card className="mb-4">
          <Card.Body>
            <Card.Title><strong>Listeners</strong></Card.Title>
            <ListGroup variant="flush">
            {users.map((user, i) => <ListGroup.Item>{user.name}</ListGroup.Item>)}
            </ListGroup>
          </Card.Body>
        </Card>

        <div>
          <Row className="mb-5">
            <Col sm={5} >
              <Form.Label htmlFor="songURL">Enter Song URL: </Form.Label>
              <Form.Control placeholder="Song URL" id="songURL" value={videoUrl} onChange={(e) => {setVideoUrl(e.target.value); socket.emit('videoUrl', e.target.value, () => setVideoUrl(e.target.value))}}/>
            </Col>
            <Col sm={5}>
              <form action="#" onSubmit={(e) => { searchYT(); e.preventDefault(); }}>
                <Form.Group>
                  <Form.Label htmlFor="songSearch">Search for a song: </Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control placeholder="Song name" className={styles.leftInput} type="text" value={videoSearch} onChange={(e) => searchVideoUrl(e.target.value)} />
                    <Button className={styles.rightInput} variant="primary" type="submit" >Add to Queue</Button>
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
