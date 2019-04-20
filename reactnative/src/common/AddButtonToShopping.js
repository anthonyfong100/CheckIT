import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { shoppingFoodCreate } from '../actions';

class AddButtonToShopping extends Component {
    constructor(props) {
        super(props);

    };

    onButtonPress() {
        const name = ""
        this.props.shoppingFoodCreate({ name })
    };


    render() {
        return (
            <TouchableOpacity onPress={this.onButtonPress}>
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