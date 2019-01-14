import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ShoppingList from './scenes/ShoppingList';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar>
                
                <Scene key="auth">
                    // login form/ sign up form
                </Scene>
                
                <Scene key="main">
                    
                    // shopping list Scene
                    <Scene 
                        key="shoppingList" 
                        component={ShoppingList} // refers to ShoppingList.js
                        title="Shopping List"
                    /> 
                    
                    
                    <Scene /> // camera scene
                    <Scene /> // fridge scene (this will be initial scene)
                    <Scene /> // recipe scene
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;