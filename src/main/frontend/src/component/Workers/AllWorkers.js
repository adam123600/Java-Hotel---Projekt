import React, {useState, Component} from "react";
import WorkerService from "../../service/WorkerService";
import Worker from "./Worker";
import './Worker.css'
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table} from 'reactstrap';

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
                <h1 className="main-header">Pracownicy</h1>
                <Nav tabs>
                    {this.state.allRoles.map((role, index) => {
                        return (
                            <NavItem>
                                <NavLink
                                    className={({active: this.state.activeTab === index})}
                                    onClick={() => {
                                        this.setState({activeTab: index})
                                    }}>
                                    <h4>{WorkerService.roleNameToPolish(role.name)}</h4>
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
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th className="subheaderWorker">Imię</th>
                                                    <th className="subheaderWorker">Nazwisko</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.allUsersNoLinks.map(user => {
                                                    return user.roles.map(r => {
                                                        if (r.name === role.name) {
                                                            return this.state.allWorkers.map(worker => {
                                                                if (worker.username === user.username) {
                                                                    return <Worker worker={worker} 
                                                                                allRoles={this.state.allRoles}/>
                                                                }
                                                            })
                                                        }
                                                    })
                                                })}
                                            </tbody>
                                        </Table>
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
        return (
            <div>
                {this.showWorkers()}
            </div>
        )
    }
}