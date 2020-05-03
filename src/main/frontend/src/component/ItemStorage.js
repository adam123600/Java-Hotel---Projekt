import React, { Component } from "react";

import ItemService from "../service/ItemService";

export default class ItemStorage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        }
    }

    componentDidMount() {
        ItemService.getAllItems().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div>
                {this.state.content.map(item => <div><li>{item.item_name}</li></div>)}
            </div>

        );
    }
}