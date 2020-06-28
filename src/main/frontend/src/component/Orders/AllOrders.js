import React, { Component } from "react";
import OrderService from "../../service/OrderService"
import Order from "./Order";


export default class AllOrders extends Component{
    constructor(props) {
        super(props);

        this.state = {
            orders : []
        }
    }

    componentDidMount() {
        OrderService.getAllOrders().then(
            response => {
                this.setState({
                    orders: response.data
                });
            },
            error => {
                this.setState({
                    orders:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    deleteOrderFromList = (order_id) => {
        this.setState(prevState => ({
            orders: prevState.orders.filter(order => order.order_id !== order_id)
        }));
    };

    render() {
        return (
            <div>
                <div className="allreservations-header">
                    ZAMÓWIENIA
                </div>
                <div className="allreservations-container">
                    {this.state.orders.map(order => {
                        return <Order key={order.order_id} afterDelete={this.deleteOrderFromList} {...order}/>
                    })}
                </div>
            </div>
        );
    }
}