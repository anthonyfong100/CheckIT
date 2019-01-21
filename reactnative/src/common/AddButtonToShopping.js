import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';


export default class AddButtonToShopping extends Component{
    constructor(props){
        super(props);
        
    };

    onButtonPress(){
        console.log('Im pressed')
    };


    render(){
        return(
        <TouchableOpacity onPress ={this.onButtonPress}>
            <Image source = {require('./../../assets/addButton.png')} style = {{width: 15, height: 15}} >

            </Image>
        </TouchableOpacity>
        )
    };
}