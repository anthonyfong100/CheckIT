// render code for shopping list
import React, { Component } from 'react';
import { ListView } from 'react-native';
import ListItem from './ListItem';

class ShoppingList extends Component {
    
    render() {
        return(
            <ListView 
                enableEmptySections

            />
        );
    }
}

export default ShoppingList;