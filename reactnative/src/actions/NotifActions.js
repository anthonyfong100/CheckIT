import React, { Component } from 'react';
import firebase from 'react-native-firebase';

export default class NotifActions extends React.Component {
  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    // triggered when a particular notificaiton has been recieved in the foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      console.log("on notification")
      this.showAlert(title, body);
      alert('message');
      
      const localNotification = new firebase.notifications.Notification({
        sound: 'sampleaudio',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('fcm_default_channel')
        .android.setSmallIcon('@drawable/ic_launcher')
        .android.setColor('#000000')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
  });
  

  const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'CheckIT', firebase.notifications.Android.Importance.High)
    .setDescription('CheckIT Description')
    .setSound('sampleaudio.mp3');
  firebase.notifications().android.createChannel(channel);

  // if app is in background, can listen for when a notificaiton is clicked / tapped / opened:
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    const { title, body } = notificationOpen.notification;
    console.log('onNotificationOpened:');
    this.showAlert(title, body);
  });

  // if app is closed, check if it was opened by a notification being clicked / tapped / opened:
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notification) {
    const { title, body } = notificationOpen.notification;
    console.log('getInitialNotification');
    this.showAlert(title, body); 
  }

  // triger for data-only payload in foreground
  this.messageListener = firebase.messaging().onMessage((message) => {
    // process data message
    console.log(JSON.stringify(message));
  });
}

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('fcmToken:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
  render(){
      return null;
  }
}