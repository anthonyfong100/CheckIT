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