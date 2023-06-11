import React, { useState } from 'react';
import { Layout } from 'antd';
import Styled from './style';
import Sidebar from '../../components/Sidebar';
import { UserOutlined, BookOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import ListTeacher from '../../components/AdminList/ListTeacher';
import ListArticle from '../../components/AdminList/ListArticle';
import ListScholar from '../../components/AdminList/ListScholar';
const { Content } = Layout;

const items: ItemType[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'User'
  },
  // {
  //   key: '2',
  //   icon: <BookOutlined />,
  //   label: 'Scholar'
  // },
  {
    key: '2',
    icon: <SettingOutlined />,
    label: 'Configuration'
  },
  // {
  //   key: '4',
  //   icon: <DatabaseOutlined />,
  //   label: 'Article'
  // }
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
        <Content
          style={{
            margin: '30px 30px',
            padding: 24,
            background: "white",
            borderRadius: "10px",
          }}
        >
          {
            currentKey == '1' && <ListTeacher />
          }
          {/* {
            currentKey == '2' && <ListScholar />
          } */}
          {
            currentKey == '2' && <div>Configuration</div>
          }
          {/* {
            currentKey == '4' && <div><ListArticle /></div>
          } */}
        </Content>
      </Layout>
    </Styled>
  );
}
