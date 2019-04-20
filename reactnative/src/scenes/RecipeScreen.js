import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Card, CardSection } from '../common';
import { Container, Header, Body, Title, Content, Right, Icon, Button, Item } from 'native-base';
import { Spinner } from '../common';
import RecipeCards from '../common/RecipeCards';

import { connect } from 'react-redux';
import { fridgeFoodFetch } from '../actions';
import Moment from 'moment'

import axios from 'react-native-axios';

class RecipeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: [],
            loading: true,
            expiryItems: "",
            otherItems: ""
        }
    }

    componentWillMount() {
        this.props.fridgeFoodFetch();
        this.createDataSource(this.props);
        this.APICall()
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ fridgeFoods }) {
        var expiryItem = ""
        var otherItem = ""
        for (var i = 0; i < fridgeFoods.length; i++) {
            if (Moment(fridgeFoods[i]["expiry"], "MMMM Do YYYY").fromNow().includes("day")) {
                expiryItem = expiryItem + '"' + fridgeFoods[i]["name"].toUpperCase() + '",'
            } else {
                otherItem = otherItem + '"' + fridgeFoods[i]["name"].toUpperCase() + '",'
            }
        }
        expiryItem = expiryItem.slice(0, -1)
        otherItem = otherItem.slice(0, -1)
        this.setState({ expiryItems: expiryItem, otherItems: otherItem })
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

    renderSpinner() {
        if (this.state.loading) {
            return (
                <Item style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Spinner size="large" />
                </Item>
            )
        }
    }

    reloadPage() {
        this.setState({ loading: true })
        Alert.alert("Generating new recipes...")
        this.APICall()
    }

    APICall() {
        const expiryItem = this.state.expiryItems
        const otherItem = this.state.otherItems
        const req =
            'https://us-central1-checkit-6682c.cloudfunctions.net/recipe_generation?expiryIngredients=[' + expiryItem + ']&otherIngredients=[' + otherItem + ']'
        console.log(req)
        axios.get(req)
            .then(res => {
                console.log(res.data)
                resultRemoveBracket = res.data
                // for ( var i = 0; resultRemoveBracket )
                resultNewApos = resultRemoveBracket.replace(/'s/g, "")
                resultNewApos = resultNewApos.replace(/'S /g, 's ')
                resultNewApos = resultNewApos.replace(/' s/g, ' s')
                resultNewApos = resultNewApos.replace(/'/g, '"')
                console.log(resultNewApos)
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
                // console.log(recipeLoad)
                this.setState({
                    recipe: recipeLoad
                })
                this.setState({ loading: false })
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
                            success
                            onPress={() => { this.reloadPage() }}
                        >
                            <Icon name='md-refresh' style={{ color: '#FFF' }} />
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.container}>
                    {this.renderSpinner()}
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

const mapStateToProps = (state) => {
    const fridgeFoods = _.map(state.fridgeFoods, (val, uid) => {
        return { ...val, uid }
    });
    return { fridgeFoods }
}

export default connect(mapStateToProps, {
    fridgeFoodFetch
})(RecipeScreen);