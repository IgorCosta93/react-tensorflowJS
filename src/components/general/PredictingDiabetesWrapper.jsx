import React, { Component } from "react";
import PredictingDiabetes from "./predictingDiabetesWrapper/PredictingDiabetes";

export default class PredictingDiabetesWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <PredictingDiabetes props={props}/>
        );
    }
}