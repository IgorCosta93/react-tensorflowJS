import React from "react";
import { Route, Redirect } from "react-router-dom";
//import Auth from "./Auth";
import NavbarContainer from "../containers/Navbar";
import SidebarContainer from "../containers/Sidebar";
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

export const PrivateRoute = ({
    component: Component,
    breadcrumb: Breadcrumbs,
    breadcrumbSub: BreadcrumbSub,
    pathB: Path,
    ...rest
}) => {
    return(
        <Route
            {...rest}
            render={props => {
                return (
                    <Layout style={{ height: "100vh" }}>
                        <SidebarContainer/>
                        <Layout>
                            <NavbarContainer/>
                            <Layout style={{ padding: '0 24px 24px' }}>
                                <Breadcrumb style={{ marginTop: "20px" }}>
                                    { Path ? 
                                            <Breadcrumb.Item><span><Link to={Path}>{Breadcrumbs}</Link></span></Breadcrumb.Item>
                                        : 
                                            <Breadcrumb.Item><span>{Breadcrumbs}</span></Breadcrumb.Item>
                                    }
                                </Breadcrumb>
                                <Content 
                                    style={{
                                        background: '#fff', 
                                        padding: 24, 
                                        marginTop: 10, 
                                        marginLeft: 10,
                                        marginRight: 10,
                                        marginBottom: 25, 
                                        minHeight: "auto" 
                                    }}
                                >
                                    <Component {...props}/>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                );
            }}
        />
    )
}