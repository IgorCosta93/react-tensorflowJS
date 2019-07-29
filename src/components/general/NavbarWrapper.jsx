import React, { Component } from "react";
import Navbar from "./navbarWrapper/Navbar";

export default class NavbarWrapper extends Component {
    render() {
        let props = {
            history: this.props.history
        };

        return (
            <Navbar {...props}/>
        );
    }
}