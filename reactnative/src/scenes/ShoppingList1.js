// render code for recipe
import React, { Component } from 'react';
import { Text, View, StatusBar, ListView } from 'react-native';
import { Icon, Container, Content, Header, Form, List, ListItem, Input, Item, Button, Label, Title, Left, Body, Right } from 'native-base';
import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';

class ShoppingList1 extends Component {
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
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/recipes`).on('child_added', function(data){

            var newData = [...that.state.listViewData]
            newData.push(data)
            that.setState({listViewData : newData})
        })
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
                    <Title style={{ color: '#000000' }}>My Shopping List</Title>
                </Body>
            
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
export default ShoppingList1;