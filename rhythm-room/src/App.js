import './App.css';

import { Container, Button} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './components/navbar';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';


import styles from "./App.module.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import music_design from './assets/music_design.svg'

function App() {
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

export default App;
