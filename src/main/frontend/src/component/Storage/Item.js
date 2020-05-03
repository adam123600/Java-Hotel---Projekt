import React, { Component } from "react";

import AuthService from "../../service/AuthService";

export default class Item extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showEditButton: false,
            item_id: 0,
            item_name: "",
            min_quantity: 0,
            current_quantity: 0,
            item_category: ""
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                showEditButton: user.roles.includes("ROLE_ADMIN"), //TODO: Podmien na role managera!
                item_id: this.props.item_id,
                item_name: this.props.item_name,
                min_quantity: this.props.min_quantity,
                current_quantity: this.props.current_quantity,
                item_category: this.props.item_category
            });
        }
    }

    render() {
        return (
            <div style={{margin: '10px', borderStyle: 'solid'}}>
                <h3 style={{display: 'inline'}}>{this.state.item_name}</h3>
                {this.state.showEditButton &&
                    <button class="btn btn-dark" style={{margin: '5px'}}>Edytuj</button>
                }
                <h4>Obecna ilość: {this.state.current_quantity}</h4>
                <h4>Minimalna ilość: {this.state.min_quantity}</h4>
            </div>
        );
    }

}