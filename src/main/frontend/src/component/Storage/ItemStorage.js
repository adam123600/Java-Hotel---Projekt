import React, { Component } from "react";

import ItemService from "../../service/ItemService";
import Item from "./Item";
import AuthService from "../../service/AuthService";
import AddItem from "./AddItem";
import Modal from "reactstrap/es/Modal";

export default class ItemStorage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            showAddItemForm: false,
            showAddItemButton: false,
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
                showAddItemButton: user.roles.includes("ROLE_MANAGER"),
            });
        }
    }

    changeModalState = () => {
        this.setState({showAddItemForm: !this.state.showAddItemForm});
    };

    deleteItemFromList = (item_id) => {
        this.setState(prevState => ({
            content: prevState.content.filter(item => item.item_id !== item_id)
        }));
    };

    updateView = () => {
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
    };

    render() {
        if (this.state.content.length === 0) {
            return (
                <div>
                    {this.state.showAddItemButton &&
                        <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.changeModalState}>Dodaj przedmiot</button>
                    }
                    <Modal isOpen={this.state.showAddItemForm} toggle={this.changeModalState}>
                        <AddItem onCancel={this.changeModalState}/>
                    </Modal>
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
                <button className="btn btn-primary" style={{margin: '10px'}} onClick={this.changeModalState}>Dodaj przedmiot</button>
                }
                <Modal isOpen={this.state.showAddItemForm} toggle={this.changeModalState}>
                    <AddItem onCancel={this.changeModalState}/>
                </Modal>
                {listOfCategories.map((category, index) => {
                    let nameOfCategory = '';
                    switch (category) { //TODO: W razie dodania nowej kateogrii należy jedynie dopisać odpowiedni case
                        case 'CAT_FOOD':
                            nameOfCategory = 'Jedzenie';
                            break;
                        case 'CAT_OFFICE':
                            nameOfCategory = 'Biuro';
                            break;
                        case 'CAT_WORKSHOP':
                            nameOfCategory = 'Warsztat'
                            break;
                        case 'CAT_OTHER':
                            nameOfCategory = 'Inne';
                            break;
                        case 'CAT_HYGIENE':
                            nameOfCategory = 'Higiena';
                            break;
                        default:
                            nameOfCategory = 'Nieznana kategoria';
                    }
                    return (
                        <div>
                            <h2 key={index} style={{margin: '5px'}}>{nameOfCategory}</h2>
                            {this.state.content.map(item => {
                                if (item.category[0].category === category)
                                    return <Item key={item.item_id} afterDelete={this.deleteItemFromList} afterUpdate={this.updateView} {...item}/>
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }
}