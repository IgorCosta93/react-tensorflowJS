import React, { Component } from "react";
import Dashboard from "./dashboardWrapper/Dashboard";

export default class DashboardWrapper extends Component {
    render() {
        let props = {
            data: this.props,
            history: this.props.history
        };

        return (
            <Dashboard props={props}/>
        );
    }
}