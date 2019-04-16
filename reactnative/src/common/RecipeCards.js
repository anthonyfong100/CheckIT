import React, { Component } from 'react';
import { View, Text, AppRegistry, ImageBackground, StyleSheet } from 'react-native';
import CollapseView from 'react-native-collapse-view';
import AddButtonToShopping from './AddButtonToShopping';



export default class RecipeCards extends Component {
    constructor(props) {
        super(props);

    }


    _renderIngredients() {
        i = 0;

        return this.props.ingredients.map(item => {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>{item}</Text>
                    <AddButtonToShopping />
                </View>

            )
            i = i + 1;
        })
    }

    _renderCollapseView = (collapse) => {
        return (
            <View style={styles.containerStyleOne}>
                <View>
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

    _renderTensionView = (collapse) => {
        const { imageSource } = this.props;
        return (
            <View style={styles.containerStyle}>

                <ImageBackground source={{ uri: this.props.imageSource }} style={styles.imageBackground}>

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