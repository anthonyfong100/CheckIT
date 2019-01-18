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

    createDataSource({ fridgeFoods }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(fridgeFoods);
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
    const fridgeFoods = _.map(state.fridgeFoods, (val, uid) => {
        return { ...val, uid };
    });
    return { fridgeFoods };
}
export default connect(mapStateToProps, { fridgeFoodFetch }) (FridgeList);