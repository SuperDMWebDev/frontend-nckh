import React, { useState } from 'react';
import {
    UserOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import './AdminList.css'
import { PlusOutlined } from '@ant-design/icons';
import TopBar from '../../components/TopBar';
const { Sider, Content } = Layout;

export default function AdminList() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div>
            <TopBar />
            <Layout className='listarticle_content' style={{ height: "700px" }}>
                <Sider style={{ backgroundColor: "white" }} width={260}>
                    <div className="logo" />
                    <Menu
                        style={{ backgroundColor: "white", color: "#613ceb", marginTop: "100px", padding: "13px" }}
                        theme="dark"
                        mode="inline"
                        className='light-bg'
                        defaultSelectedKeys={['1']}
                        onClick={() => {
                            console.log()
                        }}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Teacher',
                            },
                            {
                                key: '2',
                                icon: <DatabaseOutlined />,
                                label: 'Article',
                            }
                        ]}
                    />
                </Sider>
                <Content
                    style={{
                        margin: '30px 30px',
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: 4
                    }}
                >
                    <div className='header_table'>
                        <span className='title_table'>List of Teachers</span>
                        <button className='button_table'><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
                    </div>
                </Content>
            </Layout>
        </div>
    );
};
