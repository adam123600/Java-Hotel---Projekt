import React, { Component } from "react";
import NotificationService from "../../service/NotificationService"
import { Form, Input, Col, FormGroup, Button, Label } from "reactstrap";
import AuthService from "../../service/AuthService";
import WorkerService from "../../service/WorkerService";
import { toast } from "react-toastify";


export default class AddNotification extends Component{

    constructor(props){
        super(props);

        this.state = {
            description: "",
            notType: [],
            notTypeId: 3,
            room: [],
            notificationTypes: [],
            dictionaryNotificationTypes: {},
            toastId: null,
        }

        this.handleSubmitNotification = this.handleSubmitNotification.bind(this);
        this.onNotificationTypeSelected = this.onNotificationTypeSelected.bind(this);
    }

    componentDidMount(){
        NotificationService.getAllNotificationTypes().then( allTypes =>{
            this.setState({
                notificationTypes: allTypes,
                dictionaryNotificationTypes: {
                    "ROOM_CLEANING": "Sprzątanie pokoju",
                    "FLAW" : "Usterka"
                }
            })
        })        
    }
    
    handleSubmitNotification = (event) => {
        const user = AuthService.getCurrentUser();
        
        let userRole = "unknow"
        if(user)
            userRole = WorkerService.roleNameToPolish(user.roles[0]);
    
        const notification = {
            username: userRole,
            description: this.state.description,
            notType: {
                id: this.state.notTypeId,
            },
            room: {
                id: this.props.room.id,
            }
        }
        
        NotificationService.createNewNotification(notification).then(
            response =>{
                if(!toast.isActive(this.state.toastId)){
                    this.setState({
                        toastId: toast.success('Powiadomienie zostało wysłane',{ position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: true
                    })
                    })
                }
            }
        );
        event.preventDefault();
    }

    onNotificationTypeSelected = event => {
        this.setState({
            notTypeId: event.target.value,
        })
    }
    render(){
        return(
            <div onSubmit={(e) => this.handleSubmitNotification(e)} style={{padding:'10px'}}>
                <Form> 
                    <FormGroup row>
                        <Col md={8}>
                            <Input type="text" value={this.state.description} onChange={event => this.setState({description: event.target.value})} placeholder="Opis" required></Input>
                        </Col>
                        <Col md={4}>
                            <Input type="select" onChange={event => this.onNotificationTypeSelected(event)} name={'notType'}>
                                {
                                    this.state.notificationTypes.map( 
                                        result => {
                                            if( result.type in this.state.dictionaryNotificationTypes )
                                                return <option key={result.id} value={result.id}>{this.state.dictionaryNotificationTypes[result.type]}</option>
                                        })
                                }
                            </Input>
                        </Col>
                    </FormGroup>
                    <Button type="submit" style={{backgroundColor: '#f99cab', width: '100px'}}>Dodaj</Button>
                </Form>
            </div>
        );
    }
}