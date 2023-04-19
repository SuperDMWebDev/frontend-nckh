import React from 'react';
import Styled from './style';

const NavBarUser = () => {
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
              <a href="/signin">Đăng nhập</a>
            </li>
            <li>
              <a>Đăng kí</a>
            </li>
          </ul>
        </div>
      </div>
    </Styled>
  );
};

export default NavBarUser;
