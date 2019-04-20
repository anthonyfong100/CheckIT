import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, Alert } from 'react-native';

import { connect } from 'react-redux';
import { shoppingFoodCreate } from '../actions';

class AddButtonToShopping extends Component {

    onButtonPress() {
        const name = this.props.indgredientName
        console.log(name)
        this.props.shoppingFoodCreate({ name })
        Alert.alert("Item added to shopping list!")
    };

    render() {
        return (
            <TouchableOpacity onPress={
                this.onButtonPress.bind(this)
            }>
                <Image source={require('./../../assets/addButton.png')} style={{ width: 15, height: 15 }} >

                </Image>
            </TouchableOpacity>
        )
    };
}


const mapStateToProps = (state) => {
    const { name } = state.addShoppingFoods;
    return { name }
}

export default connect(mapStateToProps, {
    shoppingFoodCreate
})(AddButtonToShopping);