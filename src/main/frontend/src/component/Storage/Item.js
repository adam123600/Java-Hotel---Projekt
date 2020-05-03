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
                item_category: this.props.item_category
            });
        }
    }

    render() {
        return (
            <div style={{margin: '10px'}}>
                <h3 style={{display: 'inline'}}>{this.state.item_name}</h3>
                {this.state.showEditButton &&
                    <button class="btn btn-dark" style={{margin: '5px'}}>Edytuj</button>
                }
            </div>
        );
    }

}