import React from 'react';
import { Container, Button } from 'react-bootstrap';

import styles from "./HomePage.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import ModalForm from '../components/ModalForm';

import music_design from '../assets/music_design.svg'
import marshmello from '../assets/marshmello.svg'
import friends from '../assets/friends.svg'
import cat from '../assets/cat.svg'
import coding from '../assets/coding.svg'
import { Helmet } from 'react-helmet';

class App extends React.Component {
  state = {
    isOpen: false,
    name: null,
    roomname: null
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  // handleSubmit(name) => //some code

  // handleSubmit(name) = (e) => this.setState({[e.target.name]: e.target.value})
  // handleSubmit(room) = (e) => this.setState({[e.target.roomname]: e.target.value})


  render() {
    return (
      <div>
        <Helmet>
          <title>Home | Rhythm Room</title>
        </Helmet>
        <div className={styles.section1}>
          <Container>
            <div className={styles.parent}>
              <div className={styles.box}>
                <img src={music_design} alt="person listening to music"></img>
              </div>
              <div className={styles.box}>
                <h1>Listen with your friends</h1>
                <button type="button" class="btn btn-link" className={styles.button} onClick={this.openModal}>Join Room</button>
                {this.state.isOpen ?
                  <ModalForm
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpen}
                    handleSubmit={this.handleSubmit}
                  />
                  : null
                }
              </div>
            </div>
          </Container>
        </div>
        <div className={styles.section2}>
          <Container>
            <h1 className={styles.heading}>How it works</h1>
            <div className={styles.parent}>
              <div className={styles.box}>
                <img src={marshmello} alt="marshmello"></img>
                <div className={styles.numberCircle}>
                  1
                </div>
                <p>Play your favorite artists</p>
              </div>
              <div className={styles.box}>
                <img src={friends} alt="two friends sitting underneath a tree"></img>
                <div className={styles.numberCircle}>
                  2
                </div>
                <p>Add your friends</p>
              </div>
              <div className={styles.box}>
                <img src={cat} alt="cat listening to music with headphones"></img>
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
                <img src={coding} alt="two people sitting in front of a computer screen"></img>
              </div>
              <div className={styles.box}>
                <h1>About</h1>
                <p>Rhythm Room is a web app dedicated to listening to and sharing the spis-iest beats with your friends.</p>
                <p>Want a break from the ads?</p>
                <button type="button" class="btn btn-link" className={styles.button} onClick={this.openModal}>Join Room</button>
                {this.state.isOpen ?
                  <ModalForm
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpen}
                    handleSubmit={this.handleSubmit}
                  />
                  : null
                }
              </div>
            </div>
          </Container>
        </div>

      </div>
    );
  }
}

export default App;
