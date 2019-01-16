'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import cameraCaptureButton from '../../CheckIt assets/cameraCaptureButton.png'
import backButton from '../../CheckIt assets/backButton.png'


export default class CameraScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          
        />
        <View style = {{position: 'absolute', top:0, right:0}}>
          <TouchableOpacity onPress={this.backButtonHandler}>
            <Image source = {backButton}></Image>
          </TouchableOpacity>
        </View>
        
        
        <View style={{ position: 'absolute', bottom: 0, left:0, right:0, justifyContent: 'center', alignContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style = {styles.capture} >
            <Image source = {cameraCaptureButton} style = {styles.cameraButtonSize}></Image>
          </TouchableOpacity>
        </View>
       
      </View>
    );
  }

  backButtonHandler = function(){

  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: 'black',
  },
  preview: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 10,

    
  },

  backButton: {
    flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',

  },
  cameraButtonSize: {
    width: 90,
    height: 90
  }
});

AppRegistry.registerComponent('CameraScreen', () => CameraScreen);