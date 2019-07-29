import React, { Component } from "react";
import PictureRecognize from "./pictureRecognizerWrapper/PictureRecognize";

export default class ReportWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <PictureRecognize props={props}/>
        );
    }
}