import React, { useState } from 'react';
import { Layout } from 'antd';
import Styled from './style';
import Sidebar from '../../components/Sidebar';
import { UserOutlined, BookOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { PlusOutlined } from '@ant-design/icons';
import ListTeacher from '../../components/AdminList/ListTeacher';
import { Button, Modal } from 'antd';
import ModalTeacher from '../../components/AdminList/ModalTeacher';
const { Content } = Layout;

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
  const [open, setOpen] = useState(false);
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
          <div className='header_table'>
            <span className='title_table'>List of Teachers</span>
            <button className='button_table' onClick={() => setOpen(true)}><PlusOutlined style={{ marginRight: "10px" }} />Add</button>
          </div>

          <ListTeacher />

          <Modal
            className='title_modal'
            title="Add Teacher"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={800}
          >
            <ModalTeacher />
          </Modal>
        </Content>
      </Layout>
    </Styled>
  );
}
