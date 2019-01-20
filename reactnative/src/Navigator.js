import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, ScrollView} from 'react-native';
import { Card, CardSection } from './common';
import { 
    createMaterialTopTabNavigator, 
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraScreen from './common/CameraScreen';
import RecipeCards from './common/RecipeCards';
// import ShoppingList from './scenes/ShoppingList';
// import Fridge from './scenes/Fridge';
// import Recipe from './scenes/Recipe';
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


class RecipeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          recipe: [{imageSource: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Chilli_crab-02.jpg', estimatedTime: '7seconds', rating: '5 stars', noOfItemUsed: '7 items', ingredients: ['Watermelon', 'Pork']}, 
          {imageSource: 'https://vignette.wikia.nocookie.net/moderncombatgames/images/0/0d/Chicken_Rice.png/revision/latest?cb=20151231093652', estimatedTime: '15 minutes', rating: '2 stars', noOfItemUsed: '12 items', ingredients: ['Chicken', 'Veggie']}]
        }
      }
      iterateThroughRecipes() {
        return this.state.recipe.map(item => {
          return(
            <View style = {styles.recipeCardContainer}>
            <RecipeCards
              imageSource={item.imageSource}
              estimatedTime={item.estimatedTime}
              rating = {item.rating}
              noOfItemUsed = {item.noOfItemUsed}
              ingredients = {item.ingredients}
    
            />
            </View>
          )
        })
    }
    render() {
        return (
            <ScrollView style = {styles.recipeScreenContainer}>
            {this.iterateThroughRecipes()}
            </ScrollView>
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
        RecipeScreen: { screen: RecipeScreen,
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
    },
    recipeScreenContainer: {
        flex: 1,
        
       
    },
    recipeCardContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }

}
