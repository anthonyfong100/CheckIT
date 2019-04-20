import React, { Component } from "react";
import _ from 'lodash';
import { TouchableOpacity, View, ImageBackground, StyleSheet, Dimensions, Platform, Image, Alert } from "react-native";
import { RNCamera as Camera } from "react-native-camera";
import RNTextDetector from "react-native-text-detector";

import { connect } from 'react-redux';
import { cameraFoodCreate, cameraFoodUpdate } from '../actions';
import axios from 'react-native-axios';
import moment from "moment";

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

class CameraTD extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      image: null,
      error: null,
      visionResp: [],
      confirm: false
    };
  }

  APICall() {
    const visionResp = this.state.visionResp;
    for (key in visionResp) {
      if (visionResp.hasOwnProperty(key)) {
        var text = visionResp[key];
      }
    }
    console.log(text)
    delete text.bounding;
    var textOutput = text.text
    var foodData = textOutput.split("\n")
    var data = ""

    for (key in foodData) {
      data = data + '"' + foodData[key] + '"' + ","
    }
    const req = "https://us-central1-checkit-6682c.cloudfunctions.net/expiry?text=[" + data + "]"
    axios.get(req)
      .then(res => {
        var resData = "[" + res.data + "]"
        var resParsed = resData.replace(/'/g, '"');
        var results = JSON.parse(resParsed)
        for (key1 in results) {
          for (key2 in results[key1]) {
            const name = results[key1][key2]["Name"]

            if (String(results[key1][key2]["Refrigerator"]).includes("unspecified") == false) {
              var expiry = results[key1][key2]["Refrigerator"];
            }
            else if (String(results[key1][key2]["Pantry"]).includes("unspecified") == false) {
              var expiry = results[key1][key2]["Pantry"];

            }
            else if (String(results[key1][key2]["Freezer"]).includes("unspecified") == false) {
              var expiry = results[key1][key2]["Freezer"];
            }
            else {
              var expiry = "2 day"
            }

            if (String(expiry).includes("day") == true) {
              var unit = "days"
            } else if (String(expiry).includes("week") == true) {
              var unit = "weeks"
            } else if (String(expiry).includes("month") == true) {
              var unit = "months"
            } else if (String(expiry).includes("year") == true) {
              var unit = "years"
            } else {
              var unit = "days"
            }


            for (var i = 0; i < name.length; i++) {
              if (name[i] == ',') {
                name = name.slice(0, i)
                break
              }
            }

            name = name.toLowerCase()

            for (var i = 0; i < expiry.length; i++) {
              if (expiry[i] == ' ') {
                expiry = expiry.slice(0, i)
                break
              }
            }

            var expirystring = moment().add(expiry, unit)
            var expiry = JSON.stringify(moment(expirystring).format("MMMM Do YYYY"))
            this.props.cameraFoodCreate({ name, expiry });
          }
        }
      })
      .catch(err => console.log(err))
  }
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

  onPressSubmit() {
    this.props.navigation.navigate("Fridge");
    this.setState({ image: false });
    this.APICall()
    Alert.alert("Items added!")
  }

  render() {
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
              onPress={() => this.onPressSubmit()}
              style={style.confirmButtonContainer}
            >
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

const mapStateToProps = (state) => {
  const { name, expiry } = state.camera;
  return { name, expiry }
}
export default connect(mapStateToProps, {
  cameraFoodUpdate,
  cameraFoodCreate
})(CameraTD)