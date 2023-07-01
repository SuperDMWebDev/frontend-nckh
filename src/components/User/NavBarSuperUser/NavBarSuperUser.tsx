import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './style';
import { getInfoProfile } from '../../../api/Lecturer';

type Lecturer = {
  [key: string]: any;
  name: string;
};

const NavBarSuperUser = () => {
  const [logined, setLogined] = useState(true);
  const [open, setOpen] = useState(false);
  const [lecturer, setLecturer] = useState<Lecturer>();
  const lectureId: string | null = localStorage.getItem('lecturerId');

  useEffect(() => {
    getInfoProfile(lectureId)
      .then((result) => {
        setLecturer(result);
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

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

  interface DropdownType {
    img: string;
    text: string;
    value: string;
  }
  function DropdownItem(props: DropdownType) {
    const handleChange = (value: string) => {
      if (value === 'MyProfile') {
        navigate('/profile');
        setOpen(false);
      } else if (value === 'Retrieve Scopus Author') {
        navigate('/retrieve-scopus-author');
        setOpen(false);
      } else if (value === 'logout') {
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

  const handleClickSearch = () => {
    navigate('/search', {
      state: { searchInput: '', searchOption: { label: 'Tác giả', value: 'author' } }
    });
  };

  const navigateToHomePage = () => {
    navigate('/home');
  };

  return (
    <Styled>
      <div className="container">
        <div className="logo">
          <a href="/home">
            <div className="container_logo">
              <img src="/assets/images/hcmus_logo.jpg" />
            </div>
          </a>
          <div className="text__title_navbar" onClick={() => navigateToHomePage()}>
            SciConnect
          </div>
        </div>
        <div className="navbar-tab">
          <ul>
            <li>
              <a href="/">TRANG CHỦ</a>
            </li>
            <li
              onClick={handleClickSearch}
              style={{
                cursor: 'pointer',
                color: '#959595',
                position: 'relative',
                fontSize: '16px',
                textDecoration: 'none'
              }}>
              <a>TÌM KIẾM</a>
            </li>
            <li>
              <a href="/my-articles">BÀI BÁO CỦA TÔI</a>
            </li>
            <li>
              <a href="/statistics">THỐNG KÊ</a>
            </li>
          </ul>
        </div>

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
              <h3>{lecturer?.name}</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', paddingLeft: '0px' }}>
                <DropdownItem
                  img="/assets/icons/user.png"
                  text={'Trang cá nhân'}
                  value={'MyProfile'}
                />
                <DropdownItem
                  img="/assets/icons/question.png"
                  text={'Truy xuất tài khoản Scopus'}
                  value={'Retrieve Scopus Author'}
                />
                <DropdownItem img="/assets/icons/log-out.png" text={'Đăng xuất'} value={'logout'} />
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <ul>
              <li>
                <a href="/signin">Đăng nhập</a>
              </li>
              {/* <li>
                <a>Register</a>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </Styled>
  );
};

export default NavBarSuperUser;
