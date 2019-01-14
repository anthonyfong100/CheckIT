// helper function that renders individual lists
import React, { Component } from 'react';
import { Text, View, TouchableWithFeedback } from 'react-native';

class ListItem extends Component {
    render() {
        return (
            <TouchableWithFeedback>
                <View>
                    <Text style={styles.textStyle}>
                        Each food will be rendered here
                    </Text>
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

export default ListItem;