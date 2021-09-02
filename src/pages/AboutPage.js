import React from 'react';
import { Container, Button } from 'react-bootstrap';

import styles from "./AboutPage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import programming_jeremy from '../assets/programming_jeremy.svg'
import programming_sam from '../assets/programming_sam.svg'

function AboutPage() {
  return (
    <div>
      <Container>
        <div className={styles.parent}>
          <div className={styles.box}>
            <img src={programming_sam} alt="girl sitting in front of monitors"></img>
          </div>
          <div className={styles.box}>
            <h1>About Us</h1>
            <p>Rhythm Room is a project thought up by Sam and Jeremy. While we both loved listening to music, there is not yet a service that allows you to listen to music with other people without external platforms or subscriptions. Thus, we made Rhythm Room.</p>
            <h1 className={"pt-4"}>Our Stack</h1>
            <ul className={styles.emoji}>
              <li className={styles.emoji}> Application Framework: 			Express </li>
              <li>User Interface: 					React</li>
              <li>Web server:					Node.js</li>
              <li>Hosting platform:				Heroku</li>
              <li>Socket.io</li>
              <li>YouTube iFrame API</li>

            </ul>
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
