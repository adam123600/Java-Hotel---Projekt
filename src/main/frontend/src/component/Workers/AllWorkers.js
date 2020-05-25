import React, { useState, Component } from "react";
import WorkerService from "../../service/WorkerService";
//import Menu from "../Menu"
import Worker from "./Worker";
import { ListGroup, ListGroupItem, Collapse, Button, CardBody } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';

export default class AllWorkers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allWorkers: [],
            allRoles: [],
            allUsersNoLinks: [],
            activeTab: 0,
        }
        WorkerService.getAllWorkers().then(result => {
            this.setState({allWorkers: result});
        });
        WorkerService.getAllRoles().then(result => {
            this.setState({allRoles: result});
        });
        WorkerService.getWorkersNoLinks().then(result => {
            this.setState({allUsersNoLinks: result});
        });
    }

    showWorkers = () => {

      return (
        <div>
            <Nav tabs> 
              {this.state.allRoles.map((role,index) => {
                {console.log("role: ",role,"index ",index)}
                return (
                  <NavItem>
                    <NavLink
                      className={({ active: this.state.activeTab == index })}
                      onClick={() => { this.setState( {activeTab: index }) 
                    }}>
                      {WorkerService.roleNameToPolish(role.name)}
                    </NavLink>
                  </NavItem>
                )
              })}
            </Nav>
    
              {this.state.allRoles.map((role, index) => {
                return (
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={index}>
                      <Row>
                        <Col sm="12">
                        <ListGroup>
                                {this.state.allUsersNoLinks.map(user => {
                                    return user.roles.map( r => {
                                        if(r.name == role.name) {
                                            return this.state.allWorkers.map( worker => {
                                                if( worker.username == user.username) {
                                                    return (
                                                        <ListGroupItem>
                                                            <Worker worker={worker} allRoles={this.state.allRoles}/>
                                                        </ListGroupItem>
                                                    )
                                                }
                                            })
                                        }
                                    }) 
                                })}
                            </ListGroup>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                )
              })}
          </div>
      )

    }
    

    render() {
      return(
        <div>
          {this.showWorkers()}
        </div>
      )
    }
}