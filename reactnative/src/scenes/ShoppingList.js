// render code for shopping list
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { shoppingFoodFetch } from '../actions';
import ListShoppingItem from './ListShoppingItem';

class ShoppingList extends Component {
    componentWillMount() {
        this.props.shoppingFoodFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ shoppingFood }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(shoppingFood);
    }

    renderRow(shoppingFood) {
        return <ListShoppingItem shoppingFood={shoppingFood} />;
    }

    render() {
        return(
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    const shoppingFood = _.map(state.shoppingFood, (val, uid) => {
        return { ...val, uid };
    });
    return { shoppingFood };
}
export default connect(mapStateToProps, { shoppingFoodFetch }) (ShoppingList);