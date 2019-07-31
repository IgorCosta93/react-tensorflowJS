import React, { Component } from "react";
import WebcamClassifier from "./webcamClassifierWrapper/WebcamClassifier";

export default class WebcamClassifierWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <WebcamClassifier props={props}/>
        );
    }
}