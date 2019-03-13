import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Header, Body, Title, Content, Button, Icon, Input, Item, Right } from 'native-base';

import { connect } from 'react-redux';
import { shoppingFoodFetch, shoppingFoodCreate, shoppingFoodUpdate } from '../actions';
import ListShoppingItem from '../containers/ListShoppingItem';

class ShoppingList extends Component {
    
    componentWillMount() {
        this.props.shoppingFoodFetch();
        this.createDataSource(this.props);
    }

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

    render() {
        return(
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
                        rounded>
                            <Icon name='md-cart' style={{ color: '#4DAD4A'}} />
                        </Button>
                    </Right>
                </Header>
                <Content style={{ flex: 1, backgroundColor: '#fff', marginTop: 5 }}>
                
                <Item>
                    <Input 
                        label="Item"
                        placeholder="Add Item"
                        value={this.props.name}
                        onChangeText={value => this.props.shoppingFoodUpdate({ prop: 'name', value })}
                    />
                    <Button
                        rounded
                        onPress={this.onButtonPress.bind(this)}
                    >
                        <Icon name="add" />
                    </Button>
                </Item>
               
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
}) (ShoppingList);