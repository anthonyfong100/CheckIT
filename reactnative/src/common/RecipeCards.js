import React, { Component } from 'react';
import { View, Text, AppRegistry, ImageBackground, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import CollapseView from 'react-native-collapse-view';
import AddButtonToShopping from './AddButtonToShopping';



export default class RecipeCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likeState: false,
            loading: true
        }
    }
    

    openLinkFunction() {
        Linking.openURL(this.props.recipeUrl).catch((err) => console.error('An error occurred', err));
    }


    _renderIngredients() {
        i = 0;

        return this.props.ingredients.map(item => {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>{item}</Text>
                    <AddButtonToShopping indgredientName={item} />
                </View>

            )
            i = i + 1;
        })
    }


    _renderCollapseView = (collapse) => {

        currentState = this.state.likeState
        return (
            <View style={{borderBottomWidth: 1,
                paddingTop: 20,
                backgroundColor: '#F5F1F1',
                justifyContent: 'center',
                flexDirection: 'column',
                borderColor: '#ddd',
                alignItems: 'center',
                elevation: 3,
                height : this.props.ingredients.length * 25 }}>

                <View>
                <TouchableOpacity onPress = {() => this.openLinkFunction()}>
                <Text style = {{fontWeight: 'bold'}}>{this.props.recipeName}</Text>
                </TouchableOpacity>
                    <Text>
                        Ingredients needed
                </Text>
                </View>
                <View>
                    {this._renderIngredients()}
                </View>
            </View>
        )
    }

    renderHeartShape = () => {
        if (this.state.likeState == false) {
            return (
                <Image style={{ width: 40, height: 40 }} source={require('./../../assets/heartshape_uncolored.png')} />
            )
        } else {
            return (<Image style={{ width: 40, height: 40 }} source={require('./../../assets/heartshape_red.png')} />
            )
        }
    }

    _renderTensionView = (collapse) => {
        const { imageSource } = this.props;
        return (
            <View style={styles.containerStyle}>


                <ImageBackground source={{ uri: this.props.imageSource }} style={styles.imageBackground}>
                    <View style={{ position: 'absolute', alignSelf: 'flex-start' }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                likeState: !currentState
                            })
                        }}>
                            {this.renderHeartShape()}


                        </TouchableOpacity>
                    </View>

                    <View style={{ position: 'absolute', alignSelf: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Text style={{ color: 'white' }}>
                            Estimated Time: {this.props.estimatedTime}
                        </Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Text style={{ color: 'white' }}>
                            Item Used: {this.props.noOfItemUsed}
                        </Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <Text style={{ color: 'white' }}>
                            Rating: {this.props.rating}
                        </Text>
                    </View>

                </ImageBackground>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <CollapseView
                    renderView={this._renderTensionView}
                    renderCollapseView={this._renderCollapseView}
                />
            </View>


        );
    };


};

const styles = StyleSheet.create({
    imageBackground: {
        width: '100%',
        height: 100,

        opacity: 0.8



    },

    containerStyle: {

        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',

    },
    containerStyleOne: {
        borderBottomWidth: 1,
        backgroundColor: '#F5F1F1',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: '#ddd',
        alignItems: 'center',
        elevation: 3
    },

})


AppRegistry.registerComponent('RecipeCards', () => RecipeCards);