import React, { Component } from "react";

import AuthService from "../../service/AuthService";
import EditItem from "./EditItem";
import ItemService from "../../service/ItemService";

export default class Item extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showEditDeleteButton: false,
            showEditField: false,
            item_id: 0,
            item_name: "",
            min_quantity: 0,
            current_quantity: 0,
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                showEditDeleteButton: this.checkPermissionToEditDeleteButton(user.roles),
                item_id: this.props.item_id,
                item_name: this.props.item_name,
                min_quantity: this.props.min_quantity,
                current_quantity: this.props.current_quantity,
            });
        }
    }

    checkPermissionToEditDeleteButton = (roles) => {
        const category = this.props.category[0].category;
        return (roles.includes("ROLE_MANAGER")  //TODO: Podmien na role managera!
            || (roles.includes("ROLE_REPAIRMAN") &&
                category.includes("CAT_WORKSHOP"))
            || (roles.includes("ROLE_CLEANER") &&
                category.includes("CAT_HYGIENE"))
            || (roles.includes("ROLE_KITCHEN_MANAGER") &&
                category.includes("CAT_FOOD"))
            || ((roles.includes("ROLE_RECEPTIONIST") || roles.includes("ROLE_ACCOUNTANT")) &&
                category.includes("CAT_OFFICE")));
    }

    onEditBtnClick = () => {
        this.setState({showEditField: !this.state.showEditField});
    };
    onDeleteBtnClick = () => {
        ItemService.deleteItemById(this.state.item_id);
        window.location.reload();
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
                    {this.state.showEditDeleteButton &&
                        <div>
                            <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.onEditBtnClick}>Edytuj</button>
                            <button className="btn btn-danger" style={{margin: '10px'}} onClick={this.onDeleteBtnClick}>Usuń</button>
                        </div>
                    }
                    {this.state.showEditField &&
                        <EditItem onCancel={this.onCancelBtnClick} {...this.props}/>
                    }
                </div>


            </div>
        );
    }

}