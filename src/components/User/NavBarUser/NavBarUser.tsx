import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './style';
import user from '../../../assets/user.png';
import edit from '../../../assets/edit.png';
import inbox from '../../../assets/envelope.png';
import settings from '../../../assets/settings.png';
import help from '../../../assets/question.png';
import logout from '../../../assets/log-out.png';
import { getInfoProfile } from '../../../api/Lecturer';

type Lecturer = {
  [key: string]: any;
  name: string;
};

const NavBarUser = () => {
  const [logined, setLogined] = useState(true);
  const [open, setOpen] = useState(false);
  const [lecturer, setLecturer] = useState<Lecturer>();
  const accountId: string | null = localStorage.getItem('accountId');
  console.log('🚀 ~ file: NavBarUser.tsx:21 ~ NavBarUser ~ lecturer:', lecturer);

  useEffect(() => {
    getInfoProfile(accountId)
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
      } else if (value === 'Settings') {
        navigate('/settings');
        setOpen(false);
      } else if (value === 'Retrieve Scopus Author') {
        navigate('/retrieve-scopus-author');
        setOpen(false);
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

  const handleClickSearch = () => {
    navigate('/search', {
      state: { searchInput: '', searchOption: { label: 'Author', value: 'author' } }
    });
  };

  return (
    <Styled>
      <div className="container">
        <div className="logo">
          <a href="/">
            <div className="container_logo">
              <img src="/assets/images/hcmus_logo.jpg" />
            </div>
          </a>
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
              <h3>Lecturer</h3>
              {/* <div className="dropdown-menu__subTitle">Website User</div> */}
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                <DropdownItem img={user} text={'Your Profile'} value={'MyProfile'} />
                <DropdownItem img={settings} text={'Settings'} value={'Settings'} />
                <DropdownItem
                  img={help}
                  text={'Retrieve Scopus Author'}
                  value={'Retrieve Scopus Author'}
                />
                <DropdownItem img={logout} text={'Logout'} value={'Logout'} />
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

export default NavBarUser;
