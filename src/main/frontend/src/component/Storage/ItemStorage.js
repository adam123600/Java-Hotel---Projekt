import React, { Component } from "react";

import ItemService from "../../service/ItemService";
import Item from "./Item";
import AuthService from "../../service/AuthService";
import SmallAmountItem from "../Notifications/SmallAmountItem"
import AddItem from "./AddItem";
import Modal from "reactstrap/es/Modal";
import "./Storage.css"
import { Button, Collapse, CardBody, Card, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner} from 'reactstrap';

export default class ItemStorage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            showAddItemForm: false,
            showAddItemButton: false,
            filterItemsModal: false,
            categoryNameRegex: "",
            itemNameRegex: "", 
            loading: true
        }

        this.handleSearchByItemName = this.handleSearchByItemName.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
    }


    handleSearchByItemName(event) {
        this.setState({ 
            itemNameRegex: event.target.value
        });
    }
    resetFilters() {
        this.setState({
            categoryNameRegex: "",
            itemNameRegex: "",
        })
    }
    onChangeCategory(e) {
        this.setState({
            categoryNameRegex: e.target.value
        });
    }


    componentDidMount() {
        ItemService.getAllItems().then(
            response => {
                this.setState({
                    content: response.data, 
                    loading: false
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
        const { content, filterItemsModal, categoryNameRegex, itemNameRegex } = this.state;
        

        if (this.state.content.length === 0) {
            return (
                <div>
                    {this.state.showAddItemButton &&
                        <button className="additem-button" style={{margin: '10px'}} onClick={this.changeModalState}>Dodaj przedmiot</button>
                    }
                    <Modal isOpen={this.state.showAddItemForm} toggle={this.changeModalState}>
                        <AddItem onCancel={this.changeModalState}/>
                    </Modal>
                    <h3 className="item-text">Brak przedmiotów w bazie.</h3>
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

        let filtredCategories = content.filter( category => {
            if( ["*","?","+"].includes(categoryNameRegex) ) {
                return null;
            }
            return category.category[0].category.match("CAT_FOOD");
        }).map(category => {
            return category.category[0].category;
        })

        return (
            <div>
                {this.state.loading && <Spinner animation="border"/>}
                <SmallAmountItem/>
                <div style={{display: 'inline-flex'}}>
                    {this.state.showAddItemButton &&
                    <button className="additem-button" style={{margin: '10px'}} onClick={this.changeModalState}>Dodaj przedmiot</button>
                    }
                    <Modal isOpen={this.state.showAddItemForm} toggle={this.changeModalState}>
                        <AddItem onCancel={this.changeModalState}/>
                    </Modal>
                    <button className="additem-button" style={{margin: '10px'}} onClick={() => { this.setState( {filterItemsModal: !filterItemsModal })}}>
                        Filtruj przedmiot
                    </button>
                </div>
                <Collapse isOpen={filterItemsModal}>
                        <Card>
                            <CardBody>
                                <div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Kategoria</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="select" onChange={this.onChangeCategory}>
                                            <option></option>
                                            {listOfCategories.map(category => {
                                                return <option key={category} value={category}>{ItemService.categoryNameToPolish(category)}</option>
                                            })}
                                        </Input>
                                    </InputGroup>
                                    <br/>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>Przedmiot</InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" name="itemName" value={itemNameRegex} onChange={this.handleSearchByItemName}/>
                                    </InputGroup>          
                                    <br/>
                                    
                                    <Button color="danger" onClick={this.resetFilters}>
                                        Resetuj filtry
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Collapse>
                    
                {listOfCategories.filter( category => {
                    if( ["*","?","+"].includes(categoryNameRegex) ) {
                        return null;
                    }
                    return category.match(categoryNameRegex);
                }).map((category, index) => {
                    let nameOfCategory = '';
                    switch (category) { //TODO: W razie dodania nowej kateogrii należy jedynie dopisać odpowiedni case oraz w itemService to samo
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
                            <h2 key={index} className="storage-text">{nameOfCategory}</h2>
                            <div className="storage-container">
                                {this.state.content.filter( itemName => {
                                    if( ["*","?","+"].includes(itemNameRegex) ) {
                                        return null;
                                    }
                                    return itemName.item_name.match(itemNameRegex);
                                }).map(item => {
                                    if (item.category[0].category === category)
                                        return <Item key={item.item_id} afterDelete={this.deleteItemFromList}
                                                     afterUpdate={this.updateView} {...item}/>
                                })}
                            </div>
                        </div>
                    )
                })}

               
            </div>
        );
    }
}