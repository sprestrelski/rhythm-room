import React, { Component } from 'react';
import './App.css';

import { Container, Button} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';


import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';


import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import music_design from './assets/music_design.svg'

/*
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
      <Footer/>
    </Router>
  );
}
*/

class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      return (
        <Router>
          <Navbar/>
            <Switch>
              <Route path="/" exact component={HomePage}/>
              <Route path="/about" component={AboutPage}/>
              <Route path="/dashboard" component={Dashboard}/>
            </Switch>
        </Router>
      );
    }
  }

export default App;
