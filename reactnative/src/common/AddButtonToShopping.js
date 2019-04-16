import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { fridgeFoodCreate } from '../actions';

class AddButtonToShopping extends Component {
    constructor(props) {
        super(props);

    };

    onButtonPress() {
        const name = ""
        const expiry = ""
        this.props.fridgeFoodCreate({ name, expiry })
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
    const { name, expiry } = state.addFridgeFoods;
    return { name, expiry }
}

export default connect(mapStateToProps, {
    fridgeFoodCreate
})(AddButtonToShopping);