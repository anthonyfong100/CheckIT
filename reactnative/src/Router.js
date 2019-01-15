import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import SignUpForm from './scenes/SignUpForm';
import ShoppingList from './scenes/ShoppingList';
import Camera from './scenes/Camera';
import Fridge from './scenes/Fridge';
import Recipe from './scenes/Recipe';

const RouterComponent = () => {
    return (
        <Router>
            <Scene>
                <Scene key="root" hideNavBar>
                    <Scene key="auth">
                        <Scene 
                            key="signUpForm"
                            component={SignUpForm}
                            title="Please Login"
                            initial
                        />
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;