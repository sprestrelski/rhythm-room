import React from 'react';
import { Container, Button } from 'react-bootstrap';

import styles from "./HomePage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import music_design from '../assets/music_design.svg'
import marshmello from '../assets/marshmello.svg'
import friends from '../assets/friends.svg'
import cat from '../assets/cat.svg'
import coding from '../assets/coding.svg'

function HomePage() {
  return (
    <div>
      <div className={styles.section1}>
        <Container>
          <div className={styles.parent}>
            <div className={styles.box}>
              <img src={music_design}></img>
            </div>
            <div className={styles.box}>
              <h1>Listen with your friends</h1>
              <Button type="button" class="btn btn-link" className={styles.button}>Create Room</Button>
              <a class="px-4">Join Room</a>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.section2}>
        <Container>
          <h1 className={styles.heading}>How it works</h1>
          <div className={styles.parent}>
            <div className={styles.box}>
              <img src={marshmello}></img>
              <div className={styles.numberCircle}>
                1
              </div>
              <p>Play your favorite artists</p>
            </div>
            <div className={styles.box}>
              <img src={friends}></img>
              <div className={styles.numberCircle}>
                2
              </div>
              <p>Add your friends</p>
            </div>
            <div className={styles.box}>
              <img src={cat}></img>
              <div className={styles.numberCircle}>
                3
              </div>
              <p>Listen together!</p>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.section3}>
        <Container>
          <div className={styles.parent}>
            <div className={styles.box}>
              <img src={coding}></img>
            </div>
            <div className={styles.box}>
              <h1>About</h1>
              <p>Rhythm Room is a web app dedicated to listening to and sharing the spis-iest beats with your friends.</p>
              <p>Want a break from the ads?</p>
              <Button type="button" class="btn btn-link" className={styles.button}>Create Room</Button>
            </div>
          </div>
        </Container>
      </div>

    </div>
  );
}

export default HomePage;
