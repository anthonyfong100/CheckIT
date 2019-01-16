import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
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
                        <Scene
                            rightTitle="Add"
                            onRight={() => Actions.shoppingFoodCreate()}
                            key="myShoppingList"
                            component={ShoppingList}
                            title="My Shopping List"
                        />
                        <Scene
                            rightTitle="Add"
                            onRight={() => Actions.fridgeFoodCreate()}
                            key="myFridge"
                            component={Fridge}
                            title="My Fridge"
                            initial
                        />
                        <Scene  
                            key="recipes"
                            component={Recipe}
                            titles="Recipes"
                        />
                    </Scene>
                </Scene>
        </Router>
    );
};

export default RouterComponent;