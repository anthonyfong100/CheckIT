import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from 'react-navigation';

class ShoppingList extends Component {
    render() {
      return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <Text>shoppinglist</Text>
        </View>
      );
    }
  }

class CameraScreen extends Component {
    render() {
        return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>camera</Text>
        </View>
        );
    }
}

class Fridge extends Component {
    render() {
        return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>Fridge</Text>
        </View>
        );
    }
}

class Recipe extends Component {
    render() {
        return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>recipe</Text>
        </View>
        );
    }
}

export const Tabs = createMaterialTopTabNavigator ({
    Shopping: { screen: ShoppingList,
        navigationOptions: {
            tabBarLabel: 'Shop',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cash" size={24} />
            )
        } 
    },
    Camera: { screen: CameraScreen, 
        navigationOptions: {
            tabBarLabel: 'Camera',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cash" size={24} />
            )
        } 
    },

    Fridge: { screen: Fridge,
        navigationOptions: {
            tabBarLabel: 'Fridge',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="fridge" size={24} />
            )
        }  
    },

    Recipe: { screen: Recipe, 
        navigationOptions: {
            tabBarLabel: 'Recipes',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cash" size={24} />
            )
        } 
    }
}, {
    intialRouteName: 'Fridge',
    order:['Shopping', 'Camera', 'Fridge', 'Recipe'],
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
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
})
