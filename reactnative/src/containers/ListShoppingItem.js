import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CardSection } from '../common';

import { shoppingFoodDelete } from '../actions';

import { connect } from 'react-redux';

class ListShoppingItem extends Component {
    
    deleteHandler({ uid }) {
        this.props.shoppingFoodDelete({ uid })
    }

    render() {

        const { name, uid } = this.props.shoppingFood;
        var swipeButtons = [{
            text: 'Bought',
            backgroundColor: 'blue',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => this.deleteHandler({ uid })
          }
        ];

        return (
            <Swipeout
            right={swipeButtons}
            autoClose={true}
            backgroundColor= 'transparent'
            >
                <View>
                    <CardSection>
                        <Text style={styles.textStyle}>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </Swipeout>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 18,
        paddingLeft: 15,
        paddingTop: 3,
        paddingBottom: 3
    }
};

const mapStateToProps = (state) => {
    const shoppingFoods = _.map(state.shoppingFoods, (val, uid) => {
        return { ...val, uid };
    });

    return { shoppingFoods };
}

export default connect(mapStateToProps, {shoppingFoodDelete})(ListShoppingItem);