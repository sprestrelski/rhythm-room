const footer = () => {
    return (
        <Navbar className={styles.navbar}>
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} width="30" height="30" alt="" className={styles.logo}/>
                    Rhythm Room
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav ">
                    <Nav className="ms-auto">
                        <Nav.Item className="px-4">
                            <Nav.Link href="#about">About</Nav.Link>
                        </Nav.Item>
                        <Button type="button" class="btn btn-link" className={styles.button}>Create Room</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default footer