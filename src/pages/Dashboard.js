import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

import styles from './Dashboard.module.css'
import YouTube from "react-youtube";
import { Container, Button, Form, Row, Col, InputGroup, Card, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BlockList } from "net";
var search = require('youtube-search');
var queueList = [];
var queueExtended = [];

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
/*
  Sample results output
  channelId: "UCuAXFkgsw1L7xaCfnd5JJOw"
  channelTitle: "Rick Astley"
  description: "Rick Astley's official music video for “Never Gonna Give You Up” Subscribe to the official Rick Astley YouTube channel: https://RickAstley.lnk.to/YTSubID Follow ..."
  id: "dQw4w9WgXcQ"
  kind: "youtube#video"
  link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  publishedAt: "2009-10-25T06:57:33Z"
  thumbnails: {default: {…}, medium: {…}, high: {…}}
  title: "Rick Astley - Never Gonna Give You Up

  Sample results converted to array
  0: "DYCEXg4_lCM"
  1: "https://www.youtube.com/watch?v=DYCEXg4_lCM"
  2: "youtube#video"
  3: "2021-06-21T06:30:02Z"
  4: "UCgPClNr5VSYC3syrDUIlzLw"
  5: "Adult Swim"
  6: "FULL EPISODE | Rick and Morty Season 5 Premiere: Mort Dinner Rick Andre | adult swim"
  7: "Big man coming for dinner, broh. Better check the booze. Watch the full season 5 premiere here, and catch all-new episodes of Rick and Morty Sundays at 11pm ..."
  8:
  default: {url: "https://i.ytimg.com/vi/DYCEXg4_lCM/default.jpg", width: 120, height: 90}
  high: {url: "https://i.ytimg.com/vi/DYCEXg4_lCM/hqdefault.jpg", width: 480, height: 360}
  medium: {url: "https://i.ytimg.com/vi/DYCEXg4_lCM/mqdefault.jpg", width: 320, height: 180}

*/

// Render function for Prismic headless CMS pages
function Dashboard() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);


  const ENDPOINT = '';

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
    }
    catch (error) { }

  }

  // uses youtube-search to grab the first search result from youtube for the query
  function searchYT() {
    var searchOpts = {
      maxResults: 1,
      key: "AIzaSyDfSmuXOfLmNURbPDIcgV5UGvrZhEZtIKo"
    };

    search(videoSearch, searchOpts, function (err, results, pgInfo) {
      if (err) return console.log(err);

      var videoID = String(results[0].id);
      console.log(results);

      // if queue list doesn't have songs in it, set the url directly to the playing video; otherwise, add it to the queue
      if (queueList.length == 0) {
        setVideoUrl("https://www.youtube.com/watch?v=" + videoID);
        socket.emit('videoUrl', "https://www.youtube.com/watch?v=" + videoID, () => setVideoUrl("https://www.youtube.com/watch?v=" + videoID))
        queueList.push(videoID);
        //queueExtended.push(Object.values(results[0]));
        //console.log("queueLength:" + queueList.length);
      } else {
        //queueList.push(Object.values(results[0]));
        queueList.push(videoID);
      }

    });
  }

  // check if the video has finished
  const checkElapsedTime = (e) => {
    //console.log("playerState: " + e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (e.target.getPlayerState() == 0) {
      console.log("song ended");
      queueList.shift()
      try {
        // change the currently playing video to the next one in the list. if there is none, oh well
        videoSearch = queueList[0];
        //videoSearch = queueList[0][0];
        console.log(videoSearch);
        setVideoUrl("https://www.youtube.com/watch?v=" + videoSearch);
        socket.emit('videoUrl', "https://www.youtube.com/watch?v=" + videoSearch, () => setVideoUrl("https://www.youtube.com/watch?v=" + videoSearch))
        console.log('hi im here')
      } catch (error) {
        console.log("yikes bro");
      }
    }
  };

  // PARAMETERS FOR THE IFRAME
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      width: 560,
      height: 315
    }
  };

  const renderTooltip = props => (
    <Tooltip {...props}>Copied!</Tooltip>
  );

  return (
    <div className={styles.backgroundColor}>
      <Container>
        <div className={styles.parent}>
          <div className={styles.flex}>
            <h1 className="my-0 py-0 mb-2">Rhythm Room: #{room}</h1>
            <OverlayTrigger placement="top" trigger='click' overlay={renderTooltip}>
              <Button style={{display: "block"}}className="mb-4" onClick={() => { navigator.clipboard.writeText(`https://rhythmroom.herokuapp.com/dashboard?name=listener&room=${room}`) }}>Copy Link</Button>
            </OverlayTrigger>
            <Form.Label htmlFor="songURL">Enter Song URL: </Form.Label>
            <Form.Control placeholder="Song URL" id="songURL" value={videoUrl} onChange={(e) => { setVideoUrl(e.target.value); socket.emit('videoUrl', e.target.value, () => setVideoUrl(e.target.value)) }} />
            <form action="#" onSubmit={(e) => { searchYT(); e.preventDefault(); }}>
              <Form.Group className='mb-4'>
                <Form.Label htmlFor="songSearch" className='pt-4'>Search for a song: </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control placeholder="Song name" className={styles.leftInput} type="text" value={videoSearch} onChange={(e) => searchVideoUrl(e.target.value)} />
                  <Button className={styles.rightInput} variant="primary" type="submit" >Add to Queue</Button>
                </InputGroup>
              </Form.Group>
            </form>
            <div>
              <YouTube
                videoId={videoCode}
                containerClassName="embed-youtube"
                onStateChange={(e) => checkElapsedTime(e)}
                opts={opts}
              />
            </div>
          </div>

          <div className={styles.flex}>

            <InputGroup hasValidation className="mb-4">
              <Form.Control placeholder="New Name" className={styles.leftInput} type="text" onChange='' />
              <Button className={styles.rightInput} variant="primary" type="submit" >Change name</Button>
            </InputGroup>

            <Card className="mb-4">
              <Card.Body>
                <Card.Title><strong>Listeners</strong></Card.Title>
                <ListGroup variant="flush">
                  {users.map((user, i) => <ListGroup.Item>{user.name}</ListGroup.Item>)}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>

        </div>

      </Container >
    </div >
  );
}

export default Dashboard;

/*
        <h1>Queue</h1>
        <ul>
          {queueList.map(song => <li>{song}</li>)}
        </ul>
          {queueList.map((song, index) => {
            return(
              <li>
                {song.map((songParams, sIndex) =>{
                return <li>{song}</li>;
              })}
              </li>

            );
          })}
*/