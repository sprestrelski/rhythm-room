// I got it from here https://dev.to/kimmese/react-bootstrap-modal-form-31gc

import React, { Component } from "react";

import { Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class ModalForm extends Component {

  constructor(props) {
    super(props);
    this.state = { name: null, roomName: null }
  }
  
  closeModal = () => this.setState({ isOpen: false });

  handleSubmit = (event) => {
    this.props.closeModal()
  };

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }
  handleChangeRoom = (event) => {
    this.setState({ roomName: event.target.value });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
          <Modal.Header closeButton >
            <Modal.Title> Hi {this.state.name ? this.state.name : "there"}, Create a Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control type="text" onChange={this.handleChangeName} name="input1" value={this.state.name} placeholder="Name" />
            </Form.Group>
            <Form.Group >
              <Form.Label style={{ paddingTop: "15px" }}>Room name: </Form.Label>
              <Form.Control type="text" onChange={this.handleChangeRoom} name="input2" value={this.state.roomName} placeholder="Room Name" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Link onClick={event => (!this.state.name || !this.state.roomName) ? event.preventDefault() : null} to={`/dashboard?name=${this.state.name}&room=${this.state.roomName}`}>
              <Button type="submit" onClick={this.handleSubmit}>
                Join Room
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}