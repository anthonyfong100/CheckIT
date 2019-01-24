import React, { Component } from 'react';
import { Text } from 'react-native';
import { List, ListItem, Button, Icon  } from 'native-base';

class ListFridgeItem extends Component {
    render() {
        const { name, expiry } = this.props.fridgeFood;
        
        return (
            <List>
                <ListItem>
                    <Text
                        style={styles.textStyle}
                    >
                    {name}
                    {expiry}
                    </Text>
                </ListItem>

                renderRightHiddenRow={(secId, rowId, rowMap, data)} =>
                    <Button
                        full
                        danger
                        onPress={() => this.deleteRow(secId, rowId, rowMap, data)}
                    >
                        <Icon name="add" />
                    </Button>
            </List>

            /*
            <TouchableWithFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection>
                        <Text style={StyleSheet.textStyle}>
                            {name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableWithFeedback>
            */
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