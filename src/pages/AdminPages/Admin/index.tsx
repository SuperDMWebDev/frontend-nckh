/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Layout } from 'antd';
import Styled from './style';
import Sidebar from '../../../components/Sidebar';

import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import ListTeacher from '../../../components/AdminList/ListTeacher';
import SearchBarAdmin from '../../../components/SearchBarAdmin/SearchBarAdmin';
import Configuration from '../../../components/AdminList/Configuration';
const { Content } = Layout;

const items: ItemType[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Người dùng'
  },
  {
    key: '2',
    icon: <SettingOutlined />,
    label: 'Cấu hình'
  },
];

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('1');
  return (
    <>
      <Styled>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            items={items}
            currentKey={currentKey}
            setCurrentKey={setCurrentKey}
          />
          <Layout>
            <SearchBarAdmin />
            <Content
              style={{
                margin: '30px 30px',
                padding: 24,
                background: 'white',
                borderRadius: '10px'
              }}>
              {currentKey == '1' && <ListTeacher />}
              {currentKey == '2' && <Configuration />}
            </Content>
          </Layout>
        </Layout>
      </Styled>
    </>
  );
}
