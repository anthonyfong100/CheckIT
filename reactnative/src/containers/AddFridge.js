import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

class AddFridge extends Component {
    state={
        text:''
    }

    addFridgeItem = (text) => {
        this.props.dispatch({type: 'ADD_FRIDGE_ITEM', text})
        this.setState({ text: ''})
    }
    
    render() {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                <TextInput 
                    onChangeText={(text)=> this.setState({ text })}
                    value={this.state.text}
                    placeholder= "Add new item"
                    style={{ borderWidth: 1, borderColor: '#f2f2e1',
                    backgroundColor: '#eaeaea', height: 50, flex: 1, padding: 5 }}
                />     
                <TouchableOpacity onPress={()=> this.addFridgeItem(this.state.text)}>
                    <View style={{ height: 50, backgroundColor: '#eaeaea',
                    alignItems: 'center', justifyContent: 'center'}}>
                        <Ionicons name="md-add" size={30} style={{ 
                            color: 'red', padding: 10 }}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect() (AddFridge);