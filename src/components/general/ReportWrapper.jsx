import React, { Component } from "react";
import Report from "./reportWrapper/Report";

export default class ReportWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <Report props={props}/>
        );
    }
}