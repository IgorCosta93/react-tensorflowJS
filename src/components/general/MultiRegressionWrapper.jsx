import React, { Component } from "react";
import MultiRegression from "./multiRegressionWrapper/MultiRegression";

export default class MultiRegressionWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <MultiRegression props={props}/>
        );
    }
}