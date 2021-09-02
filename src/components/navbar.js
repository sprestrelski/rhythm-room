import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import React from 'react'
import styles from './navbar.module.css';
import logo from '../assets/rhythm_logo.svg'
import ModalForm from './ModalForm';

class navbar extends React.Component {
    state = {
        isOpen: false,
        name: null,
        roomname: null
      }
    
      openModal = () => this.setState({ isOpen: true });
      closeModal = () => this.setState({ isOpen: false });
    
    render(){
        return (
            <Navbar className={styles.navbar} collapseOnSelect expand="sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} width="30" height="30" alt="" className={styles.logo} />
                        Rhythm Room
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav className="ms-auto">
                            <Nav.Item className="px-4">
                                <Nav.Link as={Link} to='/about'>About</Nav.Link>
                            </Nav.Item>
                            <button type="button" class="btn btn-link" className={styles.button} onClick={this.openModal}>Create Room</button>
                            {this.state.isOpen ?
                                <ModalForm
                                closeModal={this.closeModal}
                                isOpen={this.state.isOpen}
                                handleSubmit={this.handleSubmit}
                                />
                                : null
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        );
    }
    
}

export default navbar;