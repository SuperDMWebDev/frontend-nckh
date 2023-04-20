import React, { useState } from 'react';
import { Layout } from 'antd';
import { UserOutlined, LinkOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import Sidebar from '../../../components/Sidebar';
import AccountPage from './AccountPage';
import ScopusProfilePage from './ScopusProfilePage';

const { Content } = Layout;
const items: ItemType[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Account'
  },
  {
    key: '2',
    icon: <LinkOutlined />,
    label: 'Scopus Profile'
  }
];

export default function ProfilePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('1');

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
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
            background: "white",
            borderRadius: "10px",
          }}
        >
          {
            currentKey === '1' && <AccountPage />
          }
          {
            currentKey === '2' && <ScopusProfilePage />
          }
        </Content>
      </Layout>
    </div>
  );
}
