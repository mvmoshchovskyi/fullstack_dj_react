import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb} from 'antd';


const {Header, Content, Footer} = Layout;

class CustomLayout extends Component {

    render() {
        return (
            <div>

                <Layout className="layout">
                    <Header>
                        <div className="logo"/>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

                            {
                                this.props.isAuthenticated
                                    ? <Menu.Item key="2">
                                        Logout
                                    </Menu.Item>
                                    : <Menu.Item key="1">
                                        <Link to='/login'>Login</Link>
                                    </Menu.Item>
                            }
                            <Menu.Item key="1">
                                <Link to='/'>Post</Link>
                            </Menu.Item>


                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>,

            </div>
        );
    }
}

export default CustomLayout;