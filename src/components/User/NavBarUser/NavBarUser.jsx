import React from 'react';
import Styled from './style';
// import Logo from '/assets/images/logo.png';

const NavBarUser = () => {
  return (
    <Styled>
      <div className="container">
        <div className="container_logo">
          <img src="/assets/images/hcmus_logo.jpg" />
        </div>
        <div>
          <ul>
            <li>
              <a href="">GIỚI THIỆU</a>
            </li>
            <li>
              <a href="">THỐNG KÊ</a>
            </li>
            <li>
              <a href="">TRANG CHỦ</a>
            </li>
            <li>
              <a href="">BÀI BÁO</a>
            </li>
          </ul>
        </div>

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
      </div>
    </Styled>
  );
};

export default NavBarUser;
