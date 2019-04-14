import React, { Component } from 'react';
import { View, Text, Platform, StatusBar, ScrollView } from 'react-native';
import { Card, CardSection } from '../common';
import { Container, Header, Body, Title, Content, Right, Icon, Button } from 'native-base';

import RecipeCards from '../common/RecipeCards';

import axios from 'react-native-axios';

class RecipeScreen extends Component {
    constructor(props) {
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
                resultNewApos = resultRemoveBracket.replace(/'/g, '"')
                resultString = JSON.parse(resultNewApos)


                recipeLoad = []

                for (var i = 0; i < 10; i++) {
                    var ingredientArray = []
                    for (var j in resultString[1][i][1]["Ingredients"]) {
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

    iterateThroughRecipes() {
        return this.state.recipe.map(item => {
            return (
                <View style={styles.recipeCardContainer}>
                    <RecipeCards
                        imageSource={item.imageSource}
                        estimatedTime={item.estimatedTime}
                        rating={item.rating}
                        noOfItemUsed={item.noOfItemUsed}
                        ingredients={item.ingredients}

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
                resultNewApos = resultRemoveBracket.replace(/'/g, '"')
                resultString = JSON.parse(resultNewApos)


                recipeLoad = []

                for (var i = 0; i < 10; i++) {
                    var ingredientArray = []
                    for (var j in resultString[1][i][1]["Ingredients"]) {
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
                            onPress={() => { this.reloadPage() }}
                        >
                            <Icon name='ios-refresh' style={{ color: '#4DAD4A' }} />
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.container}>
                    <ScrollView style={styles.recipeScreenContainer}>
                        {this.iterateThroughRecipes()}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

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

export default RecipeScreen