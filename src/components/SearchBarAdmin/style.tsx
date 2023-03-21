import styled from 'styled-components';

const Styled = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 50px;
    box-shadow: 0 3px 3px rgb(0 0 0 / 5%);
    background-color: white;

    width: 100%;
  }
  /* 
  svg {
    margin-right: 12px;
    width: 22px;
    height: 22px;
    line-height: 22px;
  }

  .account svg {
    color: #959595;
  }

  a::after {
    width: 100%;
    color: #3f51b5;
  } */

  /* a::after {
    content: '';
    background-color: #3f51b5;
    width: 0;
    display: block;
    height: 2px;
    position: absolute;
    transition: all 0.3s;
  } */

  /* .account {
    position: relative;

    &__popup {
      position: absolute;
      font-size: 16px;
      top: 20px;
      right: 10px;
      height: 120px;
      width: 160px;
      background-color: #fff;
      box-shadow: 5px 10px 15px -3px rgba(0, 0, 0, 0.1);
      border-radius: 8px;

      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      gap: 18px;

      text-transform: uppercase;

      z-index: 10;

      &__content:hover {
        color: #3f51b5;
        cursor: pointer;
      }
      &__content {
        border-top: 1px solid rgb(0, 0, 0, 0.005);
      }
    }
  } */

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .dropdown-container {
    position: relative;
  }

  .menu-trigger img {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    background-color: #fff;
  }

  .dropdown-menu {
    position: absolute;
    top: 100px;
    right: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px 20px;
    width: 200px;
  }

  .dropdown-menu::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    background: #fff;
    transform: rotate(45deg);
  }

  .dropdown-menu.active {
    display: block;
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: 500ms ease;
  }

  .dropdown-menu.inactive {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: 500ms ease;
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    font-weight: 500;
    font-size: 18px;
    color: #555;
    line-height: 1.2rem;
  }

  h3 span {
    font-size: 14px;
    color: #cecece;
    font-weight: 400;
  }

  .dropdown-menu ul li {
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }

  .dropdown-menu ul li:hover a {
    color: rgb(212, 33, 9);
    cursor: pointer;
  }

  .dropdown-menu ul li:hover img {
    opacity: 1;
    cursor: pointer;
  }

  .dropdownItem {
    display: flex;
    margin: 10px auto;
  }

  .dropdownItem img {
    max-width: 20px;
    margin-right: 10px;
    opacity: 0.5;
    transition: 500ms;
  }

  .dropdownItem a {
    max-width: 100px;
    margin-left: 10px;
    transition: 500ms;
  }
`;

export default Styled;
