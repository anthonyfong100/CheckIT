import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from '../common';

class ListFridgeItem extends Component {
    render() {
        const { name, expiry } = this.props.fridgeFood;
        return (
            <View>
                <CardSection>
                    <Text style={styles.textStyle}>
                        {name}
                    </Text>
                    <Text style={styles.textStyle}>
                        {expiry}
                    </Text>
                </CardSection>
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default ListFridgeItem;