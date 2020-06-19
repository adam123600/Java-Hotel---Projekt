import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = '/api/items1/';
const API_LINKS = '/api/items/';

class ItemService {
    getAllItems() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    getAllCategories() {
        return axios.get(API_URL + 'categories', {headers: authHeader()});
    }

    getItemByIdLink(id) {
        return axios.get(API_LINKS + id, {headers: authHeader()});
    }

    deleteItemById(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }

    createNewItem(newItem) {
        return axios.post(API_URL, newItem, {headers: authHeader()});
    }

    updateItemById(id, newItem) {
        return axios.put(API_URL + id, newItem, {headers: authHeader()});
    }

    categoryNameToPolish(categoryName) {
        switch(categoryName) {
            case 'CAT_FOOD':     return  'Jedzenie';
            case 'CAT_OFFICE':   return  'Biuro';
            case 'CAT_WORKSHOP': return 'Warsztat'
            case 'CAT_OTHER':    return 'Inne';
            case 'CAT_HYGIENE':  return 'Higiena';
            default:             return 'Nieznana kategoria';
        }
    }
}

export default new ItemService();