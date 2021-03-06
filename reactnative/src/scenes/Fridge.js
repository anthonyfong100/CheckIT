import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, Alert } from 'react-native';
import { Container, Header, Body, Title, Content, Button, Icon, Input, Item, DatePicker, Right } from 'native-base';
import Moment from 'moment';
import { Spinner } from '../common';

import { connect } from 'react-redux';
import { fridgeFoodFetch, fridgeFoodCreate, fridgeFoodUpdate } from '../actions';
import ListFridgeItem from '../containers/ListFridgeItem';
import TutorialModal from '../components/TutorialModal';

class Fridge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            modalSetUp: false,
            loading: true
        };
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
        this.setState({ loading: false })
    }

    renderRow(fridgeFood) {
        return <ListFridgeItem fridgeFood={fridgeFood} />;
    }

    onButtonPress() {
        this.setState({ loading: true })
        const { name, expiry } = this.props;
        this.props.fridgeFoodCreate({ name, expiry });
        this.setState({ loading: false })
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        Moment.locale('en');
        value = Moment(newDate).format("D MMM YY");
        this.props.fridgeFoodUpdate({ prop: 'expiry', value });
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
                    <Right>
                        <Button
                            light
                            rounded
                            success
                            onPress={() => Alert.alert("Uploaded information to cloud")}
                            style={{ marginHorizontal: 5 }}
                        >
                            <Icon name="ios-cloud-upload" style={{ color: '#FFF' }} />
                        </Button>
                    </Right>
                </Header>
                <Content style={{ flex: 1, backgroundColor: '#fff', marginTop: 5 }}>

                    <Item
                        style={{ paddingEnd: 10 }}>
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
                            textStyle={{ color: "green", fontSize: 18, alignSelf: 'center' }}
                            placeHolderTextStyle={{ color: "#c2c2c2" }}
                            onDateChange={this.setDate}
                            disabled={false}
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