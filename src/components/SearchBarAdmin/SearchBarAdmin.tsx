/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Styled from './style';
import { useNavigate } from 'react-router-dom';

import user from '../../assets/user.png';
import edit from '../../assets/edit.png';
import inbox from '../../assets/envelope.png';
import settings from '../../assets/settings.png';
import help from '../../assets/question.png';
import logout from '../../assets/log-out.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '100px',
  backgroundColor: '#efefef',
  marginLeft: 0,
  width: '55%'
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
  '& .MuiInputBase-input': {
    padding: '10px',
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

interface DropdownType {
  img: string;
  text: string;
  value: string;
}

function DropdownItem(props: DropdownType) {
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    if (value === 'MyProfile') {
      navigate('/profile');
    } else if (value === 'Retrieve Scopus Author') {
      navigate('/retrieve-scopus-author');
    } else if (value === 'Logout') {
      localStorage.removeItem('accountId');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('scopusId');
      localStorage.removeItem('role');
      navigate('/signin');
      // eslint-disable-next-line no-self-assign
      window.location.href = window.location.href;
    }
  };

  return (
    <Styled>
      <li className="dropdownItem" value={props.value} onClick={() => handleChange(props.value)}>
        <img src={props.img} alt="" />
        <a>{props.text}</a>
      </li>
    </Styled>
  );
}

export default function SearchBarAdmin() {
  const [open, setOpen] = useState(false);

  let menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (menuRef.current !== null) {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <Styled>
      <div className="header">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Tìm kiếm..." inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}>
            <div className="menu-trigger__space"></div>
            <img
              src="https://api-private.atlassian.com/users/4e82de5e94dd5920587675a761d71b25/avatar"
              style={{}}
            />
          </div>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <h3>Admin</h3>
            <div className="dropdown-menu__subTitle">Trang quản lý</div>
            <ul>
              <DropdownItem img={user} text={'Hồ sơ của tôi'} value={'MyProfile'} />
              <DropdownItem img={edit} text={'Chỉnh sửa hồ sơ'} value={'EditProfile'} />
              <DropdownItem img={inbox} text={'Liên hệ'} value={'Inbox'} />
              <DropdownItem img={settings} text={'Cài đặt'} value={'Settings'} />
              <DropdownItem img={help} text={'Giúp đỡ'} value={'Helps'} />
              <DropdownItem img={logout} text={'Đăng xuất'} value={'Logout'} />
            </ul>
          </div>
        </div>
      </div>
    </Styled>
  );
}
