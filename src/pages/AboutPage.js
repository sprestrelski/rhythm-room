import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import styles from "./AboutPage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import programming_jeremy from '../assets/programming_jeremy.svg'
import programming_sam from '../assets/programming_sam.svg'

function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About | Rhythm Room</title>
      </Helmet>
      <Container>
        <div className={styles.parent}>
          <div className={styles.box}>
            <img src={programming_sam} alt="girl sitting in front of monitors"></img>
          </div>
          <div className={styles.box}>
            <h1>About Us</h1>
            <p>Rhythm Room enables you to listen to music and watch videos with your friends synchronously. Create a room, invite some friends, and queue up a song from your favorite artist.</p>
            <h1 className={"pt-4"}>Our Stack</h1>
            <ol>
              <li style={{paddingLeft: "1em"}}> The YouTube iFrame API is used to create an embedded player, which has customizable player controls and parameters.</li>
              <li style={{paddingLeft: "1em"}}>youtube-search is used to search for new songs, querying the user input and returning the video ID of the first search result. React states are used to update the text fields once the URL and video ID have been found.</li>
              <li style={{paddingLeft: "1em"}}>If a song is currently playing, newly queued songs are added to an array and played once the current video ends.</li>
              <li style={{paddingLeft: "1em"}}>Socket.io is used to enable real-time event-based communication between the browser and server, allowing users to make and join rooms. Room links are generating using the name of the user and the name of the room.</li>
              <li style={{paddingLeft: "1em"}}>Socket.io is used to syncing audio and video across multiple clients.</li>
            </ol>
          </div>
        </div>
        <div className={styles.parent}>
          <div className={styles.box}>
            <h1>Features</h1>
            <ul className={styles.emoji}>
              <li>Show queue + next up songs</li>
              <li>Play controls (play, pause, skip)</li>
              <li>Add new songs individually (select/search from YouTube)</li>
              <li>Multiple rooms, unique room links to invite friends</li>
            </ul>
          </div>
          <div className={styles.box}>
            <img src={programming_jeremy} alt="guy sitting in front of monitors"></img>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
