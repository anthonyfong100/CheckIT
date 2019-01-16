// render code for fridge
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { fridgeFoodFetch } from '../actions';
import ListFridgeItem from './ListFridgeItem';

class FridgeList extends Component {
    componentWillMount() {
        this.props.fridgeFoodFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ fridgeFood }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(fridgeFood);
    }
    
    renderRow(fridgeFood) {
        return <ListFridgeItem fridgeFood={fridgeFood} />;
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
    const fridgeFood = _.map(state.fridgeFood, (val, uid) => {
        return { ...val, uid };
    });
    return { fridgeFood };
}
export default connect(mapStateToProps, { fridgeFoodFetch }) (FridgeList);