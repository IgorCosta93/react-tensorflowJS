import React, { Component } from "react";
import ImageClassifier from "./imageClassifierWrapper/ImageClassifier";

export default class ImageClassifierWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <ImageClassifier props={props}/>
        );
    }
}