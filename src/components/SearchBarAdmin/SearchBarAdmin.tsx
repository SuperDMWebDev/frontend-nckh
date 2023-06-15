/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Styled from './style';
import { useNavigate } from 'react-router-dom';

import logout from '../../assets/log-out.png';

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
      localStorage.clear();
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
            {/* <div className="dropdown-menu__subTitle">Trang quản lý</div> */}
            <ul>
              <DropdownItem img={logout} text={'Đăng xuất'} value={'Logout'} />
            </ul>
          </div>
        </div>
      </div>
    </Styled>
  );
}
