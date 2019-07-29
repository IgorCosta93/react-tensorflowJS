import React from "react";
import { Layout, Icon } from 'antd';
const { Header } = Layout;

function Navbar({ props }){
    return(
        <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
            className="trigger"
            type={'menu-unfold'}
            //type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            //onClick={this.toggle}
        />
        </Header>
    )
}

export default Navbar;