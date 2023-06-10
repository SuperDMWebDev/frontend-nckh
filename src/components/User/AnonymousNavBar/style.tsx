import styled from 'styled-components';

const Styled = styled.div`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    box-shadow: 0 3px 3px rgb(0 0 0 / 5%);
    background-color: white;
    margin: 0 0 0 0;
    width: 100%;
    max-width: 100%;
    color: #1890ff;

    &_logo {
      img {
        height: 50px;
      }
    }
    .header {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .text__title {
      font-size: 40px;
      font-weight: 600;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: transparent !important;

    display: flex;
    align-items: space-between;
  }

  li {
    margin-right: 42px;
  }

  li:last-child {
    margin-right: 0;
  }

  li:hover a {
    color: #3f51b5;
  }

  li:hover a::after {
    width: 100%;
  }

  a {
    color: #959595;
    position: relative;
    font-size: 16px;
    text-decoration: none;
  }
  a::after {
    content: '';
    background-color: #3f51b5;
    width: 0;
    display: block;
    height: 2px;
    position: absolute;
    transition: all 0.3s;
  }

  .avatar {
    width: 50px !important;
    height: 50px;
  }
  .menu-container {
    position: relative;
  }
  .menu-trigger {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    &__space {
      margin-right: 150px;
    }
  }

  .menu-trigger img {
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    background-color: #fff;
  }

  .dropdown-menu {
    position: absolute;
    top: 70px;
    right: 200px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 20px;
    width: 220px;
    box-shadow: 5px 10px 15px 5px rgba(0, 0, 0, 0.1);
    transition: all 5s ease-in-out;
    &__subTitle {
      font-size: 14px;
      color: #64626285;
      font-weight: 700;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
  }

  .dropdown-menu.active {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: all 5s ease-in-out;
  }

  .dropdown-menu.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: all 5s ease-in-out;
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    font-weight: 700;
    font-size: 18px;
    color: #555;
    line-height: 1.2rem;
  }

  .dropdown-menu ul li {
    font-size: 14px;
    font-weight: 400;
    padding: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .dropdown-menu ul li:hover a {
    color: rgba(0, 25, 165, 0.689);
    cursor: pointer;
  }

  .dropdown-menu ul li:hover img {
    opacity: 1;
    cursor: pointer;
  }

  .dropdownItem {
    display: flex;
  }

  .dropdownItem img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    opacity: 0.5;
    transition: 500ms;
  }

  .dropdownItem a {
    max-width: 100px;
    margin-left: 10px;
    transition: 500ms;
    font-size: 14px;
  }
`;

export default Styled;
