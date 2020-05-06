import React, { Component } from "react";
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

    render() {
        return (
            <div style={{marginLeft: 'auto', marginRight: 'auto', borderStyle: 'solid'}}>
                <form>
                    <h3>Edytujesz: {this.state.item_name}</h3>
                    <label htmlFor={'itemName'}>Nowa nazwa:</label>
                    <input type={'text'} placeholder={this.state.item_name} name={'itemName'}/><br/>
                    <label htmlFor={'minQuantity'}>Minimalna ilość:</label>
                    <input type={'text'} placeholder={this.state.min_quantity} name={'minQuantity'}/><br/>
                    <label htmlFor={'currentQuantity'}>Obecna ilość:</label>
                    <input type={'text'} placeholder={this.state.current_quantity} name={'currentQuantity'}/><br/>
                    <label htmlFor={'itemCategory'}>Kategoria:</label>
                    <select name={'itemCategory'}>
                        {this.state.all_categories.map( category =>
                            <option key={category.id} value={category.category}>{category.category}</option>
                        )}
                    </select><br/>
                    <input type={'submit'}/>
                </form>
            </div>
        );
    }
}