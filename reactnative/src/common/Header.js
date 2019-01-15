// import libraries
import React from 'react';
import { Text, View } from 'react-native';

// make component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return ( 
        <View style={viewStyle}>   
        <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingTop: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 5,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};

// make component available to other parts of the app
export { Header };