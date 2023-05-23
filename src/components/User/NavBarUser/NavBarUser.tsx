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
  [key: string]: any; // 👈️ variable key
  name: string;
};

const NavBarUser = () => {
  const [logined, setLogined] = useState(true);
  const [open, setOpen] = useState(false);
  const [lecturer, setLecturer] = useState<Lecturer>();
  const accountId: string | null = localStorage.getItem('accountId');

  useEffect(() => {
    const data: Promise<Lecturer> = getInfoProfile(accountId);
    data
      .then((result) => {
        setLecturer(result);
      })
      .catch((err) => console.log("Can't get data lecturer: ", err));
  }, []);

  let menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let handler = (e: any) => {
      if (menuRef.current != null) {
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
      if (value == 'MyProfile') {
        navigate('/profile');
        setOpen(false);
      } else if (value == 'Retrieve Scopus Author') {
        navigate('/retrieve-scopus-author');
        setOpen(false);
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
  return (
    <Styled>
      <div className="container">
        <a href="/">
          <div className="container_logo">
            <img src="/assets/images/hcmus_logo.jpg" />
          </div>
        </a>
        <div>
          <ul>
            <li>
              <a href="">TRANG CHỦ</a>
            </li>
            <li>
              <a href="/search">BÀI BÁO</a>
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
                src={lecturer?.avatar == "http://image" ? "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" : lecturer?.avatar}
              />
            </div>

            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
              <h3>Lecturer</h3>
              <div className="dropdown-menu__subTitle">Website User</div>
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                <DropdownItem img={user} text={'Your Profile'} value={'MyProfile'} />
                <DropdownItem img={edit} text={'Your Article'} value={'EditProfile'} />
                <DropdownItem img={inbox} text={'Configuration'} value={'Configuration'} />
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
                <a href="/signin">Log In</a>
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

export default NavBarUser;
