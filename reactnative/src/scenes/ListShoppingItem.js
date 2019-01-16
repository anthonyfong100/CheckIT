// helper function that renders individual lists
import React, { Component } from 'react';
import { Text, View, TouchableWithFeedback } from 'react-native';
import { CardSection } from '../common';
import { Actions } from 'react-native-router-flux';

class ListShoppingItem extends Component {
    render() {

        const { name } = this.props.shoppingFood;

        return (
            <TouchableWithFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={styles.textStyle}>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithFeedback>
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