import React, { Component } from "react";
import LinearRegression from "./linearRegressionWrapper/LinearRegression";

export default class ReportWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <LinearRegression props={props}/>
        );
    }
}