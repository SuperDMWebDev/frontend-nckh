import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './style';

type Lecturer = {
  [key: string]: any;
  name: string;
};

interface DropdownType {
  img: string;
  text: string;
  value: string;
}

const NavBarRetrieveScopus = () => {
  const [logined, setLogined] = useState(true);
  const [open, setOpen] = useState(false);
  const [lecturer, setLecturer] = useState<Lecturer>();

  let menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  function DropdownItem(props: DropdownType) {
    const handleChange = (value: string) => {
      if (value === 'MyProfile') {
        navigate('/profile');
        setOpen(false);
      } else if (value === 'Settings') {
        navigate('/settings');
        setOpen(false);
      } else if (value === 'Retrieve Scopus Author') {
        navigate('/retrieve-scopus-author');
        setOpen(false);
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

  const navigateToHomePage = () => {
    navigate('/');
  };

  return (
    <Styled>
      <div className="container">
        <div
          className="logo"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <a href="/">
            <div className="container_logo">
              <img src="/assets/images/hcmus_logo.jpg" />
            </div>
          </a>
          <div
            className="text__title_navbar"
            style={{ marginLeft: '20px' }}
            onClick={() => navigateToHomePage()}>
            SciConnect
          </div>
        </div>
        <div className="navbar-tab"></div>

        {logined ? (
          <div className="menu-container" ref={menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}>
              <div className="menu-trigger__space"></div>
              <img
                className="avatar"
                src={
                  lecturer === undefined ||
                  lecturer?.avatar === null ||
                  lecturer?.avatar === '' ||
                  lecturer?.avatar === 'data:image/png;base64,'
                    ? '/assets/images/default_avatar.jpg'
                    : lecturer?.avatar
                }
              />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
              <div className="dropdown-menu__subTitle">Trang truy xuất Scopus</div>
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                <DropdownItem img="/assets/icons/log-out.png" text={'Đăng xuất'} value={'Logout'} />
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/signin">Đăng nhập</a>
              </li>
              <li>
                <a>Register</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Styled>
  );
};

export default NavBarRetrieveScopus;
