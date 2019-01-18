import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import SignUpForm from './scenes/SignUpForm';
import ShoppingList from './scenes/ShoppingList';
import Camera from './scenes/Camera';
import Fridge from './scenes/Fridge';
import Recipe from './scenes/Recipe';
import CameraScreen from './common/CameraScreen'
import camera from '../assets/camera.png';
import Tabs from './NavBar';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene 
                        key="signUpForm"
                        component={SignUpForm}
                        title="Please Login"
                        initial
                    />
                </Scene>
                <Scene key="main">
                    <Tabs />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;