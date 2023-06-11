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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
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
    font-weight: 600;
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: block;
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
