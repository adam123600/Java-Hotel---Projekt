import React, { Component } from 'react';
import './App/App.css';
import { Container } from 'reactstrap';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {

    this.setState({
      content: "TODO"
    });
  }

  render() {
    return (
      <div>
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