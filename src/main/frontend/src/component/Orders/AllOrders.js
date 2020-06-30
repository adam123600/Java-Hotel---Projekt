import React, { Component } from "react";
import OrderService from "../../service/OrderService"
import Order from "./Order";
import { Button, Collapse, CardBody, Card, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner} from 'reactstrap';


export default class AllOrders extends Component{
    constructor(props) {
        super(props);

        this.state = {
            orders : [],
            orderNameRegex: "",
            filterOrdersModal: false,
            loading: true
        }

        this.resetFilters = this.resetFilters.bind(this);
        this.handleSearchByOrderName = this.handleSearchByOrderName.bind(this);
    }

    resetFilters() {
        this.setState({
            orderNameRegex: ""
        })
    }

    
    handleSearchByOrderName(event) {
        this.setState({ 
            orderNameRegex: event.target.value
        });
    }

    componentDidMount() {
        OrderService.getAllOrders().then(
            response => {
                this.setState({
                    orders: response.data,
                    loading: false
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
        const { filterOrdersModal, orderNameRegex } = this.state;
        return (
            <div>
                {this.state.loading && <Spinner animation="border"/>}
                <button className="additem-button" style={{margin: '10px'}} onClick={() => { this.setState( {filterOrdersModal: !filterOrdersModal })}}>
                Filtruj przedmiot
                </button>
                <Collapse isOpen={filterOrdersModal}>
                        <Card>
                            <CardBody>
                                <div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Przedmiot</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="itemName" value={orderNameRegex} onChange={this.handleSearchByOrderName}/>
                                    </InputGroup>          
                                    <br/>
                                    
                                    <Button color="danger" onClick={this.resetFilters}>
                                        Resetuj filtry
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                </Collapse>
                <div className="allreservations-header">
                    ZAMÓWIENIA
                </div>
                <div className="allreservations-container">
                    {this.state.orders.filter( orderName => {
                        if( ["*","?","+"].includes(orderNameRegex) ) {
                            return null;
                        }
                        return orderName.item.item_name.match(orderNameRegex);
                    }).map(order => {
                        return <Order key={order.order_id} afterDelete={this.deleteOrderFromList} {...order}/>
                    })}
                </div>
            </div>
        );
    }
}

