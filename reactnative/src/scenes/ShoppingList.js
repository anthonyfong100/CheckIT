// render code for shopping list
import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { shoppingFoodFetch } from '../actions';
import ListShoppingItem from './ListShoppingItem';

class ShoppingList extends Component {
    /*
    componentDidMount() {
        this.props.shoppingFoodFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ shoppingFoods }) {
        const ds = new FlatList.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(shoppingFoods);
    }

    renderRow(shoppingFood) {
        return <ListShoppingItem shoppingFood={shoppingFood} />;
    }
*/
    render() {
        return(
            <FlatList 
                enableEmptySections
                //dataSource={this.dataSource}
                //renderRow={this.renderRow}
            />
        );
    }
}
/*
const mapStateToProps = state => {
    const shoppingFoods = _.map(state.shoppingFoods, (val, uid) => {
        return { ...val,};
    });
    return { shoppingFoods };
}
export default connect(mapStateToProps, { shoppingFoodFetch }) (ShoppingList);
*/
export default ShoppingList;