import React, { Component } from "react";

import AuthService from "../../service/AuthService";
import EditItem from "./EditItem";
import ItemService from "../../service/ItemService";
import Modal from "reactstrap/es/Modal";
import "./Storage.css"

export default class Item extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showEditDeleteButton: false,
            showEditField: false,
            showConfirmationOfDelete: false,
            item_id: 0,
            item_name: "",
            min_quantity: 0,
            current_quantity: 0,
            category: ""
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
                category: this.props.category[0].category
            });
        }
    }

    checkPermissionToEditDeleteButton = (roles) => {
        const category = this.props.category[0].category;
        return (roles.includes("ROLE_MANAGER")
            || (roles.includes("ROLE_REPAIRMAN") &&
                category.includes("CAT_WORKSHOP"))
            || (roles.includes("ROLE_CLEANER") &&
                category.includes("CAT_HYGIENE"))
            || (roles.includes("ROLE_KITCHEN_MANAGER") &&
                category.includes("CAT_FOOD"))
            || (roles.includes("ROLE_ACCOUNTANT")) &&
                category.includes("CAT_OFFICE"));
    }

    changeEditFieldModalState = () => {
        this.setState({showEditField: !this.state.showEditField});
    };

    changeConfirmationModalState = () => {
        this.setState({
            showConfirmationOfDelete: !this.state.showConfirmationOfDelete
        });
    };

    updateItemInfo = (item) => {
       this.setState({
           showEditField: false,
           item_name: item.item_name,
           min_quantity: item.min_quantity,
           current_quantity: item.current_quantity,
           category: item.category
       });
       this.props.afterUpdate();
    };

    onDeleteBtnClick = (event) => {
        event.preventDefault();
        ItemService.deleteItemById(this.state.item_id).then(response => {
            this.props.afterDelete(this.state.item_id);
        });
    };

    render() {
        return (
            <div className="storage-item">
                <h3 className="storage-text storage-itemName-text">{this.state.item_name}</h3>
                <h4 className="storage-text storage-itemDetails-text">Obecna ilość: {this.state.current_quantity}</h4>
                <h4 className="storage-text storage-itemDetails-text">Minimalna ilość: {this.state.min_quantity}</h4>
                {this.state.showEditDeleteButton &&
                <div className="storage-item-buttons">
                    <button className="additem-button storage-small-button" style={{margin: '10px'}}
                            onClick={this.changeEditFieldModalState}>Edytuj
                    </button>
                    <button className="additem-button storage-small-button" style={{margin: '10px'}}
                            onClick={this.changeConfirmationModalState}>Usuń
                    </button>
                </div>
                }
                <Modal isOpen={this.state.showEditField} toggle={this.changeEditFieldModalState}>
                    <EditItem onCancel={this.changeEditFieldModalState}
                              afterEdit={this.updateItemInfo} {...this.state}/>
                </Modal>
                <Modal isOpen={this.state.showConfirmationOfDelete} toggle={this.changeConfirmationModalState}>
                    <h2 className="storage-text storage-itemName-text">Czy na pewno chcesz usunąć: {this.state.item_name}?</h2>
                    <div className="storage-item-buttons">
                        <button className="additem-button storage-confirmation-button" onClick={this.onDeleteBtnClick}>Tak</button>
                        <button className="additem-button storage-confirmation-button" onClick={this.changeConfirmationModalState}>Nie</button>
                    </div>
                </Modal>
            </div>
        );
    }

}