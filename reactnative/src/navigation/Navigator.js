import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import {
    createMaterialTopTabNavigator,
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

import CameraTD from '../scenes/CameraTD';
import ShoppingList from '../scenes/ShoppingList';
import Fridge from '../scenes/Fridge';
import RecipeScreen from '../scenes/RecipeScreen';
import SignUp from "../scenes/SignUp";
import SignIn from "../scenes/SignIn";

// TODO hide header for camera
export const SignedInNavigator = createMaterialTopTabNavigator(
    {

        Fridge: {
            screen: Fridge,
            navigationOptions: {
                tabBarLabel: 'Fridge'
            }
        },
        Shopping: {
            screen: ShoppingList,
            navigationOptions: {
                tabBarLabel: 'Shops',
                title: "Shopping List"
            }
        },
        CameraScreen: {
            screen: CameraTD,
            navigationOptions: {
                tabBarLabel: 'Camera'
            }
        },
        RecipeScreen: {
            screen: RecipeScreen,
            navigationOptions: {
                tabBarLabel: 'Recipes'
            }
        }
    },
    {
        tabBarPosition: 'bottom',
        unmountInactiveRoutes: true,
        initialRouteName: 'Fridge',
        swipeEnabled: false,
        animationEnabled: true,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Fridge') {
                    iconName = 'md-list';
                } else if (routeName === 'Shopping') {
                    iconName = 'md-checkbox-outline';
                } else if (routeName === 'CameraScreen') {
                    iconName = 'md-camera';
                } else if (routeName === 'RecipeScreen') {
                    iconName = 'md-restaurant';
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#4DAD4A',
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: '#f2f2f2'
            },
            indicatorStyle: {
                height: 0
            },
            showIcon: true
        }
    }
);

const SignedOutNavigator = createStackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                title: "Sign In",

            }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: {
                title: "Sign Up",

            }
        }
    }
)


export const MyNavigator = createSwitchNavigator(
    {
        SignedIn: { screen: SignedInNavigator },
        SignedOut: { screen: SignedOutNavigator }
    },
    {
        initialRouteName: 'SignedOut'
    }
);


const styles = {
    container: {
        flex: 1
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, isLoggedIn } = auth;
    return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps)(MyNavigator);