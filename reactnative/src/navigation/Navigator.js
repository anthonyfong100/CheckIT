import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { 
    createMaterialTopTabNavigator, 
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../common';
import { connect } from "react-redux";
import { Container, Header, Body, Title, Content, Right, Icon } from 'native-base';

import CameraScreen from '../common/CameraScreen';
import CameraTD from '../scenes/CameraTD';
import ShoppingList from '../scenes/ShoppingList';
import Fridge from '../scenes/Fridge';
import Recipe from '../scenes/Recipe';
import RecipeCards from '../common/RecipeCards';
import SignUp from "../scenes/SignUp";
import SignIn from "../scenes/SignIn";

import axios from 'axios';


class RecipeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
          recipe: []
        }
      }
    

    componentDidMount() {
        const req = 
        'https://us-central1-checkit-6682c.cloudfunctions.net/recipe_generation?expiryIngredients=["EGGS","HAM","BACON","HONEY"]&otherIngredients=["BARLEY","SUGAR","LEMON","CEREAL"]'
        console.log(req)
        axios.get(req)
            .then(res => {
                resultRemoveBracket = res.data
                resultNewApos = resultRemoveBracket.replace(/'/g,'"')
                resultString = JSON.parse(resultNewApos)
                

                recipeLoad = []

                for (var i = 0; i < 10; i++ ){
                    var ingredientArray = []
                    for (var j in resultString[1][i][1]["Ingredients"]){
                        ingredientArray.push(resultString[1][1][1]["Ingredients"][j])
                    }
                    var recipeInfo = {
                        imageSource: resultString[1][i][1]["ImageUrl"],
                        estimatedTime: resultString[1][i][1]["Time"],
                        rating: resultString[1][i][1]["Rating"],
                        noOfItemUsed: resultString[1][i][2],
                        ingredients: ingredientArray
                    }
                    recipeLoad.push(recipeInfo)


                }
                console.log(recipeLoad)
                this.setState({
                    recipe: recipeLoad
                })
                
            })
            .catch(err => console.log(err))
    
    }

    iterateThroughRecipes(){
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

    reloadPage() {
        console.log("Reloading working")
        const req = 
        'https://us-central1-checkit-6682c.cloudfunctions.net/recipe_generation?expiryIngredients=["EGGS","HAM","BACON","HONEY"]&otherIngredients=["BARLEY","SUGAR","LEMON","CEREAL"]'
        console.log(req)
        axios.get(req)
            .then(res => {
                resultRemoveBracket = res.data
                resultNewApos = resultRemoveBracket.replace(/'/g,'"')
                resultString = JSON.parse(resultNewApos)
                

                recipeLoad = []

                for (var i = 0; i < 10; i++ ){
                    var ingredientArray = []
                    for (var j in resultString[1][i][1]["Ingredients"]){
                        ingredientArray.push(resultString[1][1][1]["Ingredients"][j])
                    }
                    var recipeInfo = {
                        imageSource: resultString[1][i][1]["ImageUrl"],
                        estimatedTime: resultString[1][i][1]["Time"],
                        rating: resultString[1][i][1]["Rating"],
                        noOfItemUsed: resultString[1][i][2],
                        ingredients: ingredientArray
                    }
                    recipeLoad.push(recipeInfo)


                }
                console.log(recipeLoad)
                this.setState({
                    recipe: recipeLoad
                })
                
            })
            .catch(err => console.log(err))
    
    }
    
        
    render() {
        
        return (
            <Container style={styles.container}>
                <Header
                    style={{ backgroundColor: '#f2f2f2' }}
                    androidStatusBarColor="#000000"
                >
                <Body>
                    <Title style={{ color: '#000' }}>Recipes</Title>
                </Body>
                <Right>
                        <Button 
                        light
                        rounded
                        onPress = {() => {this.reloadPage()}}
                        >
                            <Icon name='ios-refresh' style={{ color: '#4DAD4A'}} />
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.container}>
                    <ScrollView style = {styles.recipeScreenContainer}>
                    {this.iterateThroughRecipes()}
                    </ScrollView>
                </Content>
            </Container>
        );
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
        CameraScreen: { screen: CameraTD,
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

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, isLoggedIn } = auth;
    return { email, password, error, loading, isLoggedIn };
};

export default connect(mapStateToProps)(MyNavigator);