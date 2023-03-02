import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import Styled from './style';
import { Layout, Menu, theme } from 'antd';
const { Sider, Content } = Layout;
import { UserOutlined, DatabaseOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const DetailPage = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const items: ItemType[] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'User'
    },
    {
      key: '2',
      icon: <BookOutlined />,
      label: 'Scholar'
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: 'Configuration'
    },
    {
      key: '4',
      icon: <DatabaseOutlined />,
      label: 'Article'
    }
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('1');
  return (
    <Styled>
      <Layout className="listarticle_content" style={{ height: '700px' }}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          items={items}
          currentKey={currentKey}
          setCurrentKey={setCurrentKey}
        />
        <Content
          style={{
            margin: '30px 30px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: 4
          }}>
          <div className="title_wrapper">
            <div className="title">Detail </div>
          </div>
          <div className="content-wrapper">
            <div className="content_row">
              <div className="row_title">Username:</div>
              <div>username</div>
            </div>
            <div className="content_row">
              <div className="row_title">Age:</div>
              <div>33</div>
            </div>
            <div className="content_row">
              <div className="row_title">Univercity:</div>
              <div>University of Science</div>
            </div>
            <div className="content_row">
              <div className="row_title">Email:</div>
              <div>member@gmail.com</div>
            </div>
            <div className="content_row">
              <div className="row_title">Role:</div>
              <div>Scholar</div>
            </div>
            <div className="content_row">
              <div className="row_title">Address:</div>
              <div>London, Park Lane no. 0</div>
            </div>
            <div className="content_row">
              <div className="row_title">Created at:</div>
              <div>22/02/2022</div>
            </div>
            <div className="content_row">
              <div className="row_title">Updated at:</div>
              <div>22/02/2022</div>
            </div>
          </div>
        </Content>
      </Layout>
    </Styled>
  );
};

export default DetailPage;
