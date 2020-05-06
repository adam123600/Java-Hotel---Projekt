import React, { Component } from "react";

import AuthService from "../../service/AuthService";
import EditItem from "./EditItem";

export default class Item extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showEditButton: false,
            showEditField: false,
            item_id: 0,
            item_name: "",
            min_quantity: 0,
            current_quantity: 0
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
            });
        }
    }

    onEditBtnClick = () => {
        this.setState({showEditField: !this.state.showEditField});
    };
    /**
     * Funkcja używana wewnątrz komponentu EditItem.js
     */
    onCancelBtnClick = () => {
      this.setState({showEditField: false});
    };

    render() {
        return (
            <div className="card">
                <h3 className='card-header'>{this.state.item_name}</h3>
                <div className='card-body'>
                    <h4 className='card-title'>Obecna ilość: {this.state.current_quantity}</h4>
                    <h4 className='card-subtitle'>Minimalna ilość: {this.state.min_quantity}</h4>
                    {this.state.showEditButton &&
                    <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.onEditBtnClick}>Edytuj</button>
                    }
                    {this.state.showEditField &&
                    <EditItem onCancel={this.onCancelBtnClick} {...this.props}/>
                    }
                </div>


            </div>
        );
    }

}