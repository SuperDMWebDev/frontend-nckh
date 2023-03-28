import styled from 'styled-components';

const Styled = styled.div`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 50px;
    box-shadow: 0 3px 3px rgb(0 0 0 / 5%);
    background-color: white;
    width: 100%;
    &_logo {
      img {
        height: 60px;
      }
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
`;

export default Styled;
