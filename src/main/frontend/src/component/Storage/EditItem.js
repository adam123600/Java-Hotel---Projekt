import React, {Component, createRef} from "react";
import ItemService from "../../service/ItemService";

export default class EditItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item_id: 0,
            item_name: "",
            min_quantity: 0,
            current_quantity: 0,
            category: "",
            all_categories: []
        }
    }

    componentDidMount() {
        ItemService.getAllCategories().then(
            response => {
                this.setState({
                    all_categories: response.data
                });
            },
            error => {
                this.setState({
                    all_categories:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        this.setState({
            item_id: this.props.item_id,
            item_name: this.props.item_name,
            min_quantity: this.props.min_quantity,
            current_quantity: this.props.current_quantity,
            category: this.props.category[0].category
        });
    }

    itemCategoryInput = createRef();

    handleSubmit = () => {
        const newItem = {
            item_name: this.state.item_name,
            min_quantity: this.state.min_quantity,
            current_quantity: this.state.current_quantity,
            category: [{id: this.itemCategoryInput.current.value}]
        };
        ItemService.updateItemById(this.state.item_id, newItem); //TODO: Jeśli chcemy obsługiwać komunikat błędu update'a na bazie to tutaj można to zrobić.

    };

    render() {
        return (
            <div style={{margin: '10px'}}>
                <form onSubmit={this.handleSubmit} style={{display: 'inline'}}>
                    <h3>Edytujesz: <span style={{color: 'blue'}}>{this.state.item_name}</span></h3>
                    <label htmlFor={'itemName'}>Nowa nazwa:</label>
                    <input type={'text'} value={this.state.item_name} onChange={event => this.setState({item_name: event.target.value})} name={'itemName'} required/><br/>
                    <label htmlFor={'minQuantity'}>Minimalna ilość:</label>
                    <input type={'number'} min={'0'} value={this.state.min_quantity} onChange={event => this.setState({min_quantity: event.target.value})} name={'minQuantity'} required/><br/>
                    <label htmlFor={'currentQuantity'}>Obecna ilość:</label>
                    <input type={'number'} min={'0'} value={this.state.current_quantity} onChange={event => this.setState({current_quantity: event.target.value})} name={'currentQuantity'} required/><br/>
                    <label htmlFor={'itemCategory'}>Kategoria:</label>
                    <select className="form-control-sm" ref={this.itemCategoryInput} name={'itemCategory'}>
                        {this.state.all_categories.map( category => {
                            let nameOfCategory = '';
                            switch (category.category) { //TODO: W razie dodania nowej kateogrii należy jedynie dopisać odpowiedni case
                                case 'CAT_FOOD':
                                    nameOfCategory = 'Jedzenie';
                                    break;
                                case 'CAT_OFFICE':
                                    nameOfCategory = 'Biuro';
                                    break;
                                case 'CAT_WORKSHOP':
                                    nameOfCategory = 'Warsztat';
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
                            if (category.category === this.state.category)
                                return <option key={category.id} value={category.id} selected>{nameOfCategory}</option>;
                            else
                                return <option key={category.id} value={category.id}>{nameOfCategory}</option>;
                        })}
                    </select><br/>
                    <input type={'submit'} value={'Zatwierdź'} className="btn btn-success" style={{margin: '10px'}}/>
                </form>
                <button onClick={this.props.onCancel} className="btn btn-danger" style={{margin: '10px'}}>Anuluj</button>
            </div>
        );
    }
}