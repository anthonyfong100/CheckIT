import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { CardSection } from '../common';

class ListFridgeItem extends Component {
    render() {
        const { name, expiry } = this.props.fridgeFood;

        let swipeButtons = [{
            text: 'Eaten',
            backgroundColor: 'blue',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: ()=> { }
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

export default ListFridgeItem;