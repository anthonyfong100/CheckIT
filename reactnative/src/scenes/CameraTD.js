import React, { Component } from "react";
import _ from 'lodash';
import { TouchableOpacity, View, ImageBackground, StyleSheet, Dimensions, Platform, Image, Alert } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
import RNTextDetector from "react-native-text-detector";

import TextDetectSave from '../common/TextDetectSave';


const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true
};

const { height, width } = Dimensions.get("window");

const screenHeight = Platform.select({
  ios: height,
  android: Platform.Version < 21 ? height - 25 : height
});

const statusBarHeight = Platform.select({
  ios: 22,
  android: Platform.Version >= 21 ? 25 : 0
});

const headerHeight = statusBarHeight + 55;

const dim = {
  screenWidth: width,
  screenHeight
};

export default class CameraTD extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: [],
    confirm: false
  };

  /**
   * reset
   *
   * Handles error situation at any stage of the process
   *
   * @param {string} [error="OTHER"]
   * @memberof App
   */
  reset(error = "OTHER") {
    this.setState(
      {
        loading: false,
        image: null,
        error
      },
      () => {
        // setTimeout(() => this.camera.startPreview(), 500);
      }
    );
  }

  /**
   * takePicture
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {*} camera
   * @author Zain Sajjad
   */
  takePicture = async camera => {
    this.setState({
      loading: true
    });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw "OTHER";
      }
      this.setState(
        {
          image: data.uri
        },
        () => {
          console.log(data.uri);
          this.processImage(data.uri, {
            height: data.height,
            width: data.width
          });
        }
      );
    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };

  /**
   * processImage
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {string} uri              Path for the image to be processed
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   * @author Zain Sajjad
   */
  processImage = async (uri, imageProperties) => {
    const visionResp = await RNTextDetector.detectFromUri(uri);
    console.log(visionResp);
    this.setState({ visionResp: visionResp })

    if (!(visionResp && visionResp.length > 0)) {
      throw "UNMATCHED";
    } else {
      this.setState({
        visionResp: this.mapVisionRespToScreen(visionResp, imageProperties)
      });
    }
  };

  /**
   * mapVisionRespToScreen
   *
   * Converts RNTextDetectors response in representable form for
   * device's screen in accordance with the dimensions of image
   * used to processing.
   *
   * @param {array}  visionResp       Response from RNTextDetector
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   */

  mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = screenWidth / imageProperties.width;

    return visionResp.map(item => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y
        }
      };
    });
  };

  /* 
  not needed 
  refactorObject(visionResp) {
    listItems = Object.values(visionResp.text);
    console.log("from refactor" + listItems)
  }*/

  /**
   * React Native render function
   *
   * @returns ReactNode or null
   * @memberof App
   */

  render() {
    const visionResp = this.state.visionResp;
    for (key in visionResp) {
      if (visionResp.hasOwnProperty(key)) {
        var text = visionResp[key];
      }
    }
    return (
      <View style={style.screen}>
        {!this.state.image ? (
          <Camera
            ref={cam => {
              this.camera = cam;
            }}
            key="camera"
            style={style.camera}
            notAuthorizedView={null}
            playSoundOnCapture
          >
            {({ camera, status }) => {
              if (status !== "READY") {
                return null;
              }
              return (
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={style.button}
                  />
                </View>
              );
            }}
          </Camera>
        ) : null}
        {this.state.image ? (
          <ImageBackground
            source={{ uri: this.state.image }}
            style={style.imageBackground}
            key="image"
            resizeMode="cover"
          >
            {this.state.visionResp.map(item => {
              return (
                <TouchableOpacity
                  style={[style.boundingRect, item.position]}
                  key={item.text}
                />
              );
            })}
            <TouchableOpacity
              onPress={() => this.setState({ image: false })}
              style={style.backButton}
            >
              < Image source={require("./../../assets/left-arrow.png")}
                style={style.backButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Fridge");
                //this.state.confirm ? (<TextDetectSave text={text} />) : null
                this.setState({ image: false });
                Alert.alert("Items added!")
              }}
              style={style.confirmButtonContainer}
            >
              <TextDetectSave text={text} />
              < Image source={require("./../../assets/plus-button.png")}
                style={style.confirmButton} />
            </TouchableOpacity>
          </ImageBackground>
        ) : null
        }
      </View>
    );
  }
}

const Colors = {
  white: "#ffffff",
  black: "#000000",
  primary: "#003143",
  accent: "#FF6600"
};

const style = StyleSheet.create({
  screen: {
    backgroundColor: Colors.black,
    flex: 1
  },
  camera: {
    position: "absolute",
    width: dim.screenWidth,
    height: dim.screenHeight,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    flex: 1
  },
  imageBackground: {
    position: "absolute",
    width: dim.screenWidth,
    height: dim.screenHeight,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    top: 0,
    left: 0
  },
  buttonContainer: {
    width: 70,
    height: 70,
    backgroundColor: Colors.white,
    borderRadius: 35,
    position: "absolute",
    bottom: 90,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: Colors.white,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: Colors.black
  },
  boundingRect: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF6600"
  },
  backButton: {
    width: 64,
    height: 64,
    position: 'absolute',
    top: 0,
    left: 0
  },
  confirmButton: {
    width: 64,
    height: 64,
    position: 'absolute',
    top: 0,
    left: 0
  },
  confirmButtonContainer: {
    width: 64,
    height: 64,
    position: 'absolute',
    top: 0,
    left: 64
  }
})