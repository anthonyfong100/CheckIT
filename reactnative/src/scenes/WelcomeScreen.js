import React, { Component } from 'react';
import { Card, CardSection, Button } from '../common';
import { View, Text, Image } from 'react-native';
import fastfood from '../../assets/fastfood.png';
import SignUpForm from './SignUpForm';

class WelcomeScreen extends Component {    
    renderImage() {
        return (
            <View>
                <Image 
                    style= {{ height: 340, width: 340 }}
                    resizeMode={"cover"}
                    source={fastfood}></Image>
            </View>
        )
    }
    
    render() {
        return (
            <Card>
                <CardSection>
                    {this.renderImage()}
                </CardSection>
                <CardSection>
                    <Button onPress={()=> this.props.navigation.navigate('SignUpForm')}>Log In</Button>
                </CardSection>
                <CardSection>
                    <Button>Sign Up</Button>
                </CardSection>
            </Card>
           
        )
    }
}

export default WelcomeScreen;