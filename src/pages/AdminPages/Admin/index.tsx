/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Layout } from 'antd';
import Styled from './style';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../../../components/Sidebar';

import { UserOutlined, BookOutlined, SettingOutlined, DatabaseOutlined } from '@ant-design/icons';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import ListTeacher from '../../../components/AdminList/ListTeacher';
import ListArticle from '../../../components/AdminList/ListArticle';
import SearchBarAdmin from '../../../components/SearchBarAdmin/SearchBarAdmin';
import Configuration from '../../../components/AdminList/Configuration';
const { Content, Header } = Layout;

const items: ItemType[] = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Người dùng'
  },
  // {
  //   key: '2',
  //   icon: <BookOutlined />,
  //   label: 'Học giả'
  // },
  {
    key: '2',
    icon: <SettingOutlined />,
    label: 'Cấu hình'
  },
  // {
  //   key: '4',
  //   icon: <DatabaseOutlined />,
  //   label: 'Bài báo khoa học'
  // }
];

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 100,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff'
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '100px',
  backgroundColor: '#efefef',
  width: '55%',
  height: 50,
  marginTop: 25
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '0 15px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black',
  opacity: '41%',
  svg: {
    width: '20px',
    height: '20px'
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: '#959595',
  height: '50px',
  '& .MuiInputBase-input': {
    padding: '2px',
    // vertical padding + font size from searchIcon
    paddingLeft: '40px',
    fontSize: '16px'
  },
  'input::placeholder': {
    color: 'black',
    opacity: '41%',
    fontStyle: 'italic',
    fontSize: '16px'
  }
}));
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
              {/* {currentKey == '2' && <ListArticle />} */}
              {currentKey == '2' && <Configuration />}
            </Content>
          </Layout>
        </Layout>
      </Styled>
    </>
  );
}
