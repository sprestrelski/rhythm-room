import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import styles from './navbar.module.css';
import logo from '../assets/rhythm_logo.svg'

const navbar = () => {
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
                        <Link to="/dashboard">
                            <Button type="button" class="btn btn-link" className={styles.button}>Create Room</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default navbar