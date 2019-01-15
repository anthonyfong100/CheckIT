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
                    
                    // shopping list Scene
                    <Scene 
                        key="shoppingList" 
                        component={ShoppingList} 
                        title="Shopping List"
                    /> 
                    
                    // camera scene
                    <Scene 
                        key="camera"
                        component={Camera}
                        title="Camera"
                    /> 

                    // fridge scene (this will be initial scene)
                    <Scene 
                        key="fridge"
                        component={Fridge}
                        title="My Fridge"
                        intial
                    />
                    
                    // recipe scene
                    <Scene 
                        key="recipe"
                        component={Recipe}
                        title="Recipes"
                    /> 
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;