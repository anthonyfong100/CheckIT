import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
    componentDidMount() {
        PushNotification.configure({
            onRegister: function(token) {
                console.log('TOKEN: ', token); // TODO check if token is printed
            },
            onNotification: function(notification) {
                console.log('NOTIFICATION: ', notification);
            },
            senderID: "708556627645", // TODO find FCM sender ID
            
            // pop up initial notification automatically
            popInitialNotification: true,

            // specify for permissions and token to be requested
            requestPermissions: true,
        });
    }

    render() {
        return null;
    }
}