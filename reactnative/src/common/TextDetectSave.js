import React, { Component } from 'react';

import { connect } from 'react-redux';
import { cameraFoodCreate, cameraFoodUpdate } from '../actions';

import axios from 'react-native-axios'

class TextDetectSave extends Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        var text = this.props.text
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
                        const expiry = results[key1][key2]["Refrigerator"]

                        for (var i = 0; i < name.length; i++) {
                            if (name[i] == ',') {
                                name = name.slice(0, i)
                                break
                            }
                        }
                        console.log(name)
                        console.log(expiry)
                        this.props.cameraFoodCreate({ name, expiry });
                    }
                }
            })
            .catch(err => console.log(err))
    }


    render() {
        return null
    }
}

const mapStateToProps = (state) => {
    const { name, expiry } = state.camera;
    return { name, expiry }
}
export default connect(mapStateToProps, {
    cameraFoodUpdate,
    cameraFoodCreate
})(TextDetectSave)