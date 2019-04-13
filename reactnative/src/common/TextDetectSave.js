import React, { Component } from 'react';

import { connect } from 'react-redux';
import { cameraFoodCreate, cameraFoodUpdate } from '../actions';

import axios from 'react-native-axios';
import moment from "moment";

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
                        /*
                        if (results[key1][key2]["Refrigerator"] != "unspecified") {
                            const expiry = results[key1][key2]["Refrigerator"];

                        }
                        else if (results[key1][key2]["Pantry"] != "unspecified") {
                            const expiry = results[key1][key2]["Pantry"]

                        }
                        else if (results[key1][key2]["Freezer"] != "unspecified") {
                            const expiry = results[key1][key2]["Freezer"]
                        }
                        else {
                            const expiry = "1 day"
                        }*/

                        for (var i = 0; i < name.length; i++) {
                            if (name[i] == ',') {
                                name = name.slice(0, i)
                                break
                            }
                        }

                        name = name.toLowerCase()

                        // to create a function that takes current date, and expiry duration, and output the expiry date
                        //  var now = new Date();
                        for (var i = 0; i < expiry.length; i++) {
                            if (expiry[i] == ' ') {
                                expiry = expiry.slice(0, i)
                                break
                            }
                        }

                        var expirystring = moment().add(1, 'days')
                        var expiry = JSON.stringify(moment().format("MMMM Do YYYY"))
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