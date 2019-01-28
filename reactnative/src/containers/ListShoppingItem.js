import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from '../common';

class ListShoppingItem extends Component {
    render() {
        const { name } = this.props.shoppingFood;
        return (
            <View>
                <CardSection>
                    <Text style={styles.textStyle}>
                        {name}
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

export default ListShoppingItem;