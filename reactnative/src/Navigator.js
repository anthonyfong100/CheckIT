import React, { Component } from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { Card, CardSection } from './common';
import { 
    createMaterialTopTabNavigator, 
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraScreen from './common/CameraScreen';
// import ShoppingList from './scenes/ShoppingList';
// import Fridge from './scenes/Fridge';
import Recipe from './scenes/Recipe';
// import SignUpForm from './scenes/SignUpForm';
// import WelcomeScreen from './scenes/WelcomeScreen';
import { Button } from './common';

import SignUp from "./scenes/SignUp";
import SignIn from "./scenes/SignIn";

// gives a header spacing, not needed for now
const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  };

// Dummy Classes
class LoginForm extends Component {
    render() {
        return (
            <Text>LoginForm</Text>
        );
    }
}

/*
class Recipe extends Component {
    render() {
        return (
            <Text>Recipe</Text>
        );
    }
}*/


class Fridge extends Component {
    render() {
        return (
            <Text>Fridge</Text>
        );
    }
}

class ShoppingList extends Component {
    render() {
        return (
            <Text>ShoppingList</Text>
        );
    }
}
// ^ dummy classes





// TODO style the welcome screen

class WelcomeScreen extends Component {
    // TODO make LoginForm
    render() {
        return (
            <View >
                <Card>
                    <CardSection>
                        <Button
                            title="Log In"
                            onPress={() => this.props.navigation.navigate('LoginForm')} 
                        />
                </CardSection>
                <CardSection>
                    <Button 
                        title="Sign Up" 
                        onpress={() => this.props.navigation.navigate(SignUpForm)}
                    />
                </CardSection>
                </Card>
            </View>
        )
    }
}

// TODO hide header for camera
export const SignedInNavigator = createMaterialTopTabNavigator (
    {
        
        Fridge: { screen: Fridge,
            navigationOptions: {
                tabBarLabel: 'Fridge'
            } 
        },
        Shopping: { screen: ShoppingList,
            navigationOptions: {
                tabBarLabel: 'Shops',
                title: "Shopping List"
            }
        },
        CameraScreen: { screen: CameraScreen,
            navigationOptions: {
                tabBarLabel: 'Camera'
            }
        },
        Recipe: { screen: Recipe,
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
                } else if (routeName === 'Recipe') {
                    iconName = 'md-restaurant';
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            activeTintColor: 'orange',
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

export const SignedOutNavigator = createStackNavigator(
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

export const MyNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: { screen: SignedInNavigator },
            SignedOut: { screen: SignedOutNavigator }
            },
        {
            initialRouteName: signedIn ? "SignedOut" : "SignedIn"
        }
    );
};

// export const MyNavigator = createAppContainer(RootNavigator);

const styles = {
    container: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}
