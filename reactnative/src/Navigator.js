import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection } from './common';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { 
    createMaterialTopTabNavigator, 
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraScreen from './common/CameraScreen';
// import ShoppingList from './scenes/ShoppingList';
// import Fridge from './scenes/Fridge';
// import Recipe from './scenes/Recipe';
import SignUpForm from './scenes/SignUpForm';
import { Button } from './common';

// Dummy Classes
class LoginForm extends Component {
    render() {
        return (
            <Text>LoginForm</Text>
        );
    }
}

class Recipe extends Component {
    render() {
        return (
            <Text>Recipe</Text>
        );
    }
}

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
                        onpress={() => this.props.navigation.navigate('SignUpForm')}
                    />
                </CardSection>
                </Card>
            </View>
        )
    }
}

// TODO hide header for camera
const DashboardTabNavigator = createMaterialTopTabNavigator (
    {
        Shopping: { screen: ShoppingList,
            navigationOptions: {
                tabBarLabel: 'Shops',
                headerTitle: "Shopping List"
            }
        },
        CameraScreen: { screen: CameraScreen,
            navigationOptions: {
                tabBarLabel: 'Camera'
            }
        },
        Fridge: { screen: Fridge,
            navigationOptions: {
                tabBarLabel: 'Fridge'
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
        swipeEnabled: true,
        animationEnabled: true,
        
        defaultNavigationOptions: ({ navigation }) => ({
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
        },
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            let title;
            if (routeName === 'Fridge') {
                title = 'My Fridge';
            } else if (routeName === 'Shopping') {
                title = 'Shopping List';
            } else if (routeName === 'CameraScreen') {
                title = 'Camera';
            } else if (routeName === 'Recipe') {
                title = 'Recipes';
            }
            return {
              headerTitle: title
            };
        }
    }
);

const DashboardStackNavigator = createStackNavigator(
    {
        DashboardTabNavigator: DashboardTabNavigator
    },
    {
        
    }
)

const AppSwitchNavigator = createSwitchNavigator({
    Dashboard: { screen: DashboardStackNavigator },
    Welcome: { screen: WelcomeScreen } // TODO make welcome screen with signup login options
    
});

const MyNavigator = createAppContainer(AppSwitchNavigator);

const styles = {
    container: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default MyNavigator;