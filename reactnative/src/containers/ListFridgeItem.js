import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CardSection } from '../common';

import { fridgeFoodDelete } from '../actions';

import { connect } from 'react-redux';

class ListFridgeItem extends Component {

    deleteHandler({ uid }) {
        this.props.fridgeFoodDelete({ uid })
    }

    render() {
        const { name, expiry, uid } = this.props.fridgeFood;

        var swipeButtons = [{
            text: 'Eaten',
            backgroundColor: 'blue',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => this.deleteHandler({ uid })
        },
        {
            text: 'Disposed',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => this.deleteHandler({ uid })
        }
        ];

        return (
            <Swipeout
                right={swipeButtons}
                autoClose={true}
                backgroundColor='transparent'
            >
                <View>
                    <CardSection>
                        <Text style={styles.textStyle1}>
                            {name} expires in {expiry}
                        </Text>
                    </CardSection>
                </View>
            </Swipeout>
        );
    }
}

const styles = {
    textStyle1: {
        fontSize: 18,
        paddingLeft: 15,
        paddingTop: 3,
        paddingBottom: 3
    }
};

const mapStateToProps = (state) => {
    const fridgeFoods = _.map(state.fridgeFoods, (val, uid) => {
        return { ...val, uid };
    });

    return { fridgeFoods };
};

export default connect(mapStateToProps, { fridgeFoodDelete })(ListFridgeItem);