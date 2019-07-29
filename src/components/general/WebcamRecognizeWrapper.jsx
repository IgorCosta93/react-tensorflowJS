import React, { Component } from "react";
import WebcamRecognize from "./webcamRecognizeWrapper/WebcamRecognize";

export default class ReportWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <WebcamRecognize props={props}/>
        );
    }
}