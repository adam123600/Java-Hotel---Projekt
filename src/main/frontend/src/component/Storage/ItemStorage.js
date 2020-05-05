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
        if (this.state.content.length === 0) {
            return (
                <div>
                    <h3 style={{margin: '5px'}}>Brak przedmiotów w bazie.</h3>
                </div>
            );
        }

        const listOfCategories = [];
        this.state.content.map(item => {
                if (!listOfCategories.includes(item.item_category)) {
                    listOfCategories.push(item.item_category);
                }
            }
        );

        return (
            <div>
                {listOfCategories.map(category => {
                    let nameOfCategory = '';
                    switch (category) { //TODO: W razie dodania nowej kateogrii należy jedynie dopisać odpowiedni case
                        case 'CAT_FOOD':
                            nameOfCategory = 'Jedzenie';
                            break;
                        case 'CAT_OFFICE':
                            nameOfCategory = 'Biuro';
                            break;
                        case 'CAT_OTHER':
                            nameOfCategory = 'Inne';
                            break;
                        default:
                            nameOfCategory = 'Nieznana kategoria';
                    }
                    return (
                        <div>
                            <h2 style={{margin: '5px'}}>{nameOfCategory}</h2>
                            {this.state.content.map(item => {
                                if (item.item_category === category)
                                    return <Item {...item} />
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}