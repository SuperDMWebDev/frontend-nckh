import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Styled from './style';

const AnonymousNavBar = () => {
  const [logined, setLogined] = useState(true);

  const [open, setOpen] = useState(false);

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

  const handleLogin = () => {
    navigate('/signin');
  };

  return (
    <Styled>
      <div className="container">
        <div className="header">
          <a href="/">
            <div className="container_logo">
              <img src="/assets/images/hcmus_logo.jpg" />
            </div>
          </a>
          <div className="text__title_navbar">SciConnect</div>
        </div>

        <div
          style={{
            fontSize: '18px',
            cursor: 'pointer',
            marginRight: '20px',
            fontWeight: 'bold',
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            color: '#4562aa'
          }}
          onClick={handleLogin}>
          Đăng nhập
        </div>
      </div>
    </Styled>
  );
};

export default AnonymousNavBar;
