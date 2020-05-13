import React, { Component } from "react";

import ItemService from "../../service/ItemService";
import Item from "./Item";
import AuthService from "../../service/AuthService";
import AddItem from "./AddItem";

export default class ItemStorage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            showAddItemForm: false,
            showAddItemButton: false
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
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                showAddItemButton: user.roles.includes("ROLE_ADMIN"), //TODO: Podmien na role managera!
            });
        }
    }

    onAddBtnClick = () => {
        this.setState({showAddItemForm: !this.state.showAddItemForm});
    };
    /**
     * Funkcja używana wewnątrz komponentu AddItem.js
     */
    onCancelBtnClick = () => {
        this.setState({showAddItemForm: false});
    };

    render() {
        if (this.state.content.length === 0) {
            return (
                <div>
                    {this.state.showAddItemButton &&
                        <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.onAddBtnClick}>Dodaj przedmiot</button>
                    }
                    {this.state.showAddItemForm &&
                        <AddItem onCancel={this.onCancelBtnClick}/>
                    }
                    <h3 style={{margin: '5px'}}>Brak przedmiotów w bazie.</h3>
                </div>
            );
        }

        /**
         * Poniżej znajduje się lista kategorii itemów aktualnie znajdujących się w bazie (NIE wszystkich możliwych kategorii)
         * Kategorie w bazie są w postaci wiele do wielu, więc zwracany jest zagnieżdżony JSON,
         * stąd biorę jeden element zwróconej listy kategorii o indeksie [0].
         */

        const listOfCategories = [];
        this.state.content.map(item => {
                if (!listOfCategories.includes(item.category[0].category)) {
                    listOfCategories.push(item.category[0].category);
                }
            }
        );

        return (
            <div>
                {this.state.showAddItemButton &&
                <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.onAddBtnClick}>Dodaj przedmiot</button>
                }
                {this.state.showAddItemForm &&
                <AddItem onCancel={this.onCancelBtnClick}/>
                }
                {listOfCategories.map((category, index) => {
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
                            <h2 key={index} style={{margin: '5px'}}>{nameOfCategory}</h2>
                            {this.state.content.map(item => {
                                if (item.category[0].category === category)
                                    return <Item key={item.item_id} {...item} />
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}