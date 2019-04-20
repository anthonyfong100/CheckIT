import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, Alert } from 'react-native';
import { Container, Header, Body, Title, Content, Button, Icon, Input, Item, Right } from 'native-base';

import { connect } from 'react-redux';
import { shoppingFoodFetch, shoppingFoodCreate, shoppingFoodUpdate } from '../actions';
import ListShoppingItem from '../containers/ListShoppingItem';
import { Spinner } from '../common';

import axios from 'react-native-axios';

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }

    }

    componentWillMount() {
        this.props.shoppingFoodFetch();
        this.createDataSource(this.props);
    }

    // process shopping list into an array
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ shoppingFoods }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(shoppingFoods);
    }

    renderRow(shoppingFood) {
        return <ListShoppingItem shoppingFood={shoppingFood} />;
    }

    onButtonPress() {
        const { name } = this.props;
        this.props.shoppingFoodCreate({ name });
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

    submitAPI(shoppingFoodAPI) {
        // console.log(shoppingFoodAPI)
        const req = "https://us-central1-checkit-6682c.cloudfunctions.net/associations_generation?shoppingList=[" + shoppingFoodAPI + "]"
        console.log(req)
        axios.get(req)
            .then(res => {
                var resString = String(res.data).slice(2, -2)
                // var resString = String("[['MOZZARELLA CHEESE', 'LUNCHEON MEAT', 'SALAMI']]").slice(2, -2)
                //console.log(resString)
                resString = resString.replace(/'/g, '')
                //console.log(resString)
                resString = resString.replace(/ '/g, '')
                //console.log(resString)

                var result = resString.split(", ")

                for (var i = 0; i < result.length; i++) {
                    var name = result[i]
                    // console.log(name)

                    name = name.toLowerCase()
                    name = name.charAt(0).toUpperCase() + name.slice(1)
                    // console.log(name)
                    this.props.shoppingFoodCreate({ name })
                }
            })
            .then(() => {
                this.setState({ loading: false })
                Alert.alert("Suggested items added!")
            })
            .catch(err => console.log(err))
    }

    onAddButtonPress() {
        this.setState({ loading: true })
        const shoppingFoodLoop = this.props.shoppingFoods
        var shoppingFoodAPI = ""
        for (var i = 0; i < shoppingFoodLoop.length; i++) {
            shoppingFoodAPI = shoppingFoodAPI + '"' + shoppingFoodLoop[i]["name"].toUpperCase() + '",'
        }
        shoppingFoodAPI = shoppingFoodAPI.slice(0, -1)
        this.submitAPI(shoppingFoodAPI)
        Alert.alert("Analysing current items... Please wait...")
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header
                    style={{ backgroundColor: '#f2f2f2' }}
                    androidStatusBarColor="#000"
                >
                    <Body>
                        <Title style={{ color: '#000' }}>My Shopping List</Title>
                    </Body>
                    <Right>
                        <Button
                            light
                            rounded
                            success
                            onPress={() => this.onAddButtonPress()}
                        >
                            <Icon name='md-bulb' style={{ color: '#FFF' }} />
                        </Button>
                    </Right>
                </Header>
                <Content style={{ flex: 1, backgroundColor: '#fff', marginTop: 5 }}>

                    <Item
                        style={{ paddingEnd: 10 }}
                    >
                        <Input
                            label="Item"
                            placeholder="Add Item"
                            value={this.props.name}
                            onChangeText={value => this.props.shoppingFoodUpdate({ prop: 'name', value })}
                        />
                        <Button
                            rounded
                            success
                            onPress={this.onButtonPress.bind(this)}
                        >
                            <Icon name="add" />
                        </Button>
                    </Item>
                    {this.renderSpinner()}
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const shoppingFoods = _.map(state.shoppingFoods, (val, uid) => {
        return { ...val, uid };
    });
    const { name } = state.addShoppingFoods;
    return { shoppingFoods, name };
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
}

export default connect(mapStateToProps, {
    shoppingFoodFetch,
    shoppingFoodCreate,
    shoppingFoodUpdate
})(ShoppingList);