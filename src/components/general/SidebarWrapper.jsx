import React, { Component } from "react";
import Sidebar from "./sidebarWrapper/Sidebar";

export default class SidebarsdWrapper extends Component {
    render() {
        let props = {
            history: this.props.history
        };

        return (
            <Sidebar {...props}/>
        );
    }
}