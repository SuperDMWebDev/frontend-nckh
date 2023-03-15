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

  svg {
    margin-right: 12px;
    width: 22px;
    height: 22px;
    line-height: 22px;
  }

  .account svg {
    color: #959595;
  }

  .account:hover {
    color: #3f51b5;
  }

  div:hover a::after {
    width: 100%;
    color: #3f51b5;
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
