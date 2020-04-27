import React, { Component } from 'react';
import './App/App.css';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import UserService from "../services/UserService";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </Container>
      </div>
      
    );
  }
}

export default Home;