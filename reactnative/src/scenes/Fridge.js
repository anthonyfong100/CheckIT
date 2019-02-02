import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Container, Header, Body, Title, Content, Button, Icon, Input, Item, DatePicker } from 'native-base';
import Moment from 'moment';

import { connect } from 'react-redux';
import { fridgeFoodFetch, fridgeFoodCreate, fridgeFoodUpdate } from '../actions';
import ListFridgeItem from '../containers/ListFridgeItem';

class Fridge extends Component {
    
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }

    componentWillMount() {
        this.props.fridgeFoodFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        /* nextProps are the next set of props 
        that this component will be rendered with.
        this.props is the old set of props*/
        this.createDataSource(nextProps);
    }
    
    createDataSource({ fridgeFoods }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(fridgeFoods)
    }

    renderRow(fridgeFood) {
        return <ListFridgeItem fridgeFood={fridgeFood} />;
    }
    
    onButtonPress() {
        const { name, expiry } = this.props;
        this.props.fridgeFoodCreate({ name, expiry });
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        Moment.locale('en');
        value = Moment(newDate).fromNow();
        this.props.fridgeFoodUpdate({ prop: 'expiry', value });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header
                    style={{ backgroundColor: '#f2f2f2' }}
                    androidStatusBarColor="#000"
                >
                    <Body>
                        <Title style={{ color: '#000' }}>My Fridge</Title>
                    </Body>
                </Header>
                <Content style={{ flex: 1, backgroundColor: '#fff', marginTop: 5 }}>
                
                <Item>
                    <Input 
                        label="Item"
                        placeholder="Add Item"
                        value={this.props.name}
                        onChangeText={value => this.props.fridgeFoodUpdate({ prop: 'name', value })}
                    />
                    <DatePicker
                        defaultDate={new Date(2019, 4, 4)}
                        minimumDate={new Date(2019, 1, 1)}
                        maximumDate={new Date(2100, 12, 31)}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select Expiry Date"
                        textStyle={{ color: "green", fontSize: 18, alignSelf: 'center'  }}
                        placeHolderTextStyle={{ color: "#c2c2c2" }}
                        onDateChange={this.setDate}
                        disabled={false}
                    />
                    <Button
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
    const fridgeFoods = _.map(state.fridgeFoods, (val, uid) => {
        return { ...val, uid };
    });
    const { name, expiry } = state.addFridgeFoods;

    return { fridgeFoods, name, expiry };
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
}

export default connect(mapStateToProps, { 
    fridgeFoodFetch, 
    fridgeFoodCreate,
    fridgeFoodUpdate 
})(Fridge);