// render code for recipe
import React, { Component } from 'react';
import { Text, View, StatusBar, ListView } from 'react-native';
import { Icon, Container, Content, Header, Form, List, ListItem, Input, Item, Button, Label, Title, Left, Body, Right } from 'native-base';
import firebase from '@firebase/app';
import '@firebase/database';
import axios from 'axios';


class Recipe extends Component {
    constructor(props) {
        super(props);

        var data = []

        this.ds = new ListView.DataSource({ 
            rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state= {
            listViewData: data,
            newItem: ""
        }
    }

    componentDidMount() {
        var that = this
        firebase.database().ref('/recipes').on('child_added', function(data){

            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData : newData})
        })

        const req = "https://us-central1-checkit-6682c.cloudfunctions.net/recipe_generation"
        console.log(req)
        axios.get(req, {
            params: {
                expiryIngredients : ['EGGS',"HAM",'BACON',"HONEY"],
                otherIngredients : ['BARLEY',"SUGAR",'LEMON',"CEREAL"]
        }})
            .then(res => {
                console.log(res.data)
                results = JSON.parse(res.data)
                for ( var key in results){
                    console.log(key)
                }
            })
            .catch(err => console.log(err))
    }

    addRow(data) {
        var key = firebase.database().ref('/recipes').push().key
        firebase.database().ref('/recipes').child(key).set({ name: data })
    }

    async deleteRow(secId, rowId, rowMap, data) {
        await firebase.database().ref('recipes/'+ data.key).set(null)

        rowMap[`${secId}${rowId}`].props.closeRow();
        var newData = [...this.state.listViewData];
        newData.splice(rowId, 1)
        this.setState({ listViewData: newData });
    }

    callAPIRecipe () {
        
    }

    /*
    showInfo(){

    }*/

    render () {
        return (
            <Container style={styles.container}>
                <Header
                    style={{ backgroundColor: '#f2f2f2' }}
                    androidStatusBarColor="#000000"
                >
                
                <Body>
                    <Title style={{ color: '#000000' }}>Recipes</Title>
                </Body>

                <Right>
                        <Button 
                        light
                        rounded>
                            <Icon name='md-cart' style={{ color: '#4DAD4A'}} />
                        </Button>
                    </Right>
            
                </Header>
                <Content style={styles.container}>
                        <Item>
                            <Input 
                                onChangeText = {(newItem) => this.setState({newItem})}
                                placeholder="Add Name"
                            />

                            <Button
                                onPress={()=>this.addRow(this.state.newItem)}
                            >
                                <Icon name="add" />
                            </Button>
                        </Item>
                    <List
                        enableEmptySections 
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem>
                                <Text style={{ paddingLeft: 15 }}>{data.val().name}</Text>
                            </ListItem>
                        }
                        /*
                        renderLeftHiddenRow={data =>
                            <Button 
                                full
                                primary
                                onPress={()=>this.showInfo(data)}
                            >
                                <Icon name="information-circle"/>
                            </Button>
                        }*/
                        
                        renderRightHiddenRow={(secId, rowId, rowMap, data) =>
                            <Button 
                                full
                                danger
                                onPress={()=>this.deleteRow(secId, rowId, rowMap, data)}
                            >
                                <Icon name="trash"/>
                            </Button>
                        }
                        
                        leftOpenValue={-75}
                        rightOpenValue={-75}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
}
export default Recipe;