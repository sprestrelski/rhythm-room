import React from 'react';
import { Container, Button} from 'react-bootstrap';

import styles from "./HomePage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import music_design from '../assets/music_design.svg'

function HomePage() {
  return (
    <div>
      <Container>
      <div className={styles.module}>
      <img src={music_design}></img>
        <h1>Listen with your friends</h1>
        <Button type="button" class="btn btn-link" className={styles.button}>Create Room</Button>
        <a href="#">Join Room</a>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
