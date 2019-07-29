import React, { Fragment, useState } from "react";
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Sider, Content, Footer } = Layout;

function Sidebar({ props }){
    let [ collapsed, setCollapsed ] = useState(false)

    return(
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to="/">
                        <Icon type="home" />
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/relatorios">
                        <Icon type="area-chart" />
                        <span>Reports</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/pictureRecognize">
                        <Icon type="picture" />
                        <span>Image Recognize</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/webcamRecognize">
                        <Icon type="setting" />
                        <span>Webcam Recognize</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/linearRegression">
                        <Icon type="line-chart" />
                        <span>Linear Regression</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar;