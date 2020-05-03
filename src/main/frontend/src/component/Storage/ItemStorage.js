import React, { Component } from "react";

import ItemService from "../../service/ItemService";
import Item from "./Item";

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
       /* const listOfCategories = [];
        this.state.content.map(item => {
                if (!listOfCategories.includes(item.item_category)) {
                    listOfCategories.push(item.item_category);
                }
            }
        );*/

        const listOfFood = [];
        this.state.content.map(item => {
                if (item.item_category === 'CAT_FOOD') {
                    listOfFood.push(item);
                }
            }
        );

        const listOfOffice = [];
        this.state.content.map(item => {
                if (item.item_category === 'CAT_OFFICE') {
                    listOfOffice.push(item);
                }
            }
        );

        const listOfOther = [];
        this.state.content.map(item => {
                if (item.item_category === 'CAT_OTHER') {
                    listOfOther.push(item);
                }
            }
        );

        return (
            <div>
               {/* {listOfCategories.map(category => (
                    <h2 style={{margin: '5px'}}>{category}</h2>
                    this.state.content.map(item => {
                        if (item.item_category === category) {
                            <Item {...item} />
                        }
                    });
                ))}*/}


                <h2 style={{margin: '5px'}}>Jedzenie:</h2>
                {listOfFood.map(item => <Item {...item} />)}
                <h2 style={{margin: '5px'}}>Biuro:</h2>
                {listOfOffice.map(item => <Item {...item} />)}
                <h2 style={{margin: '5px'}}>Inne:</h2>
                {listOfOther.map(item => <Item {...item} />)}
            </div>
        );
    }
}