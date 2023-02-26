import React, { useState } from 'react';
import { Layout } from 'antd';
import Styled from './style';
import Sidebar from '../../components/Sidebar';
import { UserOutlined, BookOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
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
export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('1');
  return (
    <Styled>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          items={items}
          currentKey={currentKey}
          setCurrentKey={setCurrentKey}
        />
        <Layout className="content-layout"></Layout>
      </Layout>
    </Styled>
  );
}
