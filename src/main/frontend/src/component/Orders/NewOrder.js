import React, { Component } from "react";
import OrderService from "../../service/OrderService"

export default class NewOrder extends Component{
    constructor(props) {
        super(props);

        this.state = {
            item_name: "",
            item_id: 0,
            date: new Date(),
            quantity: 1,
            price: 0.0
        }
    }

    componentDidMount() {
        this.setState({
            item_name: this.props.itemName,
            item_id: this.props.itemId
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newOrder = {
            itemCounter: this.state.quantity,
            price: this.state.price,
            item: {
                item_id: this.state.item_id
            },
            orderDate: this.state.date
        };
        OrderService.createNewOrder(newOrder);
        this.props.onCancel();
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.onCancel();
    }

    render() {
        return (
            <div style={{margin: '10px'}}>
                <form onSubmit={this.handleSubmit} className="storage-form">
                    <h3 className="storage-text storage-itemName-text">Zamawiasz: {this.state.item_name}</h3>

                    <div className="storage-form-group">
                        <label htmlFor={'quantity'} className="storage-form-label">ILOŚĆ:</label>
                        <input type={'number'} min={'1'} value={this.state.quantity} onChange={event => this.setState({quantity: event.target.value})} name={'quantity'} required/><br/>
                    </div>

                    <div className="storage-form-group">
                        <label htmlFor={'price'} className="storage-form-label">CENA:</label>
                        <input type={'number'} step={'0.01'} min={'0'} value={this.state.price} onChange={event => this.setState({price: event.target.value})} name={'price'}/><br/>
                    </div>
                    <div className="storage-item-buttons">
                        <input type={'submit'} value={'Dodaj'} className="additem-button storage-confirmation-button" />
                        <button onClick={this.handleCancel} className="additem-button storage-confirmation-button" >Anuluj</button>
                    </div>
                </form>
            </div>

        );
    }
}