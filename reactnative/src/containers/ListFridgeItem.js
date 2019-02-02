import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CardSection } from '../common';

import fridgeFoodDelete from '../actions';

import { connect } from 'react-redux';

class ListFridgeItem extends Component {
   
    onButtonPress() {
       const { uid } = this.props.fridgeFoods;
       console.log(uid);
       this.props.employeeDelete({ uid });
    }
   
    render() {
        const { name, expiry } = this.props.fridgeFood;

        let swipeButtons = [{
            text: 'Eaten',
            backgroundColor: 'blue',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {this.onButtonPress.bind(this)}
          },
          {
            text: 'Disposed',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
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
                        <Text style={styles.textStyle1}>
                            {name} expires {expiry}
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
    },
    textStyle2: {
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